import {
  Component,
  AfterViewInit,
  OnChanges,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  Input,
  ViewChild,
  TemplateRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { trigger, style, animate, transition, AnimationEvent } from '@angular/animations';
import { Subject } from 'rxjs';
import { BcLightTarget, BcLightContainer } from './light.service';

@Component({
  selector: 'bc-light',
  template: `
    <ng-template #defaultTemplate>
      <p class="bc-light-tip-content">{{ contentText }}</p>
      <div class="bc-light-tip-dismiss">{{ dismissText }}</div>
    </ng-template>

    <canvas class="bc-light-canvas" #canvas @inOut (@inOut.done)="animationDone($event)" *ngIf="!clickToClose"></canvas>
    <div class="bc-light-tip" @inOut #lightContent *ngIf="!clickToClose">
      <ng-template [ngTemplateOutlet]="customTemplate || defaultTemplate"></ng-template>
    </div>
  `,
  styleUrls: ['light.component.scss'],
  /* tslint:disable:use-host-property-decorator */
  host: {
    class: 'bc-light',
    '(click)': 'close()'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('inOut', [
      transition(':enter', [style({ opacity: 0 }), animate(300, style({ opacity: 1 }))]),
      transition(':leave', [animate(300, style({ opacity: 0 }))])
    ])
  ]
})
export class LightComponent implements OnChanges, AfterViewInit {
  @Input() target!: BcLightTarget | null;
  @Input() container!: BcLightContainer;
  @Input() padding = 5;
  @Input() indicatorShape: BcLightShape = 'roundedRect';
  @Input() contentText = '这是一个新功能';
  @Input() dismissText = '知道了';
  @Input() customTemplate!: TemplateRef<any>;
  @Input() noContextAutoAdjust = false;

  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('lightContent') lightContent!: ElementRef<HTMLElement>;

  clickToClose = false;

  get closeDone() {
    return this._closeDone.asObservable();
  }

  private _closeDone = new Subject();

  constructor(private render: Renderer2) {}

  ngOnChanges() {
    this.initCanvas();
    this.draw(true);
  }

  ngAfterViewInit() {
    this.initCanvas();
    this.draw();
  }

  close() {
    this.clickToClose = true;
  }

  animationDone(event: AnimationEvent) {
    if (event.toState === 'void') {
      this._closeDone.next();
    }
  }

  private initCanvas() {
    const container = this.container;
    const canvas = this.canvas.nativeElement;

    this.render.setProperty(canvas, 'width', container.width);
    this.render.setProperty(canvas, 'height', container.height);
  }

  private draw(redrawing = false) {
    const canvas = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d');

    const container = this.container;

    if (ctx) {
      if (redrawing) {
        ctx.clearRect(0, 0, container.width, container.height);
      }
      this.setCtxBg(ctx);
      this.drawBg(ctx, container.width, container.height);
      this.drawLight(ctx, this.indicatorShape);
      this.fill(ctx);
    }
  }

  private drawBg(ctx: CanvasRenderingContext2D, width: number, height: number) {
    // 逆时针
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, height);
    ctx.lineTo(width, height);
    ctx.lineTo(width, 0);
    ctx.closePath();
  }

  private drawLight(ctx: CanvasRenderingContext2D, shape: BcLightShape) {
    if (!this.target) {
      return;
    }

    const target = this.target;
    const padding = this.padding;

    const top = target.top + document.documentElement!.scrollTop || document.body.scrollTop;
    const left = target.left + document.documentElement!.scrollLeft || document.body.scrollLeft;

    switch (shape) {
      case 'rect':
        this.rect(ctx, left - padding, top - padding, target.width + padding * 2, target.height + padding * 2);
        break;
      case 'round':
        this.round(
          ctx,
          left + target.width / 2,
          top + target.height / 2,
          Math.max(target.width, target.height) / 2 + padding
        );
        break;
      case 'roundedRect':
        this.roundedRect(
          ctx,
          left - padding,
          top - padding,
          target.width + padding * 2,
          target.height + padding * 2,
          6.5
        );
        break;
      default:
        this.rect(ctx, left - padding, top - padding, target.width + padding * 2, target.height + padding * 2);
    }

    // 适配文字位置
    if (!this.noContextAutoAdjust) {
      const lightContent = this.lightContent.nativeElement;

      const halfScreenWidth = window.innerWidth / 2;

      if (target.left + target.width / 2 > halfScreenWidth) {
        this.render.setStyle(lightContent, 'left', `${left - lightContent.offsetWidth}px`);
      } else {
        this.render.setStyle(lightContent, 'left', `${left}px`);
      }

      const halfScreenHeight = window.innerHeight / 2;

      if (target.top + target.height / 2 > halfScreenHeight) {
        this.render.setStyle(lightContent, 'top', `${top - lightContent.offsetHeight}px`);
      } else {
        this.render.setStyle(lightContent, 'top', `${top + target.height}px`);
      }
    }
  }

  private setCtxBg(ctx: CanvasRenderingContext2D, bgColor = 'rgba(0,0,0,0.5)') {
    ctx.fillStyle = bgColor;
  }

  private fill(ctx: CanvasRenderingContext2D) {
    ctx.fill();
  }

  // #region 顺时针绘制各种图形
  // 矩形
  private rect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, y + height);
    ctx.closePath();
  }

  // 圆形
  private round(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) {
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  }

  // 圆角矩形
  private roundedRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) {
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }
  // #endregion
}

export type BcLightShape = 'rect' | 'round' | 'roundedRect';
