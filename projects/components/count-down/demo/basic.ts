import { Component, OnInit } from '@angular/core';

import md1 from './basic1.md';
import md2 from './basic2.md';

@Component({
  selector: 'demo-basic',
  template: `
    <bc-markdown-mcm [mdTop]="md1" [mdBottom]="md2">
      <bc-count-down [target]="target"></bc-count-down>
    </bc-markdown-mcm>
  `
})
export class BasicComponent implements OnInit {
  md1 = md1;
  md2 = md2;

  target!: Date;

  ngOnInit() {
    this.target = new Date(Date.now() + 10 * 60 * 60 * 1000);
  }
}
