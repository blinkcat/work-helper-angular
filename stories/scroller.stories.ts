import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withReadme } from 'storybook-readme';
import { boolean, number, withKnobs } from '@storybook/addon-knobs';
// import { action } from '@storybook/addon-actions';

import { ScrollerModule } from '../projects/components';
import { MarkdownModule } from '../projects/components/markdown';

import { BasicComponent } from '../projects/components/scroller/demo/basic';
import { SnapComponent } from '../projects/components/scroller/demo/snap';
import { CompleteComponent } from '../projects/components/scroller/demo/complete';

import readme from '../projects/components/scroller/README.md';

storiesOf('scroller', module)
  .addDecorator(
    moduleMetadata({
      imports: [ScrollerModule, MarkdownModule]
    })
  )
  .addDecorator(withKnobs)
  .addDecorator(withReadme([readme]))
  .add('basic', () => ({
    component: BasicComponent,
    props: {
      bouncing: boolean('bouncing', true),
      animating: boolean('animating', true),
      scrollingX: boolean('scrollingX', true),
      scrollingY: boolean('scrollingY', true),
      animationDuration: number('animationDuration', 250)
    }
  }))
  .add('snap', () => ({
    component: SnapComponent,
    props: {
      bouncing: boolean('bouncing', true),
      scrollingX: boolean('scrollingX', true),
      scrollingY: boolean('scrollingY', true),
      snapping: boolean('snapping', true),
      snapWidth: number('snapWidth', 76),
      snapHeight: number('snapHeight', 76)
    }
  }))
  .add('complete', () => ({
    component: CompleteComponent
  }));
