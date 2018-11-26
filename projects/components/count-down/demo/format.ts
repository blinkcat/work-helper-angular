import { Component } from '@angular/core';
import format1Md from './format1.md';
import format2Md from './format2.md';

@Component({
  selector: 'demo-format',
  template: `
    <bc-markdown-man>
      <bc-markdown-man-md> {{ md1 }} </bc-markdown-man-md>
      <bc-markdown-man-comp>
        <button mat-stroked-button [disabled]="count.counting" (click)="start()">
          <bc-count-down #count [seconds]="seconds" [format]="format"></bc-count-down>
          <span *ngIf="!count.counting">发送短信</span>
        </button>
        <p>counting: {{ count.counting }}</p>
      </bc-markdown-man-comp>
      <bc-markdown-man-md> {{ md2 }} </bc-markdown-man-md>
    </bc-markdown-man>
  `
})
export class FormatComponent {
  seconds: Date;
  md1: string = format1Md;
  md2: string = format2Md;

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
