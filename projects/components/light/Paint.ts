import { Renderer2 } from '@angular/core';

import { BcLightTarget } from './light.service';
import { BcLightShape } from './light.component';

export class Paint {
  ctx!: CanvasRenderingContext2D | null;

  constructor(
    private canvas: HTMLCanvasElement,
    private width: number,
    private height: number,
    private render: Renderer2
  ) {}

  init() {
    const { canvas, render, width, height } = this;

    render.setProperty(canvas, 'width', width);
    render.setProperty(canvas, 'height', height);

    this.ctx = this.canvas.getContext('2d');

    return this;
  }

  update(width: number, height: number) {
    this.width = width;
    this.height = height;

    return this.init();
  }

  draw(target: BcLightTarget | null, shape: BcLightShape, padding: number) {
    if (target) {
      this.clear()
        .setFillStyle()
        .drawBg()
        .drawLight(target, shape, padding);
    }

    return this.fill();
  }

  private drawLight(target: BcLightTarget, shape: BcLightShape, padding: number) {
    const top = target.top + document.documentElement!.scrollTop || document.body.scrollTop;
    const left = target.left + document.documentElement!.scrollLeft || document.body.scrollLeft;

    switch (shape) {
      case 'rect':
        this.drawRect(left - padding, top - padding, target.width + padding * 2, target.height + padding * 2);
        break;
      case 'round':
        this.drawRound(
          left + target.width / 2,
          top + target.height / 2,
          Math.max(target.width, target.height) / 2 + padding
        );
        break;
      case 'roundedRect':
        this.drawRoundedRect(
          left - padding,
          top - padding,
          target.width + padding * 2,
          target.height + padding * 2,
          6.5
        );
        break;
      default:
        this.drawRect(left - padding, top - padding, target.width + padding * 2, target.height + padding * 2);
    }

    return this;
  }

  private drawBg() {
    const { ctx, width, height } = this;

    if (ctx) {
      // 逆时针
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, height);
      ctx.lineTo(width, height);
      ctx.lineTo(width, 0);
      ctx.closePath();
    }

    return this;
  }

  /**
   * 矩形
   *
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @memberof Paint
   */
  private drawRect(x: number, y: number, width: number, height: number) {
    const ctx = this.ctx;

    if (ctx) {
      ctx.moveTo(x, y);
      ctx.lineTo(x + width, y);
      ctx.lineTo(x + width, y + height);
      ctx.lineTo(x, y + height);
      ctx.closePath();
    }

    return this;
  }

  /**
   * 圆形
   *
   * @param {number} x
   * @param {number} y
   * @param {number} radius
   * @memberof Paint
   */
  private drawRound(x: number, y: number, radius: number) {
    if (this.ctx) {
      this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    }

    return this;
  }

  /**
   * 圆角矩形
   *
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {number} radius
   * @memberof Paint
   */
  private drawRoundedRect(x: number, y: number, width: number, height: number, radius: number) {
    const ctx = this.ctx;

    if (ctx) {
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

    return this;
  }

  private setFillStyle(color = 'rgba(0,0,0,0.5)') {
    if (this.ctx) {
      this.ctx.fillStyle = color;
    }

    return this;
  }

  private fill() {
    if (this.ctx) {
      this.ctx.fill();
    }

    return this;
  }

  private clear() {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }

    return this;
  }
}
