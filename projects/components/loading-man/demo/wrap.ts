import { Component, OnInit, Input } from '@angular/core';
import wrap1Md from './wrap1.md';
import wrap2Md from './wrap2.md';

@Component({
  selector: 'demo-wrap',
  template: `
    <bc-markdown-man>
      <bc-markdown-man-md>{{ md1 }}</bc-markdown-man-md>
      <bc-markdown-man-comp>
        <bc-loading-man [isLoading]="isLoading" [delay]="delay" [tip]="tip">
          <p>
            直接将其他元素或者component包裹在其中， loading-man is so easy to use!<br />
            可以在 KNOBS 中把玩一些属性<br />
            go!
          </p>
        </bc-loading-man>
      </bc-markdown-man-comp>
      <bc-markdown-man-md>{{ md2 }}</bc-markdown-man-md>
    </bc-markdown-man>
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

  md1: string = wrap1Md;
  md2: string = wrap2Md;
}
