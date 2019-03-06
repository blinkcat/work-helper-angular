## basic

可以在 storybook KNOBS 中试试各种配置

## source code

```typescript
import { Component } from '@angular/core';

/* tslint:disable: max-line-length */
@Component({
  selector: 'demo-basic',
  template: `
    <bc-scroller
      [scrollingX]="scrollingX"
      [scrollingY]="scrollingY"
      [bouncing]="bouncing"
      [animating]="animating"
      [animationDuration]="animationDuration"
    >
      <div class="basic"></div>
    </bc-scroller>

    <section class="board">
      <mat-checkbox [(ngModel)]="bouncing">bouncing</mat-checkbox>
      <mat-checkbox [(ngModel)]="animating">animating</mat-checkbox>
      <mat-checkbox [(ngModel)]="scrollingX">scrollingX</mat-checkbox>
      <mat-checkbox [(ngModel)]="scrollingY">scrollingY</mat-checkbox>
      <br />
      <mat-form-field>
        <input [(ngModel)]="animationDuration" matInput type="number" placeholder="animationDuration" value="250" />
      </mat-form-field>
    </section>
  `,
  styles: [
    `
      bc-scroller {
        width: 500px;
        height: 500px;
        margin: 0 auto;
        border: 1px solid black;
      }
      .basic {
        width: 2000px;
        height: 2000px;
        background-color: #ccc;
        background: url(https://yt3.ggpht.com/-gbG6dZgR8_o/AAAAAAAAAAI/AAAAAAAAAAA/j_F1ZNd-K80/s76-c-k-no-mo-rj-c0xffffff/photo.jpg);
      }
      .board {
        margin: 20px auto 0;
      }
      .board > * {
        margin-right: 5px;
      }
    `
  ]
})
/* tslint:enable: max-line-length */
export class BasicComponent {
  bouncing = true;
  animating = true;
  scrollingX = true;
  scrollingY = true;
  animationDuration = 250;
}
```
