import { Component } from '@angular/core';

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'demo-basic',
  template: `
    <ng-container *bcLet="(data$ | async) as d">
      <div class="target">{{ d }}</div>
      <div class="original">still here</div>
    </ng-container>
  `
})
export class BasicComponent {
  data$ = of('test').pipe(delay(2000));
}
