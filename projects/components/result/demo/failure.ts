import { Component } from '@angular/core';
import md1 from './failure1.md';
import md2 from './failure2.md';

@Component({
  selector: 'demo-failure',
  template: `
    <ng-template #icon> <mat-icon [style.color]="'#f5222d'">cancel</mat-icon> </ng-template>
    <bc-markdown-mcm [mdTop]="md1" [mdBottom]="md2">
      <bc-result [icon]="icon" title="提交失败" description="有什么东西填错了" buttonText="返回修改"> </bc-result>
    </bc-markdown-mcm>
  `
})
export class FailureComponent {
  md1 = md1;
  md2 = md2;
}
