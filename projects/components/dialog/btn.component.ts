import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';

import { ThemePalette } from '@angular/material/core';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DialogBtnComponent {
  @Input() color: ThemePalette;
  /**
   * 只有当 closeOnClick 为 true 时才有意义
   *
   * @type {*}
   * @memberof DialogBtnComponent
   */
  @Input() dialogResult: any;
  /**
   * 点击按钮，关闭弹框
   *
   * @memberof DialogBtnComponent
   */
  @Input() closeOnClick = true;
  @Input() text!: string | TemplateRef<any>;
  @Input() focus = false;

  @Output() dialogBtnClick = new EventEmitter<Event>();

  isTemplateRef = isTemplateRef;

  handleClick(event: Event) {
    this.dialogBtnClick.emit(event);
  }
}
