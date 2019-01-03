## source code

```typescript
import { Component } from '@angular/core';

import { BcDialogService } from '../bcDialog.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'demo-alert',
  template: `
    <bc-flex justify="between">
      <button mat-raised-button (click)="open1()">简单的</button>
      <button mat-raised-button (click)="open2()">带返回值</button>
      <button mat-raised-button (click)="open3()">带点击回调</button>
      <button mat-raised-button (click)="open4()">手动关闭</button>
    </bc-flex>
  `
})
export class AlertComponent {
  constructor(private bcDialog: BcDialogService, private snackBar: MatSnackBar) {}

  open1() {
    this.bcDialog.alert(null, '你真的要还款？', [{ text: '取消' }, { text: '确定', color: 'primary', focus: true }]);
  }

  open2() {
    this.bcDialog
      .alert(null, '关闭后带返回值', [
        { text: '不需要' },
        { text: '带一个id', color: 'primary', focus: true, dialogResult: 15 }
      ])
      .afterClosed()
      .subscribe(result => result != null && alert(result));
  }

  open3() {
    this.bcDialog.alert(null, '按钮点击回调', [
      { text: '第一个', onClick: () => alert('第一个'), closeOnClick: false },
      { text: '第二个', onClick: () => alert('第二个'), closeOnClick: false },
      { text: '第三个', color: 'primary', focus: true, onClick: () => alert('第三个'), closeOnClick: false },
      { text: 'close', color: 'warn' }
    ]);
  }

  open4() {
    const ref = this.bcDialog.alert(null, '点击确定，3s后关闭', [
      {
        text: '确定',
        color: 'primary',
        focus: true,
        closeOnClick: false,
        onClick: () => {
          this.snackBar.open('3s后就关闭了', '知道了', {
            duration: 3000
          });
          setTimeout(() => {
            ref.close();
          }, 3000);
        }
      }
    ]);
  }
}
```
