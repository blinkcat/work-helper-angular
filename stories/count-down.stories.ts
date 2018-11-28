import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withReadme } from 'storybook-readme';
import { action } from '@storybook/addon-actions';

import { CountDownModule } from '../projects/components';
import { MarkdownModule } from '../projects/components/markdown';
import { MatButtonModule } from '@angular/material/button';

import { BasicComponent } from '../projects/components/count-down/demo/basic';
import { FormatComponent } from '../projects/components/count-down/demo/format';
import { StopEventComponent } from '../projects/components/count-down/demo/stop-event';

import readme from '../projects/components/count-down/README.md';

storiesOf('count-down', module)
  .addDecorator(
    moduleMetadata({
      imports: [CountDownModule, MarkdownModule, MatButtonModule]
    })
  )
  .addDecorator(withReadme([readme]))
  .add('basic', () => ({
    component: BasicComponent
  }))
  .add('format', () => ({
    component: FormatComponent
  }))
  .add('stop event', () => ({
    component: StopEventComponent,
    props: {
      stopCb: action('stop event')
    }
  }));
