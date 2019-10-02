import React from 'react';
import { storiesOf } from '@storybook/react';
import Toggle from '@codecademy/gamut/dist/Toggle';
import { boolean } from '@storybook/addon-knobs';

storiesOf('Component/Toggle', module).add('Toggle', () => (
  <Toggle checked={boolean('checked', false)} onChange={() => {}} />
));
