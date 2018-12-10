import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalModule } from '@angular/cdk/portal';

import { LightComponent } from './light.component';

import { LightService } from './light.service';

@NgModule({
  imports: [CommonModule, PortalModule],
  exports: [],
  declarations: [LightComponent],
  providers: [LightService],
  entryComponents: [LightComponent]
})
export class LightModule {}
