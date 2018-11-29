import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexComponent, FlexItemDirective } from './flex.component';

@NgModule({
  imports: [CommonModule],
  exports: [FlexComponent, FlexItemDirective],
  declarations: [FlexComponent, FlexItemDirective]
})
export class FlexModule {}
