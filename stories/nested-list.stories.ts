import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withReadme } from 'storybook-readme';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NestedListModule } from '../projects/components';

import { BasicComponent } from '../projects/components/nested-list/demo/basic';
import basicMd from '../projects/components/nested-list/demo/basic.md';
import readme from '../projects/components/nested-list/README.md';

storiesOf('nested-list', module)
  .addDecorator(
    moduleMetadata({
      imports: [BrowserAnimationsModule, NestedListModule]
    })
  )
  .add(
    'basic',
    withReadme([basicMd, readme], () => ({
      component: BasicComponent
    }))
  );
