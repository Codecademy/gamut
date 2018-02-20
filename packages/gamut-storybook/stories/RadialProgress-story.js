import React from 'react';
import { storiesOf } from '@storybook/react';
import RadialProgress from '@codecademy/gamut/RadialProgress';
import { text, number, boolean, select } from '@storybook/addon-knobs';
import { selectableGamutColors } from './helpers';

// eslint-disable-next-line
const AnimationController = ({ rendering }) => (
  <div>
    {rendering ? (
      <div>
        <RadialProgress size={'8rem'} value={[0, 25]} duration={1000} />
        <RadialProgress size={'8rem'} value={[25, 66]} duration={1000} />
        <RadialProgress size={'8rem'} value={[0, 90]} duration={1000} />
        <RadialProgress size={'8rem'} value={[80, 100]} duration={1000} />
        <RadialProgress size={'8rem'} value={[0, 100]} duration={3000} />
        <RadialProgress size={'8rem'} value={[0, 100]} duration={5000} />
        <p>Click on the rendering checkbox, below, to reset the animations.</p>
      </div>
    ) : (
      <p>Click on the rendering checkbox, below, to see the animations.</p>
    )}
  </div>
);

storiesOf('Component/RadialProgress', module)
  .add(
    'Example Animations',
    () => <AnimationController rendering={boolean('rendering')} />,
    {
      inline: true,
      propTables: false,
    }
  )
  .add(
    'Editable',
    () => (
      <RadialProgress
        style={{ color: select('color', selectableGamutColors, '#000') }}
        size={text('size', '10rem')}
        value={number('value', 30)}
        strokeLinecap={select('strokeLinecap', ['round', 'butt'], 'round')}
        strokeWidth={text('strokeWidth', '10')}
      />
    ),
    {
      inline: true,
      propTables: false,
    }
  );
