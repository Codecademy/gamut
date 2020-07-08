import React from 'react';
import { mount } from 'enzyme';
import Modal from '..';
describe('Modal', function () {
  it('renders children when isOpen is true', function () {
    var children = 'Hey';
    var wrapper = mount(React.createElement(Modal, {
      isOpen: true
    }, children));
    expect(wrapper.text()).toContain(children);
  });
  it('does not render when isOpen is false', function () {
    var wrapper = mount(React.createElement(Modal, {
      isOpen: false
    }, "Hey"));
    expect(wrapper.isEmptyRender()).toBe(true);
  });
  it('does not render its close button if hideDefaultCloseButton is true', function () {
    var wrapper = mount(React.createElement(Modal, {
      isOpen: true,
      hideDefaultCloseButton: true
    }, "I got my own close button", React.createElement("button", {
      type: "button"
    })));
    expect(wrapper.find("[data-testid=\"modal-default-close-button\"]")).toHaveLength(0);
  });
  it('renders its close button if hideDefaultCloseButton is false', function () {
    var wrapper = mount(React.createElement(Modal, {
      isOpen: true
    }, "I use the default close button"));
    expect(wrapper.find("[data-testid=\"modal-default-close-button\"]")).toHaveLength(1);
  });
});