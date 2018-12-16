## source code

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'demo-wait',
  template: `
    <ng-template #icon> <mat-icon [style.color]="'rgb(105,211,173)'">watch_later</mat-icon> </ng-template>
    <bc-result [icon]="icon" title="等待处理" description="正在处理中，请稍后再来" buttonText="返回主页"> </bc-result>
  `
})
export class WaitComponent {}
```
