import { Component } from '@angular/core';
import basicMd from './basic.md';

@Component({
  selector: 'demo-basic',
  template: `
    <bc-markdown-man> {{ md }} </bc-markdown-man>
  `
})
export class BasicComponent {
  md: string = basicMd;
}
