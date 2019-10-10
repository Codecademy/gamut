import { mount } from 'enzyme';
import React from 'react';
import Butterbar from '..';
import Button from '../../Button';
import CloseIcon from '../../Icon/icons/CloseIcon';
const createStubStorage = (storageKey = 'stub-key') => {
  const items = new Map();
  return {
    key: storageKey,
    local: {
      getItem(key) {
        return items.get(key);
      },
      setItem(key, value) {
        items.set(key, value);
      },
    },
  };
};
describe('Butterbar', () => {
  it('renders children when closing has not been requested', () => {
    const children = React.createElement('span', { className: 'test' });
    const component = mount(React.createElement(Butterbar, null, children));
    expect(component.find('span.test')).toHaveLength(1);
  });
  it('does not render a button when no storage is provided', () => {
    const component = mount(React.createElement(Butterbar, null));
    component.update();
    expect(component.find(Button)).toHaveLength(0);
  });
  it('renders a button when storage is provided', () => {
    const component = mount(
      React.createElement(Butterbar, { storage: createStubStorage() })
    );
    component.update();
    expect(component.find(Button)).toHaveLength(1);
  });
  it('does not render an icon when an no icon is provided', () => {
    const component = mount(React.createElement(Butterbar, null));
    component.update();
    expect(component.find("div[data-testid='icon-id']")).toHaveLength(0);
  });
  it('renders an icon when an icon is provided', () => {
    const component = mount(
      React.createElement(Butterbar, {
        icon: React.createElement(CloseIcon, null),
      })
    );
    component.update();
    expect(component.find(CloseIcon)).toHaveLength(1);
    expect(component.find("div[data-testid='icon-id']")).toHaveLength(1);
  });
  it('re-renders as null when the button is clicked', () => {
    const component = mount(
      React.createElement(Butterbar, { storage: createStubStorage() })
    );
    component.find(Button).simulate('click');
    component.update();
    expect(component.html()).toBe(null);
  });
  it('does not render the container when closing has previously been requested', () => {
    const sharedStorage = createStubStorage();
    const firstComponent = mount(
      React.createElement(Butterbar, { storage: sharedStorage })
    );
    firstComponent.find(Button).simulate('click');
    const secondComponent = mount(
      React.createElement(Butterbar, { storage: sharedStorage })
    );
    expect(secondComponent.html()).toBe(null);
  });
  it('renders the container when closing on a different keyed butterbar has previously been requested', () => {
    const firstComponent = mount(
      React.createElement(Butterbar, {
        storage: createStubStorage('first-key'),
      })
    );
    firstComponent.find(Button).simulate('click');
    const secondComponent = mount(
      React.createElement(Butterbar, {
        storage: createStubStorage('second-key'),
      })
    );
    expect(secondComponent.html()).not.toBe(null);
  });
});
//# sourceMappingURL=Butterbar-test.js.map
