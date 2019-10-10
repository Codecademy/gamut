import { mount, shallow } from 'enzyme';
import React from 'react';
import SplitInterstitial from '..';
describe('SplitInterstitial', () => {
  it('renders left and right children in that order', () => {
    const left = React.createElement('span', null, 'one');
    const right = React.createElement('span', null, 'two');
    const wrapped = mount(
      React.createElement(SplitInterstitial, {
        left: { children: left },
        right: { children: right },
      })
    );
    expect(wrapped.text()).toEqual('twoone');
  });
  it('renders the topLeftImage when passed in', () => {
    const left = React.createElement('span', null, 'one');
    const right = React.createElement('span', null, 'two');
    const svg = 'someSvg';
    const wrapped = shallow(
      React.createElement(SplitInterstitial, {
        left: { children: left },
        right: { children: right },
        topLeftImage: {
          src: svg,
        },
      })
    );
    const elem = wrapped.find('img');
    expect(elem.length).toEqual(3);
    expect(elem.at(0).prop('src')).toEqual(svg);
  });
  it('renders the bottomRightImage when passed in', () => {
    const left = React.createElement('span', null, 'one');
    const right = React.createElement('span', null, 'two');
    const svg = 'someSvg';
    const wrapped = shallow(
      React.createElement(SplitInterstitial, {
        left: { children: left },
        right: { children: right },
        bottomRightImage: {
          src: svg,
        },
      })
    );
    const elem = wrapped.find('img');
    expect(elem.length).toEqual(2);
    expect(elem.at(1).prop('src')).toEqual(svg);
  });
});
//# sourceMappingURL=SplitInterstitial-test.js.map
