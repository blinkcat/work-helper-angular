import { Component } from '@angular/core';

@Component({
  selector: 'demo-success',
  template: `
    <ng-template #icon> <mat-icon [style.color]="'#52c41a'">check_circle</mat-icon> </ng-template>
    <bc-result
      [icon]="icon"
      title="申请成功"
      description="快去看看额度"
      buttonText="查看额度"
      buttonColor="primary"
    ></bc-result>
  `
})
export class SuccessComponent {}
