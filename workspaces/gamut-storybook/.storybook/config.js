import { addParameters, configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import wrapper from './decorators/wrapper';
import gamutTheme from './gamutTheme';

// automatically import all files ending in *-story.js
function loadStories() {
  const req = require.context('../stories', true, /\.*-story\.jsx?$/);
  req.keys().forEach(filename => req(filename));
}

addDecorator(withInfo);
addDecorator(wrapper);

addParameters({
  options: {
    panelPosition: 'right',
    theme: gamutTheme,
    showPanel: true,
  },
  info: {
    inline: true,
    source: true,
    styles: stylesheet => ({
      ...stylesheet,
      infoBody: {
        ...stylesheet.infoBody,
        fontFamily: 'inherit',
        padding: '20px 0px 40px 0px',
        border: '0px solid #eee',
      },
      propTableHead: {
        margin: '20px 0 0 0',
        fontSize: '20px',
        fontFamily: 'inherit',
      },
    }),
  },
});
configure(loadStories, module);
