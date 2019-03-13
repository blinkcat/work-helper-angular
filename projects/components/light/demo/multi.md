## 一系列高亮

## source code

```typescript
import { Component, AfterViewInit } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { LightService } from '../light.service';

@Component({
  selector: 'demo-multi',
  template: `
    <bc-flex [direction]="'column'" [justify]="'between'" style="height:100vh;">
      <bc-flex><button mat-button color="primary" id="f1" style="margin-left:-50px">feature1</button></bc-flex>
      <bc-flex [justify]="'center'"><button mat-raised-button color="accent" id="f2">feature2</button></bc-flex>
      <bc-flex [justify]="'end'"
        ><button style="margin-right:-40px;" mat-stroked-button color="warn" id="f3">feature3</button></bc-flex
      >
      <bc-flex><button mat-flat-button id="f4" color="primary">feature4</button></bc-flex>
      <bc-flex [justify]="'center'">
        <mat-button-toggle-group name="fontStyle" [style.marginRight]="'-100px'" id="f5">
          <mat-button-toggle value="bold">Bold</mat-button-toggle>
          <mat-button-toggle value="italic">Italic</mat-button-toggle>
          <mat-button-toggle value="underline">Underline</mat-button-toggle>
        </mat-button-toggle-group>
      </bc-flex>
      <bc-flex [justify]="'center'"> <mat-slider id="f6"></mat-slider> </bc-flex>
    </bc-flex>
  `
})
export class MultiComponent implements AfterViewInit {
  constructor(private lightService: LightService) {}

  ngAfterViewInit() {
    const ref = this.lightService.open(document.getElementById('f1')!, {
      contentText: '这是一个button'
    });

    ref
      .backdropClick()
      .pipe(
        take(6),
        map((event, index) => index)
      )
      .subscribe(index => {
        switch (index) {
          case 0:
            ref.next(document.getElementById('f2')!, {
              indicatorShape: 'round',
              contentText: '这还是一个button'
            });
            break;
          case 1:
            ref.next(document.getElementById('f3')!, {
              indicatorShape: 'rect',
              contentText: '这个高亮边框是个矩形'
            });
            break;
          case 2:
            ref.next(document.getElementById('f4')!);
            break;
          case 3:
            ref.next(document.getElementById('f5')!, {
              contentText: '测试一下文字，看看位置是否合适'
            });
            break;
          case 4:
            ref.next(document.getElementById('f6')!, {
              contentText: '一个很长很长的 contentText ，为了测试超长的的 contentText ，看看位置是否正确！'
            });
            break;
          case 5:
            ref.close();
        }
      });
  }
}
```
