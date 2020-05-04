import React from 'react';

const testId = (id) => `[data-testid="${id}"]`;

export const createEnzymeHelpers = ({
  Component,
  render,
  baseProps = {},
} = {}) => {
  let wrapper;

  const helpers = {
    setup(props = {}) {
      wrapper = render(<Component {...baseProps} {...props} />);

      // sanity checks
      expect(wrapper).toExist();
      expect(wrapper.isEmptyRender()).toBeFalsy();

      return { wrapper };
    },

    debug() {
      // eslint-disable-next-line no-console
      console.log(wrapper.debug());
    },

    // actions
    click(selector) {
      wrapper.find(selector).simulate('click');
    },

    clickTestId(id) {
      helpers.click(testId(id));
    },

    // expectations
    expectCount(selector, n = 1) {
      expect(wrapper.find(selector).length).toBe(n);
    },

    expectTestId(id) {
      expect(wrapper.find(testId(id))).toExist();
    },

    expectTestIdCount(selector, n = 1) {
      helpers.expectCount(testId(selector), n);
    },

    expectAllTestIds(ids) {
      ids.forEach((id) => helpers.expectTestIdCount(id, 1));
    },
  };

  return helpers;
};

export const mockStore = (data) => ({
  getState: () => data,
  dispatch: jest.fn(),
  subscribe: jest.fn(),
});
