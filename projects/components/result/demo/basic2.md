## source code

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'demo-basic',
  template: `
    <ng-template #icon> <mat-icon>alarm</mat-icon> </ng-template>
    <bc-result
      [icon]="icon"
      title="title test"
      description="description test"
      extras="extras info"
      buttonText="button test"
    >
      <p>里面还可以包东西</p>
    </bc-result>
  `
})
export class BasicComponent {}
```
