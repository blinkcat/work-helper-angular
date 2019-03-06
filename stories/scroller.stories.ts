import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withReadme } from 'storybook-readme';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarkdownModule as NgxMarkdownModule } from 'ngx-markdown';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ScrollerModule } from '../projects/components';

import { BasicComponent } from '../projects/components/scroller/demo/basic';
import { SnapComponent } from '../projects/components/scroller/demo/snap';
import { CompleteComponent } from '../projects/components/scroller/demo/complete';

import basicMd from '../projects/components/scroller/demo/basic.md';
import snapMd from '../projects/components/scroller/demo/snap.md';
import completeMd from '../projects/components/scroller/demo/complete.md';

import readme from '../projects/components/scroller/README.md';

import { createStoryWithMarkdown } from './util';

storiesOf('scroller', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
        ScrollerModule,
        MatCheckboxModule,
        MatInputModule,
        MatFormFieldModule,
        NgxMarkdownModule.forRoot()
      ],
      declarations: [BasicComponent, SnapComponent, CompleteComponent]
    })
  )
  .addDecorator(withReadme([readme]))
  .add('basic', createStoryWithMarkdown('demo-basic', basicMd))
  .add('snap', createStoryWithMarkdown('demo-snap', snapMd))
  .add('complete', createStoryWithMarkdown('demo-complete', completeMd));
