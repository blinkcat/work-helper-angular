## 不高亮元素

## source code

```typescript
import { Component, AfterViewInit, TemplateRef, ViewChild } from '@angular/core';
import { LightService } from '../light.service';

@Component({
  selector: 'demo-no-light',
  template: `
    <section>
      <h3>Goals</h3>
      <p>
        The mission of the Angular CLI is to improve your development productivity. We came to a point where we needed a
        more powerful and generic facility to support the CLI scaffolding, and we settled on 4 primary goals:
      </p>
      <ol>
        <li>
          Ease of use and development. It had to have simple concepts for developers that were intuitive and feel
          natural. Also, the code developed needed to be synchronous to make it easier to develop.
        </li>
        <li>
          Extensibility and Reusability. By keeping reusability in mind, we were able to design a simple but powerful
          pipeable interface. Schematics can be added as the input, or the output of other Schematics. For example, an
          application can be created using components and modules schematics.
        </li>
        <li>
          Atomicity. We had many errors in the CLI blueprints that were the direct result of side effects by our
          blueprints. When we created Schematics, we decided to remove side effects entirely from our code. All the
          changes are recorded in memory, and only applied once they’re confirmed to be valid. For example, creating a
          file that already exist is an error, and would discard all the other changes applied so far.
        </li>
        <li>
          Asynchronicity. Many workflow are asynchronous in nature (e.g. accessing web servers), and so Schematics had
          to support those use cases. This seems in contradiction with the first goal of making the debugging process
          synchronous, but we came to a design that made everything work together. The input of a Schematics is
          synchronous, but the output can be asynchronous, and the library will wait for everything to be done before
          starting the next step. This way developers can reuse without even knowing that a Schematics is asynchronous.
        </li>
      </ol>
      <p>
        All the Schematics design decisions turned out around these 4 major goals. Schematics is the combined efforts to
        build a better workflow tool.
      </p>
    </section>
    <ng-template #arrow>
      <mat-card class="tip"
        >点击右上角<i class="tip-indicator"></i>在浏览器中打开<img
          width="20"
          height="20"
          style="margin-left:5px;"
          src="https://img.icons8.com/ios/100/000000/right-up2.png"
      /></mat-card>
    </ng-template>
  `,
  /* tslint:disable: max-line-length */
  styles: [
    `
      :host {
        display: block;
        height: 100vh;
      }

      .tip {
        font-size: 16px;
        display: flex;
        align-items: center;
      }
      .tip-indicator {
        display: inline-block;
        width: 24px;
        height: 24px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAArCAYAAADhXXHAAAAAAXNSR0IArs4c6QAAAslJREFUWAntmc2q2kAUx0/iJ4go4nUpckEUl92WvEKxm3tBhL6AOxc+g3tX7rpR6qbQV5BuC65UxCKuBMUPRPxArz3/YMJlIteUap2WHAjJmcyc+eWfmWSSo9AZ63a7H7n4iTfteDw+8OY9U+2qRYqi7Hgbc9Amb41UKvVV7EB5XdDr9d4dDofPbrf7MRgM+n0+n8rHxEFeV7vJMQtC+/2ettvty3K53PDxT5fL9SmZTP4wOjQpOp3OBy78EolEvKFQSDUq3Gs/n89feNvxRTyn0+lv4NBhT4p+j8Vi/kAgcC8+S7+r1YrG4/FGVdX3UFhXELceisoECnLwhMNhL/jgq5hMGKMy3HoAicawmDeP4ISyT5hMYiWZ/BPfE2A1zHqZ4ESWE5+m4jmKx5PMBj5wAtb7N56jfyIG+MAp9e0XL9CBFRW5lu8oey0lxTiOsqIi1/L/X2VHoxH1+/03hVqv18RrY8L+LUMcxPsds/2erdVqVKlU9NiaplG5XLb0MxgMqFAo0HQ6JV5y6vUTiYSlXqlUomYTXy+k18/lcpY65wpsDQNeT1K1WjXbo6NWq2X6xkG9XtdB4QMYvmhoZ4DiHOIivh2zBcsrdRIXOx6PxxJfLBN9NBDLEBfx7ZitWlhIFItFs6NsNkuZTMYSP5/PUzwe18uxhy8a2qE9DOCIa3chpbTb7SMCi8qJncDfbDb4+iT+qjh32iybTCYUjUZN/9zBYrEgXqeS33953Y+v3uFwSLYnGDpEYDvBL4Ei1qULRh3RbA0DsdG9fAf2Vso7yjrKsgLOMHCGAYYBv5fxD/RWYlwlLvjACdgx3r0yG/jAiQnWxK9xmWFPfE3ANvAPX2bYE19DRVYEyQZeskmpLnIL4AOn/pxFVmQ2m+3wD18mAw+SIOADlw6L5ALPuGckG2RRGBzgAZeRXjJTSyD/Z/JggDVM1gzjL2dFSRftpKDBAAAAAElFTkSuQmCC)
          no-repeat 50%;
        background-size: contain;
        margin: 0 5px;
      }
      ::ng-deep .bc-light-tip {
        right: 0;
      }
    `
  ]
  /* tslint:enable: max-line-length */
})
export class NoLightComponent implements AfterViewInit {
  @ViewChild('arrow') arrow!: TemplateRef<any>;

  constructor(private lightService: LightService) {}

  ngAfterViewInit() {
    this.lightService.open(null, {
      customTemplate: this.arrow,
      noContextAutoAdjust: true,
      fixed: true
    });
  }
}
```
