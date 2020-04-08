import React from 'react';
import { withKnobs, select, number } from '@storybook/addon-knobs';
import { Logo } from '../../gamut/src';
import { selectableColors } from './helpers';

export default {
  component: Logo,
  title: 'Component/Logo',
  decorators: [withKnobs],
};

export const editable = () => (
  <Logo
    width={number('width', undefined)}
    height={number('height', Logo.defaultProps.height)}
    type={select(
      'type',
      [
        'pro',
        'proAlt',
        'proLockup',
        'proMono',
        'premium',
        'program',
        'default',
      ],
      Logo.defaultProps.type
    )}
    style={{ color: select('color', selectableColors, 'black') }}
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
