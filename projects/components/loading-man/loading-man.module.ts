import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObserversModule } from '@angular/cdk/observers';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoadingManComponent } from './loading-man.component';

@NgModule({
  imports: [CommonModule, MatProgressSpinnerModule, ObserversModule],
  declarations: [LoadingManComponent],
  exports: [LoadingManComponent]
})
export class LoadingManModule {}
