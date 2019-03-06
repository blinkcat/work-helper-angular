## 基本用法

属性绑定 size ，可以传入 'small' 'default' 'large'，'default' 可以省略。

## source code

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'demo-basic',
  template: `
    <bc-loading [size]="'small'"></bc-loading>
    <bc-loading></bc-loading>
    <bc-loading [size]="'large'"></bc-loading>
  `
})
export class BasicComponent {}
```
