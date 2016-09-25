import { configure, setAddon, addDecorator } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import { withKnobs } from '@kadira/storybook-addon-knobs';
import { wrapper } from './decorators/wrapper';

addDecorator(withKnobs);
addDecorator(wrapper);
setAddon(infoAddon);

// Require all files that match `stories/*-story.js`
const req = require.context('../', true, /stories\/.*-story\.js$/);

// And load them
function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
