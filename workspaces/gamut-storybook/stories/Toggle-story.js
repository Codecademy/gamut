import React from 'react';
import Toggle from '@codecademy/gamut/Toggle';
import { boolean } from '@storybook/addon-knobs';

export default {
  title: 'Component/Toggle',
};

export const toggle = () => (
  <Toggle checked={boolean('checked', false)} onChange={() => {}} />
);
