import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withReadme } from 'storybook-readme';
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';

import { LoadingModule } from '../projects/components';
import { MarkdownModule } from '../projects/components/markdown';

import { BasicComponent } from '../projects/components/loading/demo/basic';
import { WrapComponent } from '../projects/components/loading/demo/wrap';
import { CustomIndicatorComponent } from '../projects/components/loading/demo/custom-indicator';

import readme from '../projects/components/loading/README.md';

storiesOf('loading', module)
  .addDecorator(
    moduleMetadata({
      imports: [LoadingModule, MarkdownModule]
    })
  )
  .addDecorator(withReadme([readme]))
  .addDecorator(withKnobs)
  .add('basic', () => ({
    component: BasicComponent
  }))
  .add('wrap others', () => ({
    component: WrapComponent,
    props: {
      isLoading: boolean('isLoading', false),
      delay: number('delay', 0),
      tip: text('loading tip', '')
    }
  }))
  .add('custom indicator', () => ({
    component: CustomIndicatorComponent
  }));
