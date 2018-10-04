import { storiesOf, action } from '@storybook/react';
import React from 'react';

storiesOf('About', module).add('Welcome', () => (
  <div>
    <h1> Welcome to Gamut </h1>
    <p>
      This storybook represents components found in the{' '}
      <a href="https://github.com/RyzacInc/gamut">Codecademy Gamut Repo</a>.
    </p>
    <h2>Disclaimer</h2>
    <p>While already quite useful, Gamut is currently a work in progress.</p>
    <h2>Gamut Styles (SCSS)</h2>
    <p>
      This storybook displays components, as well as some basic style building
      blocks in the "Visual" top-level folder, such as{' '}
      <a href="/?selectedKind=Visuals%2FColors&selectedStory=Portal">
        color variables
      </a>
      . To instead view the core styles for Codecademy, visit the{' '}
      <a href="https://github.com/RyzacInc/gamut/tree/master/packages/gamut-styles">
        Gamut Styles sub-repo
      </a>
      .
    </p>
  </div>
));
