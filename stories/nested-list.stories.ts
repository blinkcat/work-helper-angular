import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withReadme } from 'storybook-readme';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NestedListModule, MarkdownManModule } from '../projects/components';

import { BasicComponent } from '../projects/components/nested-list/demo/basic';
import { DefaultOpenSelectedComponent } from '../projects/components/nested-list/demo/default-open-selected';
import { AutoOpenComponent } from '../projects/components/nested-list/demo/auto-open';

import readme from '../projects/components/nested-list/README.md';

storiesOf('nested-list', module)
  .addDecorator(
    moduleMetadata({
      imports: [BrowserAnimationsModule, NestedListModule, MarkdownManModule]
    })
  )
  .add(
    'basic',
    withReadme([readme], () => ({
      component: BasicComponent
    }))
  )
  .add(
    'custom open and selected',
    withReadme([readme], () => ({
      component: DefaultOpenSelectedComponent
    }))
  )
  .add(
    'auto open',
    withReadme([readme], () => ({
      component: AutoOpenComponent
    }))
  );
