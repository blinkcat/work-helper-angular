## select

单选和多选

## sourcecode

```typescript
import { Component } from '@angular/core';

import { BcDialogService } from '../bcDialog.service';

@Component({
  selector: 'demo-select',
  template: `
    <bc-flex justify="between"> <button mat-raised-button (click)="open1()">多选</button> </bc-flex>
    <p>selected: {{ selected | json }}</p>

    <bc-flex justify="between"> <button mat-raised-button (click)="open2()">单选</button> </bc-flex>
    <p>checked: {{ checked | json }}</p>
  `
})
export class SelectComponent {
  selected: any;
  checked: any;

  constructor(private bcDialog: BcDialogService) {}

  open1() {
    this.bcDialog
      .select(true, '多选', '默认选中，或者disable', [
        {
          label: 'test1',
          value: 'test1'
        },
        {
          label: 'test2',
          value: 'test2',
          selected: true
        },
        {
          label: 'test3',
          value: 'test3',
          disabled: true
        },
        {
          label: 'test4',
          value: 'test4'
        },
        {
          label: 'test5',
          value: 'test5'
        }
      ])
      .beforeClosed()
      .subscribe(r => {
        if (r) {
          this.selected = r;
        }
      });
  }

  open2() {
    this.bcDialog
      .select(false, '单选', '默认选中，或者disable', [
        {
          label: 'test1',
          value: 'test1'
        },
        {
          label: 'test2',
          value: 'test2',
          checked: true
        },
        {
          label: 'test3',
          value: 'test3',
          disabled: true
        },
        {
          label: 'test4',
          value: 'test4'
        },
        {
          label: 'test5',
          value: 'test5'
        }
      ])
      .beforeClosed()
      .subscribe(r => {
        if (r) {
          this.checked = r;
        }
      });
  }
}
```
