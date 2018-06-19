import { configure, addDecorator, setAddon } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { wrapper } from './decorators/wrapper';
import { setDefaults } from '@storybook/addon-info';

addDecorator(withInfo);
addDecorator(withKnobs);
addDecorator(wrapper);

function loadStories() {
  // Require all files that match `stories/*-story.js`
  const req = require.context('../', true, /stories\/.*-story\.js$/);
  // And load them
  req.keys().forEach(req);
}

configure(loadStories, module);
