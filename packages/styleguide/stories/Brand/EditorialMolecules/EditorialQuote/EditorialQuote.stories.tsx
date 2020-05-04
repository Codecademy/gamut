import {
  VisualTheme,
  ContentContainer,
  LayoutGrid,
  Column,
} from '@codecademy/gamut/src';
import { EditorialQuote } from '@codecademy/brand-components/src';
import { text } from '@storybook/addon-knobs';
import React from 'react';

import styles from './styles.module.scss';

import {
  decoratedStories,
  decoratedStory,
  StoryDescription,
  StoryStatus,
  StoryTemplate,
} from '../../../Templating';

export default decoratedStories('Brand', 'Editorial Molecules', EditorialQuote);

export const editorialQuote = decoratedStory('Editorial Quote', () => (
  <StoryTemplate status={StoryStatus.Ready} theme={VisualTheme.DarkMode} wide>
    <StoryDescription>
      A pull quote for use in an editorial page.
    </StoryDescription>
    <ContentContainer>
      <LayoutGrid rowGap="lg" columnGap={{ xs: 'md', sm: 'lg' }}>
        <Column size={{ xs: 12, sm: 8 }} offset={{ sm: 2 }}>
          <div className={styles.quoteContainer}>
            <EditorialQuote
              quote={text(
                'Quote',
                'In an interstellar burst, I am back to save the universe.'
              )}
            />
          </div>
        </Column>
      </LayoutGrid>
    </ContentContainer>
  </StoryTemplate>
));
