/**
 * @see https://storybook.js.org/basics/guide-angular/
 */

import { configure, addDecorator } from '@storybook/angular';
import { withOptions } from '@storybook/addon-options';

/**
 * @see https://github.com/storybooks/storybook/tree/v4.0.0-rc.1/addons/options#getting-started
 */
addDecorator(
  withOptions({
    name: 'work helper angular storybook',
    addonPanelInRight: true
  })
);

function loadStories() {
  // put welcome screen at the top of the list so it's the first one displayed
  // require('../stories');

  // automatically import all story ts files that end with *.stories.ts
  const req = require.context('../stories', true, /\.stories\.ts$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
