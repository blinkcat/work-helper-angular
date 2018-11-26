import { Component } from '@angular/core';
import basic1Md from './basic1.md';
import basic2Md from './basic2.md';

@Component({
  selector: 'demo-basic',
  template: `
    <bc-markdown-man>
      <bc-markdown-man-md>{{ md1 }}</bc-markdown-man-md>
      <bc-markdown-man-comp><bc-loading-man [size]="'small'"></bc-loading-man></bc-markdown-man-comp>
      <bc-markdown-man-comp><bc-loading-man> </bc-loading-man></bc-markdown-man-comp>
      <bc-markdown-man-comp><bc-loading-man [size]="'large'"></bc-loading-man></bc-markdown-man-comp>
      <bc-markdown-man-md>{{ md2 }}</bc-markdown-man-md>
    </bc-markdown-man>
  `
})
export class BasicComponent {
  md1: string = basic1Md;
  md2: string = basic2Md;
}
