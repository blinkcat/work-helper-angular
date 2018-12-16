import { Component } from '@angular/core';
import md1 from './basic1.md';
import md2 from './basic2.md';

@Component({
  selector: 'demo-basic',
  template: `
    <ng-template #icon> <mat-icon>alarm</mat-icon> </ng-template>
    <bc-markdown-mcm [mdTop]="md1" [mdBottom]="md2">
      <bc-result
        [icon]="icon"
        title="title test"
        description="description test"
        extras="extras info"
        buttonText="button test"
      >
        <p>里面还可以包东西</p>
      </bc-result>
    </bc-markdown-mcm>
  `
})
export class BasicComponent {
  md1 = md1;
  md2 = md2;
}
