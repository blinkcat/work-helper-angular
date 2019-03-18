import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { storiesOf, moduleMetadata } from '@storybook/angular';

import { MarkdownModule as NgxMarkdownModule } from 'ngx-markdown';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';

import { LightModule, FlexModule } from '../projects/components';

import { BasicComponent } from '../projects/components/light/demo/basic';
import { MultiComponent } from '../projects/components/light/demo/multi';

import * as readme from '../projects/components/light/README.md';
import * as basicMd from '../projects/components/light/demo/basic.md';
import * as multiMd from '../projects/components/light/demo/multi.md';

import { createStoryWithMarkdown } from './util';

storiesOf('light', module)
  .addParameters({
    notes: readme
  })
  .addDecorator(
    moduleMetadata({
      imports: [
        LightModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatSliderModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        FlexModule,
        NgxMarkdownModule.forRoot()
      ],
      declarations: [BasicComponent, MultiComponent]
    })
  )
  .add('basic', createStoryWithMarkdown('demo-basic', basicMd))
  .add('multi', createStoryWithMarkdown('demo-multi', multiMd));
