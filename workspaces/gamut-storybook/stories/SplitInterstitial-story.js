import React from 'react';
import { storiesOf } from '@storybook/react';
import { SplitInterstitial } from '@codecademy/gamut';

storiesOf('Component/SplitInterstitial', module).add(
  'SplitInterstitial',
  () => (
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
  )
);
