import React from 'react';
import { Byline } from '../../brand-components/src/Byline/';
import { withKnobs, text } from '@storybook/addon-knobs';
import styles from './Byline-story.scss';

export default {
  component: Byline,
  title: 'Brand/Byline',
  decorators: [withKnobs],
};

export const byline = () => (
  <Byline
    name={text('Name', 'Bill Murray')}
    occupation={text('Occupation', 'Ghostbuster @ Ghostcademy')}
    location={text('Location', 'New York, NY', '')}
  />
);

byline.story = {
  name: 'Byline used in Brand components',
};

export const bylineWithCustomClassNames = () => (
  <Byline
    name={text('Name', 'Rihanna')}
    occupation={text('Occupation', 'CEO of Umbrella Corporation')}
    classNames={{
      bylineContainer: styles.bylineContainer,
      name: styles.name,
      occupation: styles.occupation,
    }}
  />
);

bylineWithCustomClassNames.story = {
  name: 'Byline with className',
};
