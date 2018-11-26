import { Component, Input } from '@angular/core';
import md1 from './stop-event1.md';
import md2 from './stop-event2.md';

@Component({
  selector: 'demo-stop-event',
  template: `
    <bc-markdown-man>
      <bc-markdown-man-md> {{ md1 }} </bc-markdown-man-md>
      <bc-markdown-man-comp>
        <button mat-stroked-button [disabled]="count.counting" (click)="start()">
          <bc-count-down #count [seconds]="seconds" [format]="format" (stop)="stopCb($event)"></bc-count-down>
          <span *ngIf="!count.counting">发送短信</span>
        </button>
        <p>counting: {{ count.counting }}</p>
        <p>在 ACTION LOGGER 面板中查看 stop 回调 log</p>
      </bc-markdown-man-comp>
      <bc-markdown-man-md> {{ md2 }} </bc-markdown-man-md>
    </bc-markdown-man>
  `
})
export class StopEventComponent {
  seconds: Date;
  @Input() stopCb: (...args: any[]) => any;

  md1: string = md1;
  md2: string = md2;

  start() {
    this.seconds = new Date(Date.now() + 10 * 1000);
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
