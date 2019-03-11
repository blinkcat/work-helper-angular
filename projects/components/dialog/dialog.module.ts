import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';

import { AlertComponent } from './alert.component';
import { DialogBtnComponent } from './btn.component';
import { SelectComponent } from './select/select.component';
import { BcDialogService } from './bcDialog.service';

@NgModule({
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatListModule, MatRadioModule],
  declarations: [AlertComponent, DialogBtnComponent, SelectComponent],
  entryComponents: [AlertComponent, SelectComponent],
  providers: [BcDialogService]
})
export class DialogModule {}
