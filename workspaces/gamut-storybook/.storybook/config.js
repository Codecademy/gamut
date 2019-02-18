import { configure, addDecorator, setAddon } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { wrapper } from './decorators/wrapper';
import { setDefaults } from '@storybook/addon-info';

addDecorator(
  withInfo({
    styles: s => {
      return {
        button: {
          base: {
            fontFamily: 'sans-serif',
            fontSize: '12px',
            display: 'block',
            position: 'fixed',
            border: 'none',
            background: 'black',
            color: '#fff',
            padding: '5px 15px',
            cursor: 'pointer',
          },
          topRight: {
            top: 'auto',
            bottom: 0,
            right: 0,
            borderRadius: 0,
          },
        },
        info: {
          position: 'fixed',
          background: 'white',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          padding: '0 40px',
          overflow: 'auto',
          zIndex: 99999,
        },
        children: {
          position: 'relative',
          zIndex: 0,
        },
        infoBody: {
          fontWeight: 300,
          lineHeight: 1.45,
          fontSize: '15px',
          border: '1px solid #eee',
          padding: '20px 40px 40px',
          borderRadius: '2px',
          backgroundColor: '#fff',
          marginTop: '20px',
          marginBottom: '20px',
        },
        infoContent: {
          marginBottom: 0,
        },
        infoStory: {},
        jsxInfoContent: {
          borderTop: '1px solid #eee',
          margin: '20px 0 0 0',
        },
        header: {
          h1: {
            fontSize: '30px',
          },
          h2: {
            fontSize: '20px',
          },
          body: {
            borderBottom: '1px solid #eee',
            paddingTop: 10,
            marginBottom: 10,
          },
        },
        source: {
          h1: {
            fontSize: '25px',
            borderBottom: '1px solid #EEE',
            paddingBottom: '10px',
          },
        },
        propTableHead: {
          fontSize: '20px',
        },
      };
    },
  })
);
addDecorator(withKnobs);
addDecorator(wrapper);

function loadStories() {
  // Require all files that match `stories/*-story.js`
  const req = require.context('../', true, /stories\/.*-story\.jsx?$/);
  // And load them
  req.keys().forEach(req);
}

configure(loadStories, module);
