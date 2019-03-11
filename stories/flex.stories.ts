import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withReadme } from 'storybook-readme';

import { MarkdownModule as NgxMarkdownModule } from 'ngx-markdown';

import { MatRadioModule } from '@angular/material/radio';

import { FlexModule } from '../projects/components';

import { BasicComponent } from '../projects/components/flex/demo/basic';
import { FlexItemComponent } from '../projects/components/flex/demo/flex-item';

import * as basicMd from '../projects/components/flex/demo/basic.md';
import * as flexItemMd from '../projects/components/flex/demo/flex-item.md';
import * as readme from '../projects/components/flex/README.md';

import { createStoryWithMarkdown } from './util';

storiesOf('flex', module)
  .addDecorator(
    moduleMetadata({
      imports: [FlexModule, NgxMarkdownModule.forRoot(), MatRadioModule],
      declarations: [BasicComponent, FlexItemComponent]
    })
  )
  .addDecorator(withReadme([readme]))
  .add('basic', createStoryWithMarkdown('demo-basic', basicMd))
  .add('flex-item', createStoryWithMarkdown('demo-flex-item', flexItemMd));
