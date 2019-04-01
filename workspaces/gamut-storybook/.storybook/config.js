import { addParameters, configure, addDecorator } from '@storybook/react';
import wrapper from './decorators/wrapper';
import gamutTheme from './gamutTheme';

// automatically import all files ending in *-story.js
const req = require.context('../stories', true, /\-story\.jsx?$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}
addDecorator(wrapper);
addParameters({
  options: {
    name: 'Gamut',
    panelPosition: 'right',
    theme: gamutTheme,
    showPanel: true,
  },
});
configure(loadStories, module);
