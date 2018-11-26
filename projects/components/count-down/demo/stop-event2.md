## source code

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'demo-stop-event',
  template: `
    <button mat-stroked-button [disabled]="count.counting" (click)="start()">
      <bc-count-down #count [seconds]="seconds" [format]="format" (stop)="stopCb($event)"></bc-count-down>
      <span *ngIf="!count.counting">发送短信</span>
    </button>
    <p>counting: {{ count.counting }}</p>
    <p>在 ACTION LOGGER 面板中查看 stop 回调 log</p>
  `
})
export class StopEventComponent {
  seconds: Date;
  stopCb: (...args: any[]) => any;

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
```
