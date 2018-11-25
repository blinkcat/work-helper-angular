import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withReadme } from 'storybook-readme';

import { CountDownModule, MarkdownManModule } from '../projects/components';
import { MatButtonModule } from '@angular/material/button';

import { BasicComponent } from '../projects/components/count-down/demo/basic';
import { FormatComponent } from '../projects/components/count-down/demo/format';
import readme from '../projects/components/count-down/README.md';

storiesOf('count-down', module)
  .addDecorator(
    moduleMetadata({
      imports: [CountDownModule, MarkdownManModule, MatButtonModule]
    })
  )
  .add(
    'basic',
    withReadme([readme], () => ({
      component: BasicComponent
    }))
  )
  .add(
    'format',
    withReadme([readme], () => ({
      component: FormatComponent
    }))
  );
