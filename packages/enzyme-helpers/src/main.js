import React from 'react';

export class EnzymeHelpers {
  static testId = id => `[data-testid="${id}"]`;

  constructor(Component, opts = {}, props = {}) {
    this.Component = Component;
    this.opts = opts;
    this.baseProps = props;
  }

  setup = (props = {}) => {
    const {
      Component,
      opts: { render },
    } = this;
    const wrapper = render(<Component {...this.baseProps} {...props} />);
    this.wrapper = wrapper;

    // sanity checks
    expect(wrapper).toExist();
    expect(wrapper.isEmptyRender()).toBeFalsy();

    return { wrapper };
  };

  // eslint-disable-next-line no-console
  debug = () => console.log(this.wrapper.debug());

  // actions
  click = selector => this.wrapper.find(selector).simulate('click');

  clickTestId = testId => this.click(EnzymeHelpers.testId(testId));

  // expectations
  expectCount = (selector, n = 1) =>
    expect(this.wrapper.find(selector).length).toBe(n);

  expectTestId = id =>
    expect(this.wrapper.find(EnzymeHelpers.testId(id))).toExist();

  expectTestIdCount = (selector, n = 1) =>
    this.expectCount(EnzymeHelpers.testId(selector), n);

  expectAllTestIds = ids => ids.forEach(id => this.expectTestIdCount(id, 1));
}

export const mockStore = data => ({
  getState: () => data,
  dispatch: jest.fn(),
  subscribe: jest.fn(),
});
