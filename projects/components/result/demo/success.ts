import { Component } from '@angular/core';
import md1 from './success1.md';
import md2 from './success2.md';

@Component({
  selector: 'demo-success',
  template: `
    <ng-template #icon> <mat-icon [style.color]="'#52c41a'">check_circle</mat-icon> </ng-template>
    <bc-markdown-mcm [mdTop]="md1" [mdBottom]="md2">
      <bc-result [icon]="icon" title="申请成功" description="快去看看额度" buttonText="查看额度" buttonColor="primary">
      </bc-result>
    </bc-markdown-mcm>
  `
})
export class SuccessComponent {
  md1 = md1;
  md2 = md2;
}
