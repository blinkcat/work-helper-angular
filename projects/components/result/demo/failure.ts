import { Component } from '@angular/core';

@Component({
  selector: 'demo-failure',
  template: `
    <ng-template #icon> <mat-icon [style.color]="'#f5222d'">cancel</mat-icon> </ng-template>
    <bc-result [icon]="icon" title="提交失败" description="有什么东西填错了" buttonText="返回修改"> </bc-result>
  `
})
export class FailureComponent {}
