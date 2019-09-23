import React from 'react';
import { storiesOf } from '@storybook/react';
import { SplitInterstitial } from '@codecademy/gamut';
import Triangle from '../assets/Triangle.svg';
import Stairs from '../assets/Stairs.svg';
import styles from './SplitInterstitial-story.scss';

storiesOf('Component/SplitInterstitial', module)
  .add('SplitInterstitial', () => (
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
  ))
  .add('SplitInterstitial with Custom Images', () => (
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
  ));
