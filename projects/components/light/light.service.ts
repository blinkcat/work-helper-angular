import {
  Injectable,
  OnDestroy,
  ComponentFactoryResolver,
  Injector,
  ApplicationRef,
  TemplateRef,
  NgZone,
  ComponentRef
} from '@angular/core';
import { LightComponent, BcLightShape } from './light.component';
import { DomPortalOutlet, ComponentPortal } from '@angular/cdk/portal';
import { Observable, fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable()
export class LightService implements OnDestroy {
  private containerElement!: HTMLElement;
  private portal!: DomPortalOutlet;
  private _appRef!: ApplicationRef;
  private stack: Array<BcLightParams> = [];

  private resize$!: Observable<Event>;
  private resizeSub!: Subscription;

  private currentRef!: ComponentRef<LightComponent> | null;

  get lightStackSize() {
    return this.stack.length;
  }

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _injector: Injector,
    private ngzone: NgZone
  ) {
    this.ngzone.runOutsideAngular(() => {
      this.resize$ = fromEvent(window, 'resize').pipe(debounceTime(150));
    });
  }

  ngOnDestroy() {
    if (this.containerElement && this.containerElement.parentNode) {
      this.containerElement.parentNode.removeChild(this.containerElement);
    }
    this.stack = [];

    if (this.resizeSub) {
      this.resizeSub.unsubscribe();
    }
  }

  open(target: BcLightParams['target'], options?: BcLightParams['options']) {
    this.create(target, options).instance.closeDone.subscribe(() => {
      this.close();
    });
  }

  addLight(target: BcLightParams['target'], options?: BcLightParams['options']) {
    this.stack.push({ target: target, options: options });
  }

  start() {
    const light = this.stack.shift();
    if (light) {
      this.create(light.target, light.options).instance.closeDone.subscribe(() => {
        if (this.stack.length > 0) {
          this.close();
          this.start();
        } else {
          this.close();
        }
      });
    }
  }

  close() {
    this.portal.detach();
    this.currentRef = null;
    if (this.resizeSub) {
      console.log('unsubscribe');
      this.resizeSub.unsubscribe();
    }
  }

  private create(target: BcLightParams['target'], options?: BcLightParams['options']) {
    this.createContainerAndPortal(options && options.fixed);
    const lightPortal = new ComponentPortal(LightComponent);

    const ref = this.portal.attach(lightPortal);
    this.currentRef = ref;
    Object.assign(ref.instance, options);

    const caculateSize = () => {
      ref.instance.container = this.getContainerSize(options && options.fixed)!;
      if (target instanceof HTMLElement) {
        ref.instance.target = target.getBoundingClientRect();
      } else {
        ref.instance.target = target;
      }
    };

    caculateSize();

    // watch window resize, subscribe
    this.resizeSub = this.resize$.subscribe(() => {
      if (this.currentRef) {
        caculateSize();
        this.currentRef.instance.ngOnChanges();
      }
    });

    return ref;
  }

  private createContainerAndPortal(fixed = false) {
    if (!this.containerElement || !this.portal) {
      const container = document.createElement('div');

      if (fixed) {
        container.style.position = 'fixed';
      }

      container.classList.add('bc-light-container');
      document.body.appendChild(container);

      this.containerElement = container;

      if (!this._appRef) {
        this._appRef = this._injector.get<ApplicationRef>(ApplicationRef);
      }

      this.portal = new DomPortalOutlet(
        this.containerElement,
        this._componentFactoryResolver,
        this._appRef,
        this._injector
      );
    }
  }

  private getContainerSize(fixed = false) {
    if (fixed) {
      return {
        width: window.innerWidth,
        height: window.innerHeight
      };
    }
    return {
      width: document.documentElement!.scrollWidth,
      height: document.documentElement!.scrollHeight
    };
  }
}

export interface BcLightTarget {
  width: number;
  height: number;
  top: number;
  left: number;
}

export interface BcLightContainer {
  width: number;
  height: number;
}

export interface BcLightOptions {
  padding: number;
  indicatorShape: BcLightShape;
  contentText: string;
  dismissText: string;
  customTemplate: TemplateRef<any>;
  noContextAutoAdjust: boolean;
}

export interface BcLightExtraOptions {
  fixed: boolean;
}

export interface BcLightParams {
  target: BcLightTarget | HTMLElement | null;
  options?: Partial<BcLightOptions & BcLightExtraOptions>;
}
