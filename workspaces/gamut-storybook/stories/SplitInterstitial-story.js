import React from 'react';
import { storiesOf } from '@storybook/react';
import { SplitInterstitial } from '@codecademy/gamut';

storiesOf('Component/SplitInterstitial', module).add(
  'SplitInterstitial',
  () => (
    <SplitInterstitial
      left={{
        children: (
          <>
            <h1>Important content on the left</h1>
            <p>Some sort of information here, perhaps?</p>
          </>
        ),
      }}
      right={{
        children: (
          <>
            <h2>Alternate content on the right</h2>
            <p>Some more information here, maybe?</p>
          </>
        ),
      }}
    />
  )
);
