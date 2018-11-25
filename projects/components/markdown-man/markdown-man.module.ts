import { NgModule } from '@angular/core';

import { MarkdownModule } from 'ngx-markdown';

import { MarkdownManComponent, MarkdownManTopDirective, MarkdownManBottomDirective } from './markdown-man.component';

@NgModule({
  imports: [MarkdownModule.forRoot()],
  exports: [MarkdownManComponent, MarkdownManTopDirective, MarkdownManBottomDirective],
  declarations: [MarkdownManComponent, MarkdownManTopDirective, MarkdownManBottomDirective],
  providers: []
})
export class MarkdownManModule {}
