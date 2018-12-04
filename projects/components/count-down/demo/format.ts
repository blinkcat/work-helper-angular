import { Component } from '@angular/core';

import md1 from './format1.md';
import md2 from './format2.md';

@Component({
  selector: 'demo-format',
  template: `
    <bc-markdown-mcm [mdTop]="md1" [mdBottom]="md2">
      <button mat-stroked-button [disabled]="count.counting" (click)="start()">
        <bc-count-down #count [target]="target" [format]="format"></bc-count-down>
        <span *ngIf="!count.counting">发送短信</span>
      </button>
      <p>counting: {{ count.counting }}</p>
    </bc-markdown-mcm>
  `
})
export class FormatComponent {
  md1 = md1;
  md2 = md2;

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
