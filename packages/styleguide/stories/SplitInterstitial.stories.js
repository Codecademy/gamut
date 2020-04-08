import React from 'react';
import { SplitInterstitial } from '../../gamut-templates/src/SplitInterstitial';
import Triangle from '../assets/Triangle.svg';
import Stairs from '../assets/Stairs.svg';
import styles from './SplitInterstitial-story.scss';

export default {
  component: SplitInterstitial,
  title: 'Templates/SplitInterstitial',
};

export const splitInterstitial = () => (
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
);

splitInterstitial.story = {
  name: 'SplitInterstitial',
};

export const splitInterstitialWithCustomImages = () => (
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
);

splitInterstitialWithCustomImages.story = {
  name: 'SplitInterstitial with Custom Images',
};
