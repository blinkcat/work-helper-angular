import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { storiesOf, moduleMetadata } from '@storybook/angular';

import { MarkdownModule as NgxMarkdownModule } from 'ngx-markdown';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { LoadingModule } from '../projects/components';

import { BasicComponent } from '../projects/components/loading/demo/basic';
import { CustomIndicatorComponent } from '../projects/components/loading/demo/custom-indicator';

import * as readme from '../projects/components/loading/README.md';
import * as basicMd from '../projects/components/loading/demo/basic.md';
import * as customIndicatorMd from '../projects/components/loading/demo/custom-indicator.md';

import { createStoryWithMarkdown } from './util';

storiesOf('loading', module)
  .addParameters({
    notes: readme
  })
  .addDecorator(
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        LoadingModule,
        NgxMarkdownModule.forRoot()
      ],
      declarations: [BasicComponent, CustomIndicatorComponent]
    })
  )
  .add('basic', createStoryWithMarkdown('demo-basic', basicMd))
  .add('custom indicator', createStoryWithMarkdown('demo-custom-indicator', customIndicatorMd));
