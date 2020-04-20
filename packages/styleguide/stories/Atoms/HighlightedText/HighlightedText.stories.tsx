import { HighlightedText } from '@codecademy/gamut/src';
import { text } from '@storybook/addon-knobs';
import React from 'react';

import {
  decoratedStories,
  decoratedStory,
  StoryStatus,
  StoryTemplate,
  StoryDescription,
} from '../../Templating';
import styles from './styles.module.scss';

export default decoratedStories('Atoms', HighlightedText);

export const highlightedText = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      Emphasized (bold) text with a light background color behind it. Use to
      showcase important words in a sentence.
    </StoryDescription>
    <p className={styles.paragraph}>
      Would you like to have{' '}
      <HighlightedText>{text('text', 'superpowers')}</HighlightedText>?
    </p>
  </StoryTemplate>
));
