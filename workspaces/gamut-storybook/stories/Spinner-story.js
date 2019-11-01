import React from 'react';
import { storiesOf } from '@storybook/react';
import { Spinner } from 'gamut';
import { withKnobs, text } from '@storybook/addon-knobs';

storiesOf('Component/Spinner', module)
  .addDecorator(withKnobs)
  .add('Spinner', () => <Spinner size={text('size', '10rem')} />);
