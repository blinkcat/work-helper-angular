# 基本用法

高亮指定元素

## source code

```typescript
import { Component } from '@angular/core';
import { LightService } from '../light.service';

@Component({
  selector: 'demo-basic',
  template: `
    <bc-flex [direction]="'column'" [justify]="'center'" [align]="'center'" style="height:100%">
      <button mat-raised-button color="accent" id="f1" (click)="open()">click to focus</button>
    </bc-flex>
  `
})
export class BasicComponent {
  constructor(private lightService: LightService) {}

  open() {
    const ref = this.lightService.open(document.getElementById('f1')!, { dismissText: 'test' });

    ref.backdropClick().subscribe(() => {
      ref.close();
    });
  }
}
```
