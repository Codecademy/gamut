import { mount } from 'enzyme';
import React from 'react';

import { Button } from '../../Button';
import { Interstitial } from '..';

describe('Interstitial', () => {
  it('renders a decoration before the title when a decoration is provided', () => {
    const title = 'Hello, World!';

    const wrapped = mount(
      <Interstitial
        decoration={
          <span role="img" aria-label="Heart eyes">
            😍
          </span>
        }
        title={title}
      />
    );

    expect(wrapped.text()).toEqual(`😍${title}`);
  });

  it('renders buttons after children when buttons are provided', () => {
    const button = 'Click me';
    const title = 'Hello, World!';
    const children = 'Hi!';

    const wrapped = mount(
      <Interstitial buttons={[<Button key="1">{button}</Button>]} title={title}>
        {children}
      </Interstitial>
    );

    expect(wrapped.text()).toEqual(`${title}${children}${button}`);
  });
});
