import {
  VisualTheme,
  ContentContainer,
  LayoutGrid,
  Column,
} from '@codecademy/gamut/src';
import { EditorialCTA } from '@codecademy/brand-components/src';
import { text } from '@storybook/addon-knobs';
import React from 'react';

import {
  decoratedStories,
  decoratedStory,
  StoryDescription,
  StoryStatus,
  StoryTemplate,
} from '../../Templating';

export default decoratedStories('Brand', 'Editorial Molecules', EditorialCTA);

export const editorialQuote = decoratedStory('Editorial CTA', () => (
  <StoryTemplate status={StoryStatus.Ready} theme={VisualTheme.DarkMode}>
    <StoryDescription>
      A CTA section typically used for the bottom of an editorial page.
    </StoryDescription>
    <ContentContainer>
      <LayoutGrid rowGap="lg" columnGap={{ xs: 'md', sm: 'lg' }}>
        <Column size={{ xs: 12, sm: 6 }} offset={{ sm: 3 }}>
          <EditorialCTA
            heading={text('Heading', 'Do this thing!')}
            description={text('Description', 'Something about that thing')}
            callToAction={text('CTA Text', 'Click the button')}
            href=""
            onCTAClick={() => null}
          />
        </Column>
      </LayoutGrid>
    </ContentContainer>
  </StoryTemplate>
));
