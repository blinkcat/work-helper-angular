import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withReadme } from 'storybook-readme';
import { radios, withKnobs } from '@storybook/addon-knobs';

import {
  FlexModule,
  BcFlexJustify,
  BcFlexDirection,
  BcFlexAlign,
  BcFlexWrap,
  BcFlexAlignContent
} from '../projects/components';
import { MarkdownModule } from '../projects/components/markdown';

import { BasicComponent, DumbComponent } from '../projects/components/flex/demo/basic';
import { FlexItemComponent } from '../projects/components/flex/demo/flex-item';

import readme from '../projects/components/flex/README.md';

storiesOf('flex', module)
  .addDecorator(
    moduleMetadata({
      imports: [FlexModule, MarkdownModule],
      declarations: [DumbComponent]
    })
  )
  .addDecorator(withReadme([readme]))
  .addDecorator(withKnobs)
  .add('basic', () => ({
    component: BasicComponent,
    props: {
      direction: radios('direction', Object.keys(BcFlexDirection)),
      justify: radios('justify', Object.keys(BcFlexJustify)),
      align: radios('align', Object.keys(BcFlexAlign)),
      wrap: radios('wrap', Object.keys(BcFlexWrap)),
      alignContent: radios('alignContent', Object.keys(BcFlexAlignContent))
    }
  }))
  .add('flex-item', () => ({
    component: FlexItemComponent,
    props: {
      direction: radios('direction', Object.keys(BcFlexDirection)),
      justify: radios('justify', Object.keys(BcFlexJustify)),
      align: radios('align', Object.keys(BcFlexAlign)),
      wrap: radios('wrap', Object.keys(BcFlexWrap)),
      alignContent: radios('alignContent', Object.keys(BcFlexAlignContent))
    }
  }));
