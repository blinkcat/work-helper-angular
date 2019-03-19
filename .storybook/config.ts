/**
 * @see https://storybook.js.org/basics/guide-angular/
 */

import { configure, addParameters } from '@storybook/angular';
import { create } from '@storybook/theming';

/**
 * @see https://github.com/storybooks/storybook/blob/next/MIGRATION.md#options-addon-deprecated
 */
addParameters({
  options: {
    theme: create({
      base: 'light',
      brandTitle: 'work helper angular'
      // brandImage: './miao.jpeg'
    }),
    // name: 'Angular',
    showPanel: false,
    panelPosition: 'right'
  }
});

function loadStories() {
  // put welcome screen at the top of the list so it's the first one displayed
  // require('../stories/count-down.stories');

  // automatically import all story ts files that end with *.stories.ts
  const req = require.context('../stories', true, /\.stories\.ts$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
