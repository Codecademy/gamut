import React from 'react';
import { Interstitial, Button } from 'gamut';
import Triangle from '../assets/Triangle.svg';
import Stairs from '../assets/Stairs.svg';

export default {
  component: 'Interstitial',
  title: 'Templates/Interstitial',
};

export const Interstitial = () => (
  <Interstitial
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
  </Interstitial>
);

Interstitial.story = {
  name: 'Interstitial',
};

export const InterstitialWithDecoration = () => (
  <Interstitial
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
  </Interstitial>
);

InterstitialWithDecoration.story = {
  name: 'Interstitial With Decoration',
};
