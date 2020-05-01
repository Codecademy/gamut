import { Button, Interstitial } from '@codecademy/gamut/src';
import React from 'react';

import {
  decoratedStory,
  StoryTemplate,
  StoryStatus,
  StoryDescription,
} from '../Templating';
import { withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'Gamut|Molecules/Interstitial',
  component: Interstitial,
  decorators: [withKnobs],
};

export const interstitial = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      Large content area used as a break between focused content, such as within
      a full-screen <code>Overlay</code> in the LE between lessons.
    </StoryDescription>
    <Interstitial
      buttons={[
        <Button key="1" theme="brand-yellow">
          One Button
        </Button>,
        <Button key="1" theme="white" outline>
          Two Button
        </Button>,
      ]}
      title="What a Glorious Day"
    >
      Place some happy text as the content of this interstitial for the learner
      to feel good about themselves. Note that the max-width for this content is
      large but not <em>too</em> large. We want some amount of vertical
      centering!
    </Interstitial>
  </StoryTemplate>
));

export const interstitialWithDecoration = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      Decorations are added on top of the heading and are narrated as part of
      it. Put emojis or promotional images here to really emphasize them.
    </StoryDescription>
    <Interstitial
      buttons={[
        <Button key="1" theme="brand-red">
          Red Button
        </Button>,
        <Button key="2" theme="brand-blue">
          Blue Button
        </Button>,
      ]}
      decoration="😍"
      title="Decorations, too!"
    >
      I really love emojis. Please confirm you love emojis too!
    </Interstitial>
  </StoryTemplate>
));
