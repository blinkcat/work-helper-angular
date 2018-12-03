import { Component, Input } from '@angular/core';

import md1 from './snap1.md';
import md2 from './snap2.md';

/* tslint:disable: max-line-length */
@Component({
  selector: 'demo-snap',
  template: `
    <bc-markdown-mcm [mdTop]="md1" [mdBottom]="md2">
      <bc-scroller
        [scrollingX]="scrollingX"
        [scrollingY]="scrollingY"
        [bouncing]="bouncing"
        [snapping]="snapping"
        [snapWidth]="snapWidth"
        [snapHeight]="snapHeight"
      >
        <div class="basic"></div>
      </bc-scroller>
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
export class SnapComponent {
  md1 = md1;
  md2 = md2;

  @Input() bouncing = true;
  @Input() scrollingX = true;
  @Input() scrollingY = true;
  @Input() snapping = true;
  @Input() snapWidth = 76;
  @Input() snapHeight = 76;
}
