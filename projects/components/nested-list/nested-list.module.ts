import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// material dependencies
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import {
  NestedListComponent,
  NestedSubListComponent,
  NestedListItemComponent,
  NestedListCollapseComponent
} from './nested-list.component';

@NgModule({
  imports: [CommonModule, MatIconModule, MatListModule],
  declarations: [NestedListComponent, NestedSubListComponent, NestedListItemComponent, NestedListCollapseComponent],
  // only export NestedList
  exports: [NestedListComponent]
})
export class NestedListModule {}
