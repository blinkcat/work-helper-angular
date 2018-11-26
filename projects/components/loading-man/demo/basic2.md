## source code

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'demo-basic',
  template: `
    <bc-loading-man [size]="'small'"></bc-loading-man>
    <bc-loading-man> </bc-loading-man>
    <bc-loading-man [size]="'large'"></bc-loading-man>
  `
})
export class BasicComponent {}
```
