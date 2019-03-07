## 基本用法

## sourcecode

```typescript
import { Component } from '@angular/core';

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'demo-basic',
  template: `
    <ng-container *bcLet="(data$ | async) as d">
      <div class="target">{{ d }}</div>
    </ng-container>
  `
})
export class BasicComponent {
  data$ = of('test').pipe(delay(2000));
}
```
