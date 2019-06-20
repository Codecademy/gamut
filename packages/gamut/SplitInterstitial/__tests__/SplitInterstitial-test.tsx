import { mount } from 'enzyme';
import React from 'react';
import SplitInterstitial from '..';

describe('SplitInterstitial', () => {
  it('renders left and right children in that order', () => {
    const left = <span>one</span>;
    const right = <span>two</span>;

    const wrapped = mount(
      <SplitInterstitial
        left={{ children: left }}
        right={{ children: right }}
      />
    );

    expect(wrapped.text()).toEqual('onetwo');
  });
});
