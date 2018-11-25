## 基本用法

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'demo-basic',
  template: `
    <bc-count-down [seconds]="seconds"></bc-count-down>
  `
})
export class BasicComponent implements OnInit {
  seconds: Date;

  ngOnInit() {
    this.seconds = new Date(Date.now() + 10 * 60 * 60 * 1000);
  }
}
```
