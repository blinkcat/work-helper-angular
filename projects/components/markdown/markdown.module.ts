import { NgModule } from '@angular/core';

import { MarkdownModule as NgxMarkdownModule } from 'ngx-markdown';

import { MarkdownComponent, MarkdownCComponent, MarkdownMComponent } from './markdown.component';
import { MarkdownMcmComponent } from './markdown-mcm.component';

@NgModule({
  imports: [NgxMarkdownModule.forRoot()],
  exports: [MarkdownComponent, MarkdownCComponent, MarkdownMComponent, MarkdownMcmComponent],
  declarations: [MarkdownComponent, MarkdownCComponent, MarkdownMComponent, MarkdownMcmComponent]
})
export class MarkdownModule {}
