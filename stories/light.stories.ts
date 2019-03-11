import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withReadme } from 'storybook-readme';

import { MarkdownModule as NgxMarkdownModule } from 'ngx-markdown';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';

import { LightModule, FlexModule } from '../projects/components';

import { BasicComponent } from '../projects/components/light/demo/basic';
import { MultiComponent } from '../projects/components/light/demo/multi';
import { NoLightComponent } from '../projects/components/light/demo/no-light';

import * as readme from '../projects/components/light/README.md';
import * as basicMd from '../projects/components/light/demo/basic.md';
import * as multiMd from '../projects/components/light/demo/multi.md';
import * as noLightMd from '../projects/components/light/demo/no-light.md';

import { createStoryWithMarkdown } from './util';

storiesOf('light', module)
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
      declarations: [BasicComponent, MultiComponent, NoLightComponent]
    })
  )
  .addDecorator(withReadme([readme]))
  .add('basic', createStoryWithMarkdown('demo-basic', basicMd))
  .add('multi', createStoryWithMarkdown('demo-multi', multiMd))
  .add('no-light', createStoryWithMarkdown('demo-no-light', noLightMd));
