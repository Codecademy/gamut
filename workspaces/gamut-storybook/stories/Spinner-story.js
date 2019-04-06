import React from 'react';
import { storiesOf } from '@storybook/react';
import { Spinner } from '@codecademy/gamut';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs';
import { addonInfoOptions } from './options';

storiesOf('Component/Spinner', module)
  .addDecorator(withKnobs)
  .add('Spinner', () => <Spinner size={text('size', '10rem')} />);
