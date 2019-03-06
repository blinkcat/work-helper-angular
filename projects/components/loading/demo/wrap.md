## 包裹其他 component

delay 表示延迟打开加载效果的 ms，tip 表示在加载效果打开时的提示  
可以在 右侧或下侧的 KNOBS 面板中把玩这些属性

## source code

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'demo-wrap',
  template: `
    <bc-loading [isLoading]="isLoading" [delay]="delay" [tip]="tip">
      <p>
        直接将其他元素或者component包裹在其中<br />
        可以在 KNOBS 中把玩一些属性<br />
        go!
      </p>
    </bc-loading>

    <section class="board">
      <mat-checkbox [(ngModel)]="isLoading">isLoading</mat-checkbox>
      <br />
      <mat-form-field class="example-full-width">
        <input [(ngModel)]="delay" type="number" matInput placeholder="delay" value="delay" />
      </mat-form-field>
      <br />
      <mat-form-field class="example-full-width">
        <input [(ngModel)]="tip" matInput placeholder="tip" value="tip" />
      </mat-form-field>
    </section>
  `,
  styles: [
    `
      p {
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 15px;
      }
      .board {
        margin: 20px auto 0;
      }
    `
  ]
})
export class WrapComponent {
  isLoading = false;
  delay = 0;
  tip = '';
}
```
