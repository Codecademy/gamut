import { Button } from '@codecademy/gamut';
import { mount } from 'enzyme';
import React from 'react';
import Interstitial from '..';
describe('Interstitial', function () {
  it('renders a decoration before the title when a decoration is provided', function () {
    var title = 'Hello, World!';
    var wrapped = mount(React.createElement(Interstitial, {
      decoration: React.createElement("span", {
        role: "img",
        "aria-label": "Heart eyes"
      }, "\uD83D\uDE0D"),
      title: title
    }));
    expect(wrapped.text()).toEqual("\uD83D\uDE0D".concat(title));
  });
  it('renders buttons after children when buttons are provided', function () {
    var button = 'Click me';
    var title = 'Hello, World!';
    var children = 'Hi!';
    var wrapped = mount(React.createElement(Interstitial, {
      buttons: [React.createElement(Button, {
        key: "1"
      }, button)],
      title: title
    }, children));
    expect(wrapped.text()).toEqual("".concat(title).concat(children).concat(button));
  });
});