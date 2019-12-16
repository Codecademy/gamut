import { mount } from 'enzyme';
import React from 'react';

import LearningInterstitial from '..';
import Button from '../../Button';

describe('LearningInterstitial', () => {
  it('renders a decoration before the title when a decoration is provided', () => {
    const title = 'Hello, World!';

    const wrapped = mount(
      <LearningInterstitial
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
      <LearningInterstitial
        buttons={[<Button key="1">{button}</Button>]}
        title={title}
      >
        {children}
      </LearningInterstitial>
    );

    expect(wrapped.text()).toEqual(`${title}${children}${button}`);
  });
});
