import { storiesOf, moduleMetadata } from '@storybook/angular';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { withReadme } from 'storybook-readme';

import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';

import { LightModule, FlexModule } from '../projects/components';
import { MarkdownModule } from '../projects/components/markdown';

import { BasicComponent } from '../projects/components/light/demo/basic';
import { MultiComponent } from '../projects/components/light/demo/multi';
import { NoLightComponent } from '../projects/components/light/demo/no-light';

import readme from '../projects/components/light/README.md';

storiesOf('light', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        LightModule,
        MarkdownModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatSliderModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        FlexModule
      ]
    })
  )
  .addDecorator(withReadme([readme]))
  .add('basic', () => ({
    component: BasicComponent
  }))
  .add('multi', () => ({
    component: MultiComponent
  }))
  .add('no-light', () => ({
    component: NoLightComponent
  }));
