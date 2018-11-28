import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withReadme } from 'storybook-readme';

import { MarkdownModule } from '../projects/components/markdown';

import { BasicComponent } from '../projects/components/markdown/demo/basic';
import readme from '../projects/components/markdown/README.md';

storiesOf('markdown-man 内部使用', module)
  .addDecorator(
    moduleMetadata({
      imports: [MarkdownModule]
    })
  )
  .addDecorator(withReadme([readme]))
  .add('basic', () => ({
    component: BasicComponent
  }));
