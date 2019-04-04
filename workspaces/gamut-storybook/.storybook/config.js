import { addParameters, configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import wrapper from './decorators/wrapper';
import gamutTheme from './gamutTheme';

// automatically import all files ending in *-story.js
function loadStories() {
  const req = require.context('../stories', true, /\.*-story\.jsx?$/);

  req.keys().forEach(filename => req(filename));
}

addDecorator(wrapper);
addDecorator(withInfo);
addParameters({
  options: {
    panelPosition: 'right',
    theme: gamutTheme,
    showPanel: true,
  },
  info: {
    inline: true,
    source: true,
    header: false,
    styles: stylesheet => ({
      ...stylesheet,
      infoBody: {
        ...stylesheet.infoBody,
        fontFamily: 'inherit',
        padding: '20px 0px 40px 0px',
        border: '0px solid #eee',
      },
      header: {
        ...stylesheet.header,
        body: {},
        h1: {
          fontSize: '2rem',
        },
        h2: {
          fontSize: '1.5rem',
        },
      },
      source: {
        h1: {
          fontSize: '2rem',
        },
        h2: {
          fontSize: '1.5rem',
        },
      },
    }),
  },
});
configure(loadStories, module);
