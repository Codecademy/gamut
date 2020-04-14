function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { mount } from 'enzyme';
import React from 'react';
import { stubSelectField, stubTextField } from '../../__tests__/stubs';
import GridFormInputGroup from '..';

var renderComponent = function renderComponent(overrides) {
  var props = _objectSpread({
    field: stubSelectField,
    register: jest.fn(),
    setValue: jest.fn()
  }, overrides);

  var wrapped = mount(React.createElement(GridFormInputGroup, props));
  return {
    props: props,
    wrapped: wrapped
  };
};

describe('GridFormInputGroup', function () {
  it('renders error text when an error exists', function () {
    var error = 'Oh no!';

    var _renderComponent = renderComponent({
      error: error
    }),
        wrapped = _renderComponent.wrapped;

    expect(wrapped.text()).toContain(error);
  });
  it('renders a select when the field type is select', function () {
    var _renderComponent2 = renderComponent({
      field: stubSelectField
    }),
        wrapped = _renderComponent2.wrapped;

    expect(wrapped.find('select')).toHaveLength(1);
  });
  it('renders a text input when the field type is text', function () {
    var _renderComponent3 = renderComponent({
      field: stubTextField
    }),
        wrapped = _renderComponent3.wrapped;

    expect(wrapped.find('input[type="text"]')).toHaveLength(1);
  });
});