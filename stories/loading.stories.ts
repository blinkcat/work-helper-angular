import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withReadme } from 'storybook-readme';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarkdownModule as NgxMarkdownModule } from 'ngx-markdown';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { LoadingModule } from '../projects/components';

import { BasicComponent } from '../projects/components/loading/demo/basic';
import { WrapComponent } from '../projects/components/loading/demo/wrap';
import { CustomIndicatorComponent } from '../projects/components/loading/demo/custom-indicator';

import basicMd from '../projects/components/loading/demo/basic.md';
import wrapMd from '../projects/components/loading/demo/wrap.md';
import customIndicatorMd from '../projects/components/loading/demo/custom-indicator.md';

import readme from '../projects/components/loading/README.md';

import { createStoryWithMarkdown } from './util';

storiesOf('loading', module)
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
      declarations: [BasicComponent, WrapComponent, CustomIndicatorComponent]
    })
  )
  .addDecorator(withReadme([readme]))
  .add('basic', createStoryWithMarkdown('demo-basic', basicMd))
  .add('wrap others', createStoryWithMarkdown('demo-wrap', wrapMd))
  .add('custom indicator', createStoryWithMarkdown('demo-custom-indicator', customIndicatorMd));
