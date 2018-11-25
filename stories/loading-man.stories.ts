import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withReadme } from 'storybook-readme';

import { LoadingManModule } from '../projects/components';

import { BasicComponent } from '../projects/components/loading-man/demo/basic';
import readme from '../projects/components/loading-man/README.md';

storiesOf('loading-man', module)
  .addDecorator(
    moduleMetadata({
      imports: [LoadingManModule]
    })
  )
  .add(
    'basic',
    withReadme([readme], () => ({
      component: BasicComponent
    }))
  );
