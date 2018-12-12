## source code

```typescript
import { Component, AfterViewInit } from '@angular/core';
import { LightService } from '../light.service';

@Component({
  selector: 'demo-multi',
  template: `
    <bc-flex [direction]="'column'" [justify]="'between'" style="height:100vh;">
      <bc-flex><button mat-button color="primary" id="f1">feature1</button></bc-flex>
      <bc-flex [justify]="'center'"><button mat-raised-button color="accent" id="f2">feature2</button></bc-flex>
      <bc-flex [justify]="'end'"><button mat-stroked-button color="warn" id="f3">feature3</button></bc-flex>
      <bc-flex><button mat-flat-button id="f4" color="primary">feature4</button></bc-flex>
      <bc-flex [justify]="'center'">
        <mat-button-toggle-group name="fontStyle" aria-label="Font Style" id="f5">
          <mat-button-toggle value="bold">Bold</mat-button-toggle>
          <mat-button-toggle value="italic">Italic</mat-button-toggle>
          <mat-button-toggle value="underline">Underline</mat-button-toggle>
        </mat-button-toggle-group>
      </bc-flex>
      <bc-flex [justify]="'center'"> <mat-slider id="f6"></mat-slider> </bc-flex>
    </bc-flex>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `
  ]
})
export class MultiComponent implements AfterViewInit {
  constructor(private lightService: LightService) {}

  ngAfterViewInit() {
    this.lightService.addLight(document.getElementById('f1')!, {
      contentText: '这是一个button',
      dismissText: '点击任意位置继续'
    });
    this.lightService.addLight(document.getElementById('f2')!, {
      indicatorShape: 'round',
      contentText: '这还是一个button',
      dismissText: `默认的 "dismissText" 是 "知道了"`
    });
    this.lightService.addLight(document.getElementById('f3')!, {
      indicatorShape: 'rect',
      contentText: '这个高亮边框是个矩形'
    });
    this.lightService.addLight(document.getElementById('f4')!);
    this.lightService.addLight(document.getElementById('f5')!);
    this.lightService.addLight(document.getElementById('f6')!, {
      contentText: '一个很长很长的 contentText ，为了测试超长的的 contentText ，看看位置是否正确！'
    });
    this.lightService.start();
  }
}
```
