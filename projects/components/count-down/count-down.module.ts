import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountDownComponent } from './count-down.component';

@NgModule({
  imports: [CommonModule],
  exports: [CountDownComponent],
  declarations: [CountDownComponent]
})
export class CountDownModule {}
