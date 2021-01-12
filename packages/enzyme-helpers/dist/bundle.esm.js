import React from 'react';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var testId = function testId(id) {
  return "[data-testid=\"".concat(id, "\"]");
};

var createEnzymeHelpers = function createEnzymeHelpers() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      Component = _ref.Component,
      render = _ref.render,
      _ref$baseProps = _ref.baseProps,
      baseProps = _ref$baseProps === void 0 ? {} : _ref$baseProps;

  var wrapper;
  var helpers = {
    setup: function setup() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      wrapper = render(React.createElement(Component, _extends({}, baseProps, props))); // sanity checks

      expect(wrapper).toExist();
      expect(wrapper.isEmptyRender()).toBeFalsy();
      return {
        wrapper: wrapper
      };
    },
    debug: function debug() {
      // eslint-disable-next-line no-console
      console.log(wrapper.debug());
    },
    // actions
    click: function click(selector) {
      wrapper.find(selector).simulate('click');
    },
    clickTestId: function clickTestId(id) {
      helpers.click(testId(id));
    },
    // expectations
    expectCount: function expectCount(selector) {
      var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      expect(wrapper.find(selector).length).toBe(n);
    },
    expectTestId: function expectTestId(id) {
      expect(wrapper.find(testId(id))).toExist();
    },
    expectTestIdCount: function expectTestIdCount(selector) {
      var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      helpers.expectCount(testId(selector), n);
    },
    expectAllTestIds: function expectAllTestIds(ids) {
      ids.forEach(function (id) {
        return helpers.expectTestIdCount(id, 1);
      });
    }
  };
  return helpers;
};
var mockStore = function mockStore(data) {
  return {
    getState: function getState() {
      return data;
    },
    dispatch: jest.fn(),
    subscribe: jest.fn()
  };
};

export { createEnzymeHelpers, mockStore };
//# sourceMappingURL=bundle.esm.js.map
