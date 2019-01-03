import {
  Component,
  AfterViewInit,
  Inject,
  ViewEncapsulation,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material';
import { MatSelectionList } from '@angular/material/list';
import { MatRadioGroup } from '@angular/material/radio';

import { isTemplateRef } from '../util';
import { BcSelectData } from './bcDialog.service';

@Component({
  selector: 'bc-select',
  templateUrl: 'select.component.html',
  styleUrls: ['select.component.scss'],
  /* tslint:disable: use-host-property-decorator */
  host: {
    class: 'bc-select'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent implements AfterViewInit {
  @ViewChild('checkboxes') checkboxes!: MatSelectionList;
  @ViewChild('radios') radios!: MatRadioGroup;

  isTemplateRef = isTemplateRef;
  multi = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: BcSelectData, private cdf: ChangeDetectorRef) {
    if (data.multi != null) {
      this.multi = data.multi;
    }
  }

  ngAfterViewInit() {
    if (!this.multi && this.radios) {
      setTimeout(() => {
        this.radios.value = this.pickRadioGroupValue();
        this.cdf.detectChanges();
      });
    }
  }

  getValue() {
    if (this.checkboxes || this.radios) {
      if (this.multi) {
        return this.checkboxes.selectedOptions.selected.map(v => v.value);
      } else {
        return this.radios.value;
      }
    } else {
      return null;
    }
  }

  private pickRadioGroupValue() {
    if (this.data.items) {
      for (let i = 0; i < this.data.items.length; i++) {
        if (this.data.items[i].checked) {
          return this.data.items[i].value;
        }
      }
    }
  }
}
