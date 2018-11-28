## basic

just for test

```typescript
import { Component } from '@angular/core';
import basicMd from './basic.md';

@Component({
  selector: 'demo-basic',
  template: `
    <bc-markdown>
      <bc-markdown-md>{{ md }}</bc-markdown-md>
    </bc-markdown>

    <bc-markdown-mcm [mdTop]="md"> <p>works also</p> </bc-markdown-mcm>
  `
})
export class BasicComponent {
  md: string = basicMd;
}
```
