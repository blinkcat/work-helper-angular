import { Injectable, OnDestroy, ComponentFactoryResolver, Injector, ApplicationRef, TemplateRef } from '@angular/core';
import { DomPortalOutlet, ComponentPortal } from '@angular/cdk/portal';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { LightComponent, BcLightShape } from './light.component';
import { LightRef } from './light-ref';

@Injectable()
export class LightService implements OnDestroy {
  private currentLightRef!: LightRef | null;
  private destory = new Subject<void>();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) {}

  ngOnDestroy() {
    this.destory.next();
    this.destory.complete();
  }

  open(focusElement: HTMLElement, config?: BcLightConfig) {
    const domPortal = this.createDomPortal();

    const lightComponentRef = domPortal.attach(new ComponentPortal(LightComponent));

    lightComponentRef.instance.focusElement = focusElement;
    lightComponentRef.instance.setProps(config);

    const lightRef = new LightRef(lightComponentRef.instance, domPortal);

    lightRef
      .afterClosed()
      .pipe(takeUntil(this.destory))
      .subscribe(() => {
        if (this.currentLightRef === lightRef) {
          this.currentLightRef = null;
        }
      });

    if (this.currentLightRef) {
      this.currentLightRef
        .afterClosed()
        .pipe(takeUntil(this.destory))
        .subscribe(() => {
          lightRef.componentInstance.enter();
        });
      this.currentLightRef.close();
    } else {
      lightRef.componentInstance.enter();
    }

    this.currentLightRef = lightRef;

    return this.currentLightRef;
  }

  close() {
    if (this.currentLightRef) {
      this.currentLightRef.close();
    }
  }

  private createDomPortal() {
    const container = document.createElement('div');

    container.classList.add('bc-light-container');
    document.body.appendChild(container);

    return new DomPortalOutlet(container, this.componentFactoryResolver, this.appRef, this.injector);
  }
}

export interface BcLightTarget {
  width: number;
  height: number;
  top: number;
  left: number;
}

export interface BcLightConfig {
  padding?: number;
  indicatorShape?: BcLightShape;
  noContextAutoAdjust?: boolean;
  contentText?: string;
  dismissText?: string;
  customTemplate?: TemplateRef<any>;
}
