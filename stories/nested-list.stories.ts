import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withReadme } from 'storybook-readme';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NestedListModule } from '../projects/components';
import { MarkdownModule } from '../projects/components/markdown';

import { BasicComponent } from '../projects/components/nested-list/demo/basic';
import { DefaultOpenSelectedComponent } from '../projects/components/nested-list/demo/default-open-selected';
import { AutoOpenComponent } from '../projects/components/nested-list/demo/auto-open';

import readme from '../projects/components/nested-list/README.md';

storiesOf('nested-list', module)
  .addDecorator(
    moduleMetadata({
      imports: [BrowserAnimationsModule, NestedListModule, MarkdownModule]
    })
  )
  .addDecorator(withReadme([readme]))
  .add('basic', () => ({
    component: BasicComponent
  }))
  .add('custom open and selected', () => ({
    component: DefaultOpenSelectedComponent
  }))
  .add('auto open', () => ({
    component: AutoOpenComponent
  }));
