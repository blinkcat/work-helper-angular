## 自定义 indicator

你还可以传入你的 indicator 的 ng-template

## source code

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'demo-custom-indicator',
  template: `
    <ng-template #indicator> <img src="https://loading.io/spinners/lava-lamp/index.svg" /> </ng-template>
    <bc-loading [isLoading]="true" [indicator]="indicator">
      <p>
        直接将其他元素或者component包裹在其中， loading-man is so easy to use!<br />
        可以在 KNOBS 中把玩一些属性<br />
        go!
      </p>
    </bc-loading>

    <ng-template #indicator2> <img src="https://loading.io/spinners/flask/index.svg" /> </ng-template>
    <bc-loading [isLoading]="true" [indicator]="indicator2">
      <p>
        直接将其他元素或者component包裹在其中， loading-man is so easy to use!<br />
        可以在 KNOBS 中把玩一些属性<br />
        go!
      </p>
    </bc-loading>
  `,
  styles: [
    `
      p {
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 15px;
      }
    `
  ]
})
export class CustomIndicatorComponent {}
```
