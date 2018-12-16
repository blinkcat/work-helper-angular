## source code

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'demo-warn',
  template: `
    <ng-template #icon> <mat-icon [style.color]="'rgb(246,199,68)'">error</mat-icon> </ng-template>
    <bc-result [icon]="icon" title="无法操作" description="请先登录，再试" buttonText="返回登录"> </bc-result>
  `
})
export class WarnComponent {}
```
