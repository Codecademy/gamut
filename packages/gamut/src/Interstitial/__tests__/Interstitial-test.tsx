import { setupRtl } from '@codecademy/gamut-tests';
import React from 'react';

import { FillButton } from '../../Button';
import { Interstitial } from '..';

const renderView = setupRtl(Interstitial, {
  title: 'Hello, World!',
});

describe('Interstitial', () => {
  it('renders a decoration before the title when a decoration is provided', () => {
    const { props, view } = renderView({
      decoration: (
        <span role="img" aria-label="Heart eyes">
          😍
        </span>
      ),
    });

    expect(view.baseElement.textContent).toBe(`😍${props.title}`);
  });

  it('renders buttons after children when buttons are provided', () => {
    const button = 'Click me';
    const children = 'Hi!';

    const { props, view } = renderView({
      buttons: [<FillButton key="1">{button}</FillButton>],
      children,
    });

    expect(view.baseElement.textContent).toBe(
      `${props.title}${props.children}${button}`
    );
  });
});
