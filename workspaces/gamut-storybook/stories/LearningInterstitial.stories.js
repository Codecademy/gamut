import React from 'react';
import { LearningInterstitial, Button } from 'gamut';
import Triangle from '../assets/Triangle.svg';
import Stairs from '../assets/Stairs.svg';

export default {
  component: 'LearningInterstitial',
  title: 'Component/LearningInterstitial',
};

export const learningInterstitial = () => (
  <LearningInterstitial
    buttons={[
      <Button key="1" theme="yellow">
        One Button
      </Button>,
      <Button key="1" theme="white" outline>
        Two Button
      </Button>,
    ]}
    title="What a Glorious Day"
  >
    Place some happy text as the content of this interstitial for the learner to
    feel good about themselves. Note that the max-width for this content is
    large but not <em>too</em> large. We want some amount of vertical centering!
  </LearningInterstitial>
);

learningInterstitial.story = {
  name: 'LearningInterstitial',
};

export const learningInterstitialWithDecoration = () => (
  <LearningInterstitial
    buttons={[
      <Button key="1" theme="brand-red">
        Red Button
      </Button>,
      <Button key="2" theme="royalblue">
        Blue Button
      </Button>,
    ]}
    decoration="😍"
    title="Decorations, Too!"
  >
    Decorations are added on top of the <code>h1</code> as part of it.
  </LearningInterstitial>
);

learningInterstitialWithDecoration.story = {
  name: 'LearningInterstitial With Decoration',
};
