import { Component } from '@angular/core';
import md1 from './warn1.md';
import md2 from './warn2.md';

@Component({
  selector: 'demo-warn',
  template: `
    <ng-template #icon> <mat-icon [style.color]="'rgb(246,199,68)'">error</mat-icon> </ng-template>
    <bc-markdown-mcm [mdTop]="md1" [mdBottom]="md2">
      <bc-result [icon]="icon" title="无法操作" description="请先登录，再试" buttonText="返回登录"> </bc-result>
    </bc-markdown-mcm>
  `
})
export class WarnComponent {
  md1 = md1;
  md2 = md2;
}
