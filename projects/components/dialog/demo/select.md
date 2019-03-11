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

  private multiData = [
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
  ];

  private data = [
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
  ];

  constructor(private bcDialog: BcDialogService) {}

  open1() {
    const multiData = this.multiData;

    this.bcDialog
      .select(true, '多选', '默认选中，或者disable', multiData)
      .beforeClosed()
      .subscribe((r: any[]) => {
        if (r) {
          this.selected = r;
          // update
          for (let i = 0; i < multiData.length; i++) {
            if (r.includes(multiData[i].value)) {
              multiData[i].selected = true;
            } else {
              multiData[i].selected = false;
            }
          }

          console.log(multiData);
        }
      });
  }

  open2() {
    const data = this.data;

    this.bcDialog
      .select(false, '单选', '默认选中，或者disable', data)
      .beforeClosed()
      .subscribe(r => {
        if (r) {
          this.checked = r;
          // update
          for (let i = 0; i < data.length; i++) {
            if (r === data[i].value) {
              data[i].checked = true;
            } else {
              data[i].checked = false;
            }
          }
        }
      });
  }
}
```
