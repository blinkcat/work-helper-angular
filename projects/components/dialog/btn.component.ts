import { Component, Input, Output, EventEmitter, TemplateRef, ViewEncapsulation } from '@angular/core';

import { ThemePalette } from '@angular/material';
// import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { isTemplateRef } from '../util';

@Component({
  selector: 'bc-dialog-btn',
  templateUrl: 'btn.component.html',
  styles: [
    `
      bc-dialog-btn {
        display: inline-block;
      }
      bc-dialog-btn + bc-dialog-btn {
        margin-left: 8px;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class DialogBtnComponent {
  @Input() color: ThemePalette;
  // 只有当 closeOnClick 为 true 时才有意义
  @Input() dialogResult: any;
  @Input() text!: string | TemplateRef<any>;
  @Input() closeOnClick = true;

  @Input() focus = false;

  @Output() dialogBtnClick = new EventEmitter();

  isTemplateRef = isTemplateRef;

  handleClick() {
    this.dialogBtnClick.emit();
  }
}
