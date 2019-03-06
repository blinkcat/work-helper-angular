## 基本用法

传入一个表示未来时间的 Date 对象

## source code

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'demo-basic',
  template: `
    <bc-count-down [target]="target"></bc-count-down>
  `
})
export class BasicComponent implements OnInit {
  target: Date;

  ngOnInit() {
    this.target = new Date(Date.now() + 10 * 60 * 60 * 1000);
  }
}
```
