import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withReadme } from 'storybook-readme';

import { MarkdownManModule } from '../projects/components';

import { BasicComponent } from '../projects/components/markdown-man/demo/basic';
import readme from '../projects/components/markdown-man/README.md';

storiesOf('markdown-man', module)
  .addDecorator(
    moduleMetadata({
      imports: [MarkdownManModule]
    })
  )
  .add(
    'basic',
    withReadme([readme], () => ({
      component: BasicComponent
    }))
  );
