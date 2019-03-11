import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withReadme } from 'storybook-readme';

import { MarkdownModule as NgxMarkdownModule } from 'ngx-markdown';

import { MatButtonModule } from '@angular/material/button';

import { CountDownModule } from '../projects/components';

import { BasicComponent } from '../projects/components/count-down/demo/basic';
import { FormatComponent } from '../projects/components/count-down/demo/format';
import { StopEventComponent } from '../projects/components/count-down/demo/stop-event';

import * as readme from '../projects/components/count-down/README.md';
import * as basicMd from '../projects/components/count-down/demo/basic.md';
import * as formatMd from '../projects/components/count-down/demo/format.md';
import * as stopEventMd from '../projects/components/count-down/demo/stop-event.md';

import { createStoryWithMarkdown } from './util';

storiesOf('count-down', module)
  .addDecorator(
    moduleMetadata({
      imports: [CountDownModule, MatButtonModule, NgxMarkdownModule.forRoot()],
      declarations: [BasicComponent, FormatComponent, StopEventComponent]
    })
  )
  .addDecorator(withReadme([readme]))
  .add('basic', createStoryWithMarkdown('demo-basic', basicMd))
  .add('format', createStoryWithMarkdown('demo-format', formatMd))
  .add('stop event', createStoryWithMarkdown('demo-stop-event', stopEventMd));
