## source code

```typescript
import { Component, AfterViewInit } from '@angular/core';
import { LightService } from '../light.service';

@Component({
  selector: 'demo-basic',
  template: `
    <bc-flex [direction]="'column'" [justify]="'center'" [align]="'center'" style="height:100%">
      <button mat-raised-button color="accent" id="f1">feature</button>
    </bc-flex>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100vh;
      }
    `
  ]
})
export class BasicComponent implements AfterViewInit {
  constructor(private lightService: LightService) {}

  ngAfterViewInit() {
    this.lightService.open(document.getElementById('f1')!);
  }
}
```
