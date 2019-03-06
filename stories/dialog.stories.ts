import { storiesOf, moduleMetadata } from '@storybook/angular';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { withReadme } from 'storybook-readme';

import { MarkdownModule as NgxMarkdownModule } from 'ngx-markdown';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { DialogModule, FlexModule } from '../projects/components';

import { AlertComponent } from '../projects/components/dialog/demo/alert';
import { SelectComponent } from '../projects/components/dialog/demo/select';

import alertMd from '../projects/components/dialog/demo/alert.md';
import selectMd from '../projects/components/dialog/demo/select.md';

import readme from '../projects/components/dialog/README.md';

import { createStoryWithMarkdown } from './util';

storiesOf('dialog', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        FlexModule,
        DialogModule,
        MatButtonModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
        NgxMarkdownModule.forRoot()
      ],
      declarations: [AlertComponent, SelectComponent]
    })
  )
  .addDecorator(withReadme([readme]))
  .add('alert', createStoryWithMarkdown('demo-alert', alertMd))
  .add('select', createStoryWithMarkdown('demo-select', selectMd));
