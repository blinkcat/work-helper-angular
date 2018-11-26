import { NgModule } from '@angular/core';

import { MarkdownModule } from 'ngx-markdown';

import { MarkdownManComponent, MarkdownManCComponent, MarkdownManMComponent } from './markdown-man.component';

@NgModule({
  imports: [MarkdownModule.forRoot()],
  exports: [MarkdownManComponent, MarkdownManCComponent, MarkdownManMComponent],
  declarations: [MarkdownManComponent, MarkdownManCComponent, MarkdownManMComponent],
  providers: []
})
export class MarkdownManModule {}
