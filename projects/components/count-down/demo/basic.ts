import { Component, OnInit } from '@angular/core';
import basic1Md from './basic1.md';
import basic2Md from './basic2.md';

@Component({
  selector: 'demo-basic',
  template: `
    <bc-markdown-man>
      <bc-markdown-man-md> {{ md1 }} </bc-markdown-man-md>
      <bc-markdown-man-comp>
        <bc-count-down [seconds]="seconds" bcMarkdownManCTop></bc-count-down>
      </bc-markdown-man-comp>
      <bc-markdown-man-md> {{ md2 }} </bc-markdown-man-md>
    </bc-markdown-man>
  `
})
export class BasicComponent implements OnInit {
  seconds: Date;
  md1: string = basic1Md;
  md2: string = basic2Md;

  ngOnInit() {
    this.seconds = new Date(Date.now() + 10 * 60 * 60 * 1000);
  }
}
