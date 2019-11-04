import React from 'react';

// @TODO: Convert this to MDX once it is fully supported in storybook

export default {
  title: 'About',
};

export const welcome = () => (
  <div style={{ minHeight: '100vh', padding: '1rem' }}>
    <h1> Welcome to Gamut </h1>
    <p>
      This storybook represents components found in the{' '}
      <a href="https://github.com/Codecademy/client-modules">
        Codecademy Client Modules Repo
      </a>
      .
    </p>
    <h2>Gamut Styles (SCSS)</h2>
    <p>
      {`This storybook displays components, as well as some basic style building blocks in the "Visual" top-level folder, such as`}
      <a href="/?selectedKind=Visuals%2FColors&selectedStory=Portal">
        color variables
      </a>
      . To instead view the core styles for Codecademy, visit the{' '}
      <a href="https://github.com/Codecademy/client-modules/tree/master/packages/gamut-styles">
        Gamut Styles sub-repo
      </a>
      .
    </p>
  </div>
);

welcome.story = {
  name: 'Welcome',

  parameters: {
    options: {
      showPanel: false,
    },
  },
};
