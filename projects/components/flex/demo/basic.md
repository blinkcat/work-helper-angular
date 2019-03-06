## basic

将元素包裹在 bc-flex 中。

## source code

```typescript
import { Component } from '@angular/core';
import { BcFlexJustify, BcFlexDirection, BcFlexAlign, BcFlexWrap, BcFlexAlignContent } from '../flex.component';

@Component({
  selector: 'demo-basic',
  template: `
    <bc-flex [direction]="direction" [justify]="justify" [align]="align" [wrap]="wrap" [alignContent]="alignContent">
      <div class="dummy" style="width:30px;height:40px;">1</div>
      <div class="dummy" style="width:50px;height:60px;">2</div>
      <div class="dummy" style="width:80px;height:70px;">3</div>
      <div class="dummy" style="width:100px;height:40px;">4</div>
      <div class="dummy" style="width:80px;height:100px;">5</div>
    </bc-flex>

    <section>
      <h3>direction</h3>
      <mat-radio-group [(ngModel)]="direction">
        <mat-radio-button *ngFor="let dir of directionArr" [value]="dir"> {{ dir }} </mat-radio-button>
      </mat-radio-group>

      <h3>justify</h3>
      <mat-radio-group [(ngModel)]="justify">
        <mat-radio-button *ngFor="let jus of justifyArr" [value]="jus"> {{ jus }} </mat-radio-button>
      </mat-radio-group>

      <h3>align</h3>
      <mat-radio-group [(ngModel)]="align">
        <mat-radio-button *ngFor="let ali of alignArr" [value]="ali"> {{ ali }} </mat-radio-button>
      </mat-radio-group>

      <h3>wrap</h3>
      <mat-radio-group [(ngModel)]="wrap">
        <mat-radio-button *ngFor="let wra of wrapArr" [value]="wra"> {{ wra }} </mat-radio-button>
      </mat-radio-group>

      <h3>alignContent</h3>
      <mat-radio-group [(ngModel)]="alignContent">
        <mat-radio-button *ngFor="let alic of alignContentArr" [value]="alic"> {{ alic }} </mat-radio-button>
      </mat-radio-group>
    </section>
  `,
  styles: [
    `
      .dummy {
        text-align: center;
        border: 1px solid #ccc;
        margin: 5px;
      }

      h3 {
        margin-bottom: 5px;
      }

      .mat-radio-button {
        margin-right: 10px;
      }
    `
  ]
})
export class BasicComponent {
  direction!: BcFlexDirection;
  justify!: BcFlexJustify;
  align!: BcFlexAlign;
  wrap!: BcFlexWrap;
  alignContent!: BcFlexAlignContent;

  directionArr = Object.keys(BcFlexDirection);
  justifyArr = Object.keys(BcFlexJustify);
  alignArr = Object.keys(BcFlexAlign);
  wrapArr = Object.keys(BcFlexWrap);
  alignContentArr = Object.keys(BcFlexAlignContent);
}
```
