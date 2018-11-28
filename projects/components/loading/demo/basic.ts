import { Component } from '@angular/core';

import md1 from './basic1.md';
import md2 from './basic2.md';

@Component({
  selector: 'demo-basic',
  template: `
    <bc-markdown-mcm [mdTop]="md1" [mdBottom]="md2">
      <bc-loading [size]="'small'"></bc-loading>
      <bc-loading></bc-loading>
      <bc-loading [size]="'large'"></bc-loading>
    </bc-markdown-mcm>
  `
})
export class BasicComponent {
  md1 = md1;
  md2 = md2;
}
