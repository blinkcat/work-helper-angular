import { Component, Input } from '@angular/core';

import md1 from './stop-event1.md';
import md2 from './stop-event2.md';

@Component({
  selector: 'demo-stop-event',
  template: `
    <bc-markdown-mcm [mdTop]="md1" [mdBottom]="md2">
      <button mat-stroked-button [disabled]="count.counting" (click)="start()">
        <bc-count-down #count [target]="target" [format]="format" (stop)="stopCb($event)"></bc-count-down>
        <span *ngIf="!count.counting">发送短信</span>
      </button>
      <p>counting: {{ count.counting }}</p>
      <p>在 ACTION LOGGER 面板中查看 stop 回调 log</p>
    </bc-markdown-mcm>
  `
})
export class StopEventComponent {
  md1 = md1;
  md2 = md2;

  @Input() stopCb!: (...args: any[]) => any;
  target!: Date;

  start() {
    this.target = new Date(Date.now() + 10 * 1000);
  }

  format(seconds: number) {
    if (seconds) {
      const s = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${s}s后重发`;
    } else {
      return '';
    }
  }
}
