import { storiesOf, moduleMetadata } from '@storybook/angular';
import { BrowserModule } from '@angular/platform-browser';
import { withReadme } from 'storybook-readme';

import { MatIconModule } from '@angular/material/icon';

import { ResultModule } from '../projects/components';
import { MarkdownModule } from '../projects/components/markdown';

import { BasicComponent } from '../projects/components/result/demo/basic';
import { SuccessComponent } from '../projects/components/result/demo/success';
import { FailureComponent } from '../projects/components/result/demo/failure';
import { WaitComponent } from '../projects/components/result/demo/wait';
import { WarnComponent } from '../projects/components/result/demo/warn';

import readme from '../projects/components/result/README.md';

storiesOf('result', module)
  .addDecorator(
    moduleMetadata({
      imports: [MarkdownModule, BrowserModule, ResultModule, MatIconModule]
    })
  )
  .addDecorator(withReadme([readme]))
  .add('basic', () => ({
    component: BasicComponent
  }))
  .add('success', () => ({
    component: SuccessComponent
  }))
  .add('failure', () => ({
    component: FailureComponent
  }))
  .add('wait', () => ({
    component: WaitComponent
  }))
  .add('warn', () => ({
    component: WarnComponent
  }));
