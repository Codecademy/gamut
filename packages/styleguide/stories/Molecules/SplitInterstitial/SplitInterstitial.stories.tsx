import { SplitInterstitial } from '@codecademy/gamut/src';
import React from 'react';

import {
  decoratedStories,
  decoratedStory,
  StoryDescription,
  StoryStatus,
  StoryTemplate,
} from '../../Templating';
import Triangle from './assets/Triangle.svg';
import Stairs from './assets/Stairs.svg';
import styles from './styles.module.scss';

export default decoratedStories('Molecules', SplitInterstitial);

export const splitInterstitial = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      Large, 50% split content area used for information that has two facets,
      such as for a payment page with an advertisement on one side and payment
      form on another.
    </StoryDescription>
    <SplitInterstitial
      left={{
        children: (
          <div>
            <h1>Important stuff!</h1>
            <p>Some sort of information here, perhaps?</p>
          </div>
        ),
      }}
      right={{
        children: (
          <div>
            <h2>Less important...</h2>
            <p>Some more information here, maybe?</p>
          </div>
        ),
      }}
    />
  </StoryTemplate>
));

export const splitInterstitialWithCustomImages = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      You can override the built-in images with your own on a per-design basis.
    </StoryDescription>
    <SplitInterstitial
      left={{
        children: (
          <div>
            <h1>Important stuff!</h1>
            <p>Some sort of information here, perhaps?</p>
          </div>
        ),
      }}
      right={{
        children: (
          <div>
            <h2>Less important...</h2>
            <p>Some more information here, maybe?</p>
          </div>
        ),
      }}
      topLeftImage={{
        src: Triangle,
      }}
      bottomRightImage={{
        src: Stairs,
        className: styles.bottomRightImgStyles,
      }}
    />
  </StoryTemplate>
));
