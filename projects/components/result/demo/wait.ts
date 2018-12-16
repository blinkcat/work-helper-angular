import { Component } from '@angular/core';
import md1 from './wait1.md';
import md2 from './wait2.md';

@Component({
  selector: 'demo-wait',
  template: `
    <ng-template #icon> <mat-icon [style.color]="'rgb(105,211,173)'">watch_later</mat-icon> </ng-template>
    <bc-markdown-mcm [mdTop]="md1" [mdBottom]="md2">
      <bc-result [icon]="icon" title="等待处理" description="正在处理中，请稍后再来" buttonText="返回主页"> </bc-result>
    </bc-markdown-mcm>
  `
})
export class WaitComponent {
  md1 = md1;
  md2 = md2;
}
