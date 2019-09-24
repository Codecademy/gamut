import React from 'react';
import { Spinner } from '@codecademy/gamut';
import { withKnobs, text } from '@storybook/addon-knobs';

export default {
  title: 'Component/Spinner',
  decorators: [withKnobs],
};

export const spinner = () => <Spinner size={text('size', '10rem')} />;

spinner.story = {
  name: 'Spinner',
};
