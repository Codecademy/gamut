import React from 'react';
import { RadialProgress } from '../../gamut/src';
import {
  withKnobs,
  text,
  number,
  boolean,
  select,
} from '@storybook/addon-knobs';
import { selectableColors } from './helpers';

// eslint-disable-next-line
const AnimationController = ({ rendering }) => (
  <div>
    {rendering ? (
      <div>
        <RadialProgress size="8rem" value={[0, 25]} duration={1000} />
        <RadialProgress size="8rem" value={[25, 66]} duration={1000} />
        <RadialProgress size="8rem" value={[0, 90]} duration={1000} />
        <RadialProgress size="8rem" value={[80, 100]} duration={1000} />
        <RadialProgress size="8rem" value={[0, 100]} duration={3000} />
        <RadialProgress size="8rem" value={[0, 100]} duration={5000} />
        <p>Click on the rendering checkbox below, to reset the animations.</p>
      </div>
    ) : (
      <p>Click on the rendering checkbox below, to see the animations.</p>
    )}
  </div>
);

export default {
  component: RadialProgress,
  title: 'Component/RadialProgress',
  decorators: [withKnobs],
};

export const exampleAnimations = () => (
  <AnimationController rendering={boolean('rendering')} />
);

exampleAnimations.story = {
  name: 'Example Animations',

  parameters: {
    info: {
      inline: true,
      propTables: false,
    },
  },
};

export const editable = () => (
  <RadialProgress
    style={{ color: select('color', selectableColors, 'black') }}
    size={text('size', '10rem')}
    value={number('value', 30)}
    strokeLinecap={select('strokeLinecap', ['round', 'butt'], 'round')}
    strokeWidth={text('strokeWidth', '10')}
  />
);

editable.story = {
  name: 'Editable',

  parameters: {
    info: {
      inline: true,
      propTables: false,
    },
  },
};
