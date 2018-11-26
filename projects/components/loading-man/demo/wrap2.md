## source code

```typescript
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'demo-wrap',
  template: `
    <bc-loading-man [isLoading]="isLoading" [delay]="delay" [tip]="tip">
      <p>
        直接将其他元素或者component包裹在其中， loading-man is so easy to use!<br />
        可以在 KNOBS 中把玩一些属性<br />
        go!
      </p>
    </bc-loading-man>
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
export class WrapComponent {
  @Input() isLoading = false;
  @Input() delay = 0;
  @Input() tip = '';
}
```
