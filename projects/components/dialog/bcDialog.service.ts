import { Injectable, TemplateRef } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { MatDialog, MatDialogConfig, ThemePalette } from '@angular/material';

import { AlertComponent } from './alert.component';
import { SelectComponent } from './select.component';

//#region type and interface
type StringOrTemplateRef = string | TemplateRef<any>;

interface ButtonData {
  text: StringOrTemplateRef;
  focus?: boolean;
  dialogResult?: any; // 点击按钮关闭dialog时的返回值
  closeOnClick?: boolean;
  onClick?: AnyFunction;
  color?: ThemePalette;
}

export interface BcAlertData {
  title?: StringOrTemplateRef;
  message?: StringOrTemplateRef;
  actions?: ButtonData[];
}

export interface BcSelectItem {
  label: string | TemplateRef<any>;
  value: any;
  disabled?: boolean;
  selected?: boolean;
  checked?: boolean;
}

export interface BcSelectData {
  title?: StringOrTemplateRef;
  message?: StringOrTemplateRef;
  multi?: boolean;
  items: BcSelectItem[];
}
//#endregion

@Injectable()
export class BcDialogService {
  constructor(private dialog: MatDialog) {}

  alert(
    title?: StringOrTemplateRef | null,
    message?: StringOrTemplateRef | null,
    actions?: ButtonData[] | null,
    dialogConfig?: MatDialogConfig
  ) {
    const completeActions = this.completeActions(actions);

    return this.open<AlertComponent, BcAlertData, any>(AlertComponent, {
      ...dialogConfig,
      role: 'alertdialog',
      disableClose: true,
      data: { title, message, actions: completeActions }
    });
  }

  select(
    multi = true,
    title: StringOrTemplateRef | null = null,
    message: StringOrTemplateRef | null = null,
    items: BcSelectItem[],
    dialogConfig?: MatDialogConfig
  ) {
    return this.open<SelectComponent, BcSelectData, BcSelectItem['value']>(SelectComponent, {
      // autoFocus: false,
      ...dialogConfig,
      data: {
        title,
        message,
        items,
        multi
      }
    });
  }

  private open<T = any, D = any, R = any>(comp: ComponentType<T>, dialogConfig?: MatDialogConfig) {
    return this.dialog.open<T, D, R>(comp, {
      minWidth: 280,
      ...dialogConfig
    });
  }

  private completeActions(actions?: ButtonData[] | null) {
    return actions ? actions.map(action => ({ focus: false, closeOnClick: true, ...action })) : actions;
  }
}
