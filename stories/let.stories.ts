import { storiesOf, moduleMetadata } from '@storybook/angular';

import { MarkdownModule as NgxMarkdownModule } from 'ngx-markdown';

import { LetModule } from '../projects/components';

import { BasicComponent } from '../projects/components/let/demo/basic';
import { MultiComponent } from '../projects/components/let/demo/multi';

import * as basicMd from '../projects/components/let/demo/basic.md';
import * as multiMd from '../projects/components/let/demo/multi.md';
import * as readme from '../projects/components/let/README.md';

import { createStoryWithMarkdown } from './util';

storiesOf('bcLet', module)
  .addParameters({
    notes: readme
  })
  .addDecorator(
    moduleMetadata({
      imports: [LetModule, NgxMarkdownModule.forRoot()],
      declarations: [BasicComponent, MultiComponent]
    })
  )
  .add('basic', createStoryWithMarkdown('demo-basic', basicMd))
  .add('multi', createStoryWithMarkdown('demo-multi', multiMd));
