import { Component, Input } from '@angular/core';
import { BcFlexJustify, BcFlexDirection, BcFlexAlign, BcFlexWrap, BcFlexAlignContent } from '../flex.component';
import md1 from './basic1.md';
import md2 from './basic2.md';

let index = 0;

@Component({
  selector: 'demo-dumb',
  template: `
    {{ text }}
  `,
  styles: [
    `
      :host {
        display: block;
        text-align: center;
        margin: 5px;
        background: #ccc;
      }
    `
  ]
})
export class DumbComponent {
  text = `dumb${index++ % 10}`;
}

@Component({
  selector: 'demo-basic',
  template: `
    <bc-markdown-mcm [mdTop]="md1" [mdBottom]="md2">
      <bc-flex [direction]="direction" [justify]="justify" [align]="align" [wrap]="wrap" [alignContent]="alignContent">
        <demo-dumb
          *ngFor="let i of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
          [style.width]="80 + i * 20 + 'px'"
          [style.height]="30 + i * 5 + 'px'"
          [style.lineHeight]="30 + i * 5 + 'px'"
        ></demo-dumb>
      </bc-flex>
    </bc-markdown-mcm>
  `
})
export class BasicComponent {
  @Input() direction: BcFlexDirection;
  @Input() justify: BcFlexJustify;
  @Input() align: BcFlexAlign;
  @Input() wrap: BcFlexWrap;
  @Input() alignContent: BcFlexAlignContent;

  md1 = md1;
  md2 = md2;
}
