## flex-item

加上 bc-flex-item 或 bcFlexItem 会默认加上样式 flex:1,保证所有 item 平均分宽度

## source code

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'demo-flex-item',
  template: `
    <bc-flex align="center">
      <bc-flex class="dummy" style="height:40px;" bcFlexItem>1</bc-flex>
      <div class="dummy" style="height:60px;" bcFlexItem>2</div>
      <bc-flex class="dummy" style="height:70px;" bcFlexItem>3</bc-flex>
      <section class="dummy" style="height:90px;" bcFlexItem>4</section>
      <bc-flex class="dummy" style="height:30px;" bcFlexItem>5</bc-flex>
    </bc-flex>
  `,
  styles: [
    `
      .dummy {
        display: block;
        border: 1px solid #ccc;
        margin: 5px;
      }
    `
  ]
})
export class FlexItemComponent {}
```
