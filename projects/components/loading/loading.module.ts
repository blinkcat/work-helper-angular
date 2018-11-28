import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObserversModule } from '@angular/cdk/observers';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoadingComponent } from './loading.component';

@NgModule({
  imports: [CommonModule, MatProgressSpinnerModule, ObserversModule],
  declarations: [LoadingComponent],
  exports: [LoadingComponent]
})
export class LoadingModule {}
