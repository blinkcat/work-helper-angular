import { Component } from '@angular/core';

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'demo-multi',
  template: `
    <ng-container *bcLet="{ d1: data$ | async, d2: data2$ | async } as ds">
      <div class="target">{{ ds.d1 }}</div>
      <div class="target">{{ ds.d2 }}</div>
      <div class="original">still here</div>
    </ng-container>
  `
})
export class MultiComponent {
  data$ = of('test').pipe(delay(2000));
  data2$ = of(2).pipe(delay(2000 * 2));
}
