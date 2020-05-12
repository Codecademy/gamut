import {
  VisualTheme,
  ContentContainer,
  LayoutGrid,
  Column,
} from '@codecademy/gamut/src';
import { EditorialImage } from '@codecademy/gamut-labs/src';
import { text, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import {
  decoratedStory,
  StoryDescription,
  StoryStatus,
  StoryTemplate,
} from '../../Templating';

export default {
  title: 'Labs|Brand/Molecules/EditorialImage',
  component: EditorialImage,
  decorators: [withKnobs],
};

const knobs = {
  imageUrl: () =>
    text(
      'Image URL',
      'https://images.ctfassets.net/go6kr6r0ykrq/4NI4czS6Y3DeaBBlVAoPTL/5a95deb01518e0cbb27bac8c6e00eaf6/broadway_2_70.jpg'
    ),
  altText: () => text('Alt text', 'A picture of two Codecademy employees.'),
  caption: () => text('Optional caption', 'You can remove this caption.'),
};

export const editorialImage = decoratedStory('Editorial Image', () => (
  <StoryTemplate status={StoryStatus.Ready} theme={VisualTheme.DarkMode}>
    <StoryDescription>
      An image used for editorial pages with an optional caption.
    </StoryDescription>
    <ContentContainer>
      <LayoutGrid rowGap="lg" columnGap={{ xs: 'md', sm: 'lg' }}>
        <Column size={{ xs: 12, sm: 10 }} offset={{ sm: 1 }}>
          <EditorialImage
            image={knobs.imageUrl()}
            alt={knobs.altText()}
            caption={knobs.caption()}
          />
        </Column>
      </LayoutGrid>
    </ContentContainer>
  </StoryTemplate>
));
