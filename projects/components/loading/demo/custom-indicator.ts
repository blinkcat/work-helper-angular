import { Component } from '@angular/core';

import md1 from './custom-indicator1.md';
import md2 from './custom-indicator2.md';

@Component({
  selector: 'demo-custom-indicator',
  template: `
    <bc-markdown-mcm [mdTop]="md1" [mdBottom]="md2">
      <ng-template #indicator> <img src="https://loading.io/spinners/lava-lamp/index.svg" /> </ng-template>
      <bc-loading [isLoading]="true" [indicator]="indicator">
        <p>
          直接将其他元素或者component包裹在其中， loading-man is so easy to use!<br />
          可以在 KNOBS 中把玩一些属性<br />
          go!
        </p>
      </bc-loading>

      <ng-template #indicator2> <img src="https://loading.io/spinners/flask/index.svg" /> </ng-template>
      <bc-loading [isLoading]="true" [indicator]="indicator2">
        <p>
          直接将其他元素或者component包裹在其中， loading-man is so easy to use!<br />
          可以在 KNOBS 中把玩一些属性<br />
          go!
        </p>
      </bc-loading>
    </bc-markdown-mcm>
  `,
  styles: [
    `
      p {
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 15px;
      }
    `
  ]
})
export class CustomIndicatorComponent {
  md1: string = md1;
  md2: string = md2;
}
