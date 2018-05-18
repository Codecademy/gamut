import { configure, addDecorator, setAddon } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { wrapper } from './decorators/wrapper';
import { setDefaults } from '@storybook/addon-info';

addDecorator(withKnobs);
addDecorator(wrapper);

// Require all files that match `stories/*-story.js`
const req = require.context('../', true, /stories\/.*-story\.js$/);

// And load them
function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
