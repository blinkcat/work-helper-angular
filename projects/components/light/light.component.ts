import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ViewChild,
  TemplateRef,
  ChangeDetectionStrategy,
  NgZone
} from '@angular/core';
import { AnimationEvent } from '@angular/animations';

import { Subject, fromEvent } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

import { BcLightTarget, BcLightConfig } from './light.service';
import { Paint } from './Paint';
import { lightAnimations } from './light-animations';

export type BcLightShape = 'rect' | 'round' | 'roundedRect';
interface BcLightContainer {
  width: number;
  height: number;
}

@Component({
  selector: 'bc-light',
  template: `
    <ng-template #defaultTemplate>
      <p class="bc-light-tip-content">{{ contentText }}</p>
      <div class="bc-light-tip-dismiss">{{ dismissText }}</div>
    </ng-template>

    <canvas class="bc-light-canvas" #canvas></canvas>
    <div class="bc-light-tip" #lightContent>
      <ng-template [ngTemplateOutlet]="customTemplate || defaultTemplate"></ng-template>
    </div>
  `,
  styleUrls: ['light.component.scss'],
  /* tslint:disable:use-host-property-decorator */
  host: {
    class: 'bc-light',
    '[@state]': '_animationState',
    '(@state.done)': 'onAnimationDone($event)',
    '(click)': '_backdropClick.next($event)'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [lightAnimations.lightState]
})
export class LightComponent implements AfterViewInit, OnDestroy {
  focusElement!: HTMLElement;
  get target(): BcLightTarget {
    return this.focusElement.getBoundingClientRect();
  }
  get container(): BcLightContainer {
    return {
      width: document.documentElement!.scrollWidth,
      height: document.documentElement!.scrollHeight
    };
  }
  get backdropClick() {
    return this._backdropClick.asObservable();
  }

  padding = 5;
  indicatorShape: BcLightShape = 'roundedRect';
  contentText!: string;
  dismissText!: string;
  customTemplate!: TemplateRef<any> | undefined;
  noContextAutoAdjust = false;

  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('lightContent') lightContent!: ElementRef<HTMLElement>;

  readonly _onExit = new Subject<void>();
  readonly _onEnter = new Subject<void>();
  _animationState = 'void';
  readonly _backdropClick = new Subject<MouseEvent>();

  private paint!: Paint;
  private destory = new Subject<void>();

  constructor(private render: Renderer2, private ngZone: NgZone, private cdf: ChangeDetectorRef) {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, 'resize')
        .pipe(
          debounceTime(200),
          takeUntil(this.destory)
        )
        .subscribe(() => {
          this.updateFocusPosition();
        });
    });
  }

  ngAfterViewInit() {
    const {
      container: { width, height },
      canvas,
      indicatorShape,
      render,
      target,
      padding
    } = this;

    this.paint = new Paint(canvas.nativeElement, width, height, render).init().draw(target, indicatorShape, padding);

    this.updateTipPosition();
  }

  ngOnDestroy() {
    (this.focusElement as any) = null;

    this.destory.next();
    this.destory.complete();

    this.completeExit();
  }

  onAnimationDone(event: AnimationEvent) {
    const { toState } = event;

    if (toState === 'hidden') {
      this.completeExit();
    }

    if (toState === 'visible') {
      this._onEnter.next();
      this._onEnter.complete();
    }
  }

  enter() {
    this._animationState = 'visible';
  }

  exit() {
    this._animationState = 'hidden';
  }

  detectChanges() {
    this.cdf.detectChanges();
  }

  setProps(config?: BcLightConfig) {
    config = config || {};

    this.padding = config.padding || 5;
    this.indicatorShape = config.indicatorShape || 'roundedRect';
    this.contentText = config.contentText || '';
    this.dismissText = config.dismissText || '';
    this.customTemplate = config.customTemplate;
    this.noContextAutoAdjust = config.noContextAutoAdjust || false;
  }

  updateFocusPosition() {
    const { target, indicatorShape, padding, paint, noContextAutoAdjust } = this;

    if (paint) {
      const { width, height } = this.container;

      paint.update(width, height).draw(target, indicatorShape, padding);
      if (!noContextAutoAdjust) {
        this.updateTipPosition();
      }
    }
  }

  private updateTipPosition() {
    const target = this.target;

    const top = target.top + document.documentElement!.scrollTop || document.body.scrollTop;
    const left = target.left + document.documentElement!.scrollLeft || document.body.scrollLeft;

    // 适配文字位置
    const lightContent = this.lightContent.nativeElement;

    const halfScreenWidth = window.innerWidth / 2;

    const lightContentWidth = lightContent.offsetWidth;

    if (target.left + target.width / 2 > halfScreenWidth) {
      this.render.setStyle(lightContent, 'left', `${left - (lightContentWidth - target.width) / 2}px`);
    } else {
      this.render.setStyle(lightContent, 'left', `${Math.max(0, left - (lightContentWidth - target.width) / 2)}px`);
    }

    const halfScreenHeight = window.innerHeight / 2;

    const lightContentHeight = lightContent.offsetHeight;

    if (target.top + target.height / 2 > halfScreenHeight) {
      this.render.setStyle(lightContent, 'top', `${top - lightContentHeight}px`);
    } else {
      this.render.setStyle(lightContent, 'top', `${top + target.height}px`);
    }
  }

  private completeExit() {
    if (!this._onExit.closed) {
      setTimeout(() => {
        this._onExit.next();
        this._onExit.complete();
      });
    }
  }
}
