import { Component, OnInit } from '@angular/core';
import basicMd from './basic.md';

@Component({
  selector: 'demo-basic',
  template: `
    <bc-markdown-man>
      <bc-count-down [seconds]="seconds" bcMarkdownManTop></bc-count-down>
      {{ md }}
    </bc-markdown-man>
  `
})
export class BasicComponent implements OnInit {
  seconds: Date;
  md: string = basicMd;

  ngOnInit() {
    this.seconds = new Date(Date.now() + 10 * 60 * 60 * 1000);
  }
}
