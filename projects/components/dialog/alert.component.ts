import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BcAlertData } from './bcDialog.service';
import { isTemplateRef } from '../util';

@Component({
  selector: 'bc-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent {
  isTemplateRef = isTemplateRef;

  constructor(@Inject(MAT_DIALOG_DATA) public data: BcAlertData) {}
}
