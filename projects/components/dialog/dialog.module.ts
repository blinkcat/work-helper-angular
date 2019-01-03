import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { A11yModule } from '@angular/cdk/a11y';

import { AlertComponent } from './alert.component';
import { DialogBtnComponent } from './btn.component';
import { SelectComponent } from './select.component';
import { BcDialogService } from './bcDialog.service';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatListModule,
    MatRadioModule,
    MatDividerModule,
    A11yModule
  ],
  declarations: [AlertComponent, DialogBtnComponent, SelectComponent],
  entryComponents: [AlertComponent, SelectComponent],
  providers: [BcDialogService]
})
export class DialogModule {}
