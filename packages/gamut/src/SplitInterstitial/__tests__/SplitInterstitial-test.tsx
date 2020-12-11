import { mount, shallow } from 'enzyme';
import React from 'react';

import { SplitInterstitial } from '..';

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

    expect(wrapped.text()).toEqual('twoone');
  });

  it('renders the topLeftImage when passed in', () => {
    const left = <span>one</span>;
    const right = <span>two</span>;
    const svg = 'someSvg';
    const wrapped = shallow(
      <SplitInterstitial
        left={{ children: left }}
        right={{ children: right }}
        topLeftImage={{
          src: svg,
        }}
      />
    );
    const elem = wrapped.find('img');

    expect(elem.length).toEqual(3);
    expect(elem.at(0).prop('src')).toEqual(svg);
  });

  it('renders the bottomRightImage when passed in', () => {
    const left = <span>one</span>;
    const right = <span>two</span>;
    const svg = 'someSvg';
    const wrapped = shallow(
      <SplitInterstitial
        left={{ children: left }}
        right={{ children: right }}
        bottomRightImage={{
          src: svg,
        }}
      />
    );
    const elem = wrapped.find('img');

    expect(elem.length).toEqual(2);
    expect(elem.at(1).prop('src')).toEqual(svg);
  });
});
