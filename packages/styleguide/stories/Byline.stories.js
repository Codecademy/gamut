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
    firstName={text('First Name', 'Bill')}
    lastName={text('Last Name', 'Murray')}
    occupation={text('Occupation', 'Ghostbuster @ Ghostcademy')}
    location={text('Location', 'New York, NY', '')}
  />
);

byline.story = {
  name: 'Byline used in Brand components',
};

export const bylineWithCustomClassNames = () => (
  <Byline
    firstName={text('First Name', 'Murray')}
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
