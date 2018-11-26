## source code

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'demo-custom-indicator',
  template: `
    <ng-template #indicator> <img src="https://loading.io/spinners/lava-lamp/index.svg" /> </ng-template>
    <bc-loading-man [isLoading]="true" [indicator]="indicator">
      <p>
        直接将其他元素或者component包裹在其中， loading-man is so easy to use!<br />
        可以在 KNOBS 中把玩一些属性<br />
        go!
      </p>
    </bc-loading-man>

    <ng-template #indicator2> <img src="https://loading.io/spinners/flask/index.svg" /> </ng-template>
    <bc-loading-man [isLoading]="true" [indicator]="indicator2">
      <p>
        直接将其他元素或者component包裹在其中， loading-man is so easy to use!<br />
        可以在 KNOBS 中把玩一些属性<br />
        go!
      </p>
    </bc-loading-man>
  `
})
export class CustomIndicatorComponent {}
```
