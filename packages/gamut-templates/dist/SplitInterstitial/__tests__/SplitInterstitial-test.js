import { mount, shallow } from 'enzyme';
import React from 'react';
import SplitInterstitial from '..';
describe('SplitInterstitial', function () {
  it('renders left and right children in that order', function () {
    var left = React.createElement("span", null, "one");
    var right = React.createElement("span", null, "two");
    var wrapped = mount(React.createElement(SplitInterstitial, {
      left: {
        children: left
      },
      right: {
        children: right
      }
    }));
    expect(wrapped.text()).toEqual('twoone');
  });
  it('renders the topLeftImage when passed in', function () {
    var left = React.createElement("span", null, "one");
    var right = React.createElement("span", null, "two");
    var svg = 'someSvg';
    var wrapped = shallow(React.createElement(SplitInterstitial, {
      left: {
        children: left
      },
      right: {
        children: right
      },
      topLeftImage: {
        src: svg
      }
    }));
    var elem = wrapped.find('img');
    expect(elem.length).toEqual(3);
    expect(elem.at(0).prop('src')).toEqual(svg);
  });
  it('renders the bottomRightImage when passed in', function () {
    var left = React.createElement("span", null, "one");
    var right = React.createElement("span", null, "two");
    var svg = 'someSvg';
    var wrapped = shallow(React.createElement(SplitInterstitial, {
      left: {
        children: left
      },
      right: {
        children: right
      },
      bottomRightImage: {
        src: svg
      }
    }));
    var elem = wrapped.find('img');
    expect(elem.length).toEqual(2);
    expect(elem.at(1).prop('src')).toEqual(svg);
  });
});