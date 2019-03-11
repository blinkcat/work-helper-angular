import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withReadme } from 'storybook-readme';

import { MarkdownModule as NgxMarkdownModule } from 'ngx-markdown';

import { LetModule } from '../projects/components';

import { BasicComponent } from '../projects/components/let/demo/basic';
import { MultiComponent } from '../projects/components/let/demo/multi';

import * as basicMd from '../projects/components/let/demo/basic.md';
import * as multiMd from '../projects/components/let/demo/multi.md';
import * as readme from '../projects/components/let/README.md';

import { createStoryWithMarkdown } from './util';

storiesOf('bcLet', module)
  .addDecorator(
    moduleMetadata({
      imports: [LetModule, NgxMarkdownModule.forRoot()],
      declarations: [BasicComponent, MultiComponent]
    })
  )
  .addDecorator(withReadme([readme]))
  .add('basic', createStoryWithMarkdown('demo-basic', basicMd))
  .add('multi', createStoryWithMarkdown('demo-multi', multiMd));
