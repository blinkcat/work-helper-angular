import { Component } from '@angular/core';

import md1 from './complete1.md';
import md2 from './complete2.md';

/* tslint:disable: max-line-length */
@Component({
  selector: 'demo-complete',
  template: `
    <bc-markdown-mcm [mdTop]="md1" [mdBottom]="md2">
      <bc-scroller #scroller (complete)="log()"> <div class="basic"></div> </bc-scroller>
      <p style="text-align:center">complete scroller.getPosition(): {{ scroller.getPosition() | json }}</p>
    </bc-markdown-mcm>
  `,
  styles: [
    `
      bc-scroller {
        width: 500px;
        height: 500px;
        margin: 0 auto;
        border: 1px solid black;
      }
      .basic {
        width: 2000px;
        height: 2000px;
        background-color: #ccc;
        background: url(https://yt3.ggpht.com/-gbG6dZgR8_o/AAAAAAAAAAI/AAAAAAAAAAA/j_F1ZNd-K80/s76-c-k-no-mo-rj-c0xffffff/photo.jpg);
      }
    `
  ]
})
/* tslint:enable: max-line-length */
export class CompleteComponent {
  md1 = md1;
  md2 = md2;

  log() {
    console.log('complete');
  }
}
