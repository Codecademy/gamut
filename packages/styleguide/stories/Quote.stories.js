import React from 'react';
import { Quote } from '../../brand-components/src/Quote/';
import { VisualTheme } from '../../gamut/src';
import styles from './Quote-story.scss';

export default {
  component: Quote,
  title: 'Brand/Quote',
};

export const lightQuote = () => (
  <Quote
    text="Codecademy’s small lessons really help a person who has trouble focusing on long lessons."
    theme={VisualTheme.LightMode}
  />
);

lightQuote.story = {
  name: 'Quote with light theme',
};

export const darkQuote = () => (
  <div className={styles.darkExampleContainer}>
    <Quote
      text="Codecademy’s small lessons really help a person who has trouble focusing on long lessons."
      theme={VisualTheme.DarkMode}
    />
  </div>
);

darkQuote.story = {
  name: 'Quote with dark theme wrapped in container',
};
