import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withReadme } from 'storybook-readme';
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';

import { LoadingManModule, MarkdownManModule } from '../projects/components';

import { BasicComponent } from '../projects/components/loading-man/demo/basic';
import { WrapComponent } from '../projects/components/loading-man/demo/wrap';
import { CustomIndicatorComponent } from '../projects/components/loading-man/demo/custom-indicator';

import readme from '../projects/components/loading-man/README.md';

storiesOf('loading-man', module)
  .addDecorator(
    moduleMetadata({
      imports: [LoadingManModule, MarkdownManModule]
    })
  )
  .addDecorator(withKnobs)
  .add(
    'basic',
    withReadme([readme], () => ({
      component: BasicComponent
    }))
  )
  .add(
    'wrap others',
    withReadme([readme], () => ({
      component: WrapComponent,
      props: {
        isLoading: boolean('isLoading', false),
        delay: number('delay', 0),
        tip: text('loading tip', '')
      }
    }))
  )
  .add(
    'custom indicator',
    withReadme([readme], () => ({
      component: CustomIndicatorComponent
    }))
  );
