## source code

```typescript
import { Component, Input } from '@angular/core';
import { BcFlexJustify, BcFlexDirection, BcFlexAlign, BcFlexWrap, BcFlexAlignContent } from '../flex.component';

@Component({
  selector: 'demo-basic',
  template: `
    <bc-flex [direction]="direction" [justify]="justify" [align]="align" [wrap]="wrap" [alignContent]="alignContent">
      <demo-dumb
        *ngFor="let i of [1, 2, 3, 4, 5]"
        [style.width]="50 + i * 10 + 'px'"
        [style.height]="30 + i * 5 + 'px'"
        [style.lineHeight]="30 + i * 5 + 'px'"
        bc-flex-item
      ></demo-dumb>
    </bc-flex>
  `
})
export class BasicComponent {
  @Input() direction: BcFlexDirection;
  @Input() justify: BcFlexJustify;
  @Input() align: BcFlexAlign;
  @Input() wrap: BcFlexWrap;
  @Input() alignContent: BcFlexAlignContent;
}
```
