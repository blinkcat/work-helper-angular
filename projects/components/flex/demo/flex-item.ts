import { Component, Input } from '@angular/core';
import { BcFlexJustify, BcFlexDirection, BcFlexAlign, BcFlexWrap, BcFlexAlignContent } from '../flex.component';
import md1 from './flex-item1.md';
import md2 from './flex-item2.md';

@Component({
  selector: 'demo-flex-item',
  template: `
    <bc-markdown-mcm [mdTop]="md1" [mdBottom]="md2">
      <bc-flex [direction]="direction" [justify]="justify" [align]="align" [wrap]="wrap" [alignContent]="alignContent">
        <demo-dumb
          *ngFor="let i of [1, 2, 3, 4, 5]"
          [style.width]="50 + i * 10 + 'px'"
          [style.height]="30 + i * 5 + 'px'"
          [style.lineHeight]="30 + i * 5 + 'px'"
          bc-flex-item
        ></demo-dumb>
      </bc-flex>
    </bc-markdown-mcm>
  `
})
export class FlexItemComponent {
  @Input() direction!: BcFlexDirection;
  @Input() justify!: BcFlexJustify;
  @Input() align!: BcFlexAlign;
  @Input() wrap!: BcFlexWrap;
  @Input() alignContent!: BcFlexAlignContent;

  md1 = md1;
  md2 = md2;
}
