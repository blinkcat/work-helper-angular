import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

import { ResultComponent } from './result.component';

@NgModule({
  imports: [CommonModule, MatButtonModule],
  exports: [ResultComponent],
  declarations: [ResultComponent],
  providers: []
})
export class ResultModule {}
