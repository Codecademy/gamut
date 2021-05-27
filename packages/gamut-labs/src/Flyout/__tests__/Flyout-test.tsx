import { StrokeButton } from '@codecademy/gamut';
import { setupRtl } from '@codecademy/gamut-tests';
import React from 'react';

import { Flyout } from '../Flyout';

const renderView = setupRtl(Flyout, {
  button: <StrokeButton>Test</StrokeButton>,
});

describe('Flyout', () => {
  it('', () => {
    const { view } = renderView();
  });
});
