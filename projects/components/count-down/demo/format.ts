import { Component } from '@angular/core';
import formatMd from './format.md';

@Component({
  selector: 'demo-format',
  template: `
    <bc-markdown-man>
      <div bcMarkdownManTop>
        <button mat-stroked-button [disabled]="count.counting" (click)="start()">
          <bc-count-down #count [seconds]="seconds" [format]="format"></bc-count-down>
          <span *ngIf="!count.counting">发送短信</span>
        </button>
        <p>counting: {{ count.counting }}</p>
      </div>

      {{ md }}
    </bc-markdown-man>
  `
})
export class FormatComponent {
  seconds: Date;
  md: string = formatMd;

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
