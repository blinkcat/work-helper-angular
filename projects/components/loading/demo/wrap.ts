import { Component, Input } from '@angular/core';

import md1 from './wrap1.md';
import md2 from './wrap2.md';

@Component({
  selector: 'demo-wrap',
  template: `
    <bc-markdown-mcm [mdTop]="md1" [mdBottom]="md2">
      <bc-loading [isLoading]="isLoading" [delay]="delay" [tip]="tip">
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
export class WrapComponent {
  @Input() isLoading = false;
  @Input() delay = 0;
  @Input() tip = '';

  md1 = md1;
  md2 = md2;
}
