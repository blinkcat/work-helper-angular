import { storiesOf, moduleMetadata } from '@storybook/angular';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { withReadme } from 'storybook-readme';

import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { DialogModule, FlexModule } from '../projects/components';
import { MarkdownModule } from '../projects/components/markdown';

import { AlertComponent } from '../projects/components/dialog/demo/alert';
import { SelectComponent } from '../projects/components/dialog/demo/select';

import readme from '../projects/components/dialog/README.md';

storiesOf('dialog', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        FlexModule,
        DialogModule,
        MatButtonModule,
        MarkdownModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatSnackBarModule
      ]
    })
  )
  .addDecorator(withReadme([readme]))
  .add('alert', () => ({
    component: AlertComponent
  }))
  .add('select', () => ({
    component: SelectComponent
  }));
