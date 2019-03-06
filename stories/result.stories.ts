import { storiesOf, moduleMetadata } from '@storybook/angular';
import { BrowserModule } from '@angular/platform-browser';
import { withReadme } from 'storybook-readme';

import { MarkdownModule as NgxMarkdownModule } from 'ngx-markdown';

import { MatIconModule } from '@angular/material/icon';

import { ResultModule } from '../projects/components';

import { BasicComponent } from '../projects/components/result/demo/basic';
import { SuccessComponent } from '../projects/components/result/demo/success';
import { FailureComponent } from '../projects/components/result/demo/failure';
import { WaitComponent } from '../projects/components/result/demo/wait';
import { WarnComponent } from '../projects/components/result/demo/warn';

import basicMd from '../projects/components/result/demo/basic.md';
import successMd from '../projects/components/result/demo/success.md';
import failureMd from '../projects/components/result/demo/failure.md';
import waitMd from '../projects/components/result/demo/wait.md';
import warnMd from '../projects/components/result/demo/warn.md';

import readme from '../projects/components/result/README.md';

import { createStoryWithMarkdown } from './util';

storiesOf('result', module)
  .addDecorator(
    moduleMetadata({
      imports: [BrowserModule, ResultModule, MatIconModule, NgxMarkdownModule.forRoot()],
      declarations: [BasicComponent, SuccessComponent, FailureComponent, WaitComponent, WarnComponent]
    })
  )
  .addDecorator(withReadme([readme]))
  .add('basic', createStoryWithMarkdown('demo-basic', basicMd))
  .add('success', createStoryWithMarkdown('demo-success', successMd))
  .add('failure', createStoryWithMarkdown('demo-failure', failureMd))
  .add('wait', createStoryWithMarkdown('demo-wait', waitMd))
  .add('warn', createStoryWithMarkdown('demo-warn', warnMd));
