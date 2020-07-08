function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Form, LayoutGrid } from '@codecademy/gamut';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import GridFormInputGroup from './GridFormInputGroup';
import GridFormSubmit from './GridFormSubmit';
export function GridForm(_ref) {
  var children = _ref.children,
      className = _ref.className,
      fields = _ref.fields,
      submit = _ref.submit,
      onSubmit = _ref.onSubmit;

  var _useForm = useForm({
    defaultValues: fields.reduce(function (defaultValues, field) {
      return _objectSpread({}, defaultValues, _defineProperty({}, field.name, field.defaultValue));
    }, {})
  }),
      errors = _useForm.errors,
      handleSubmit = _useForm.handleSubmit,
      register = _useForm.register,
      _setValue = _useForm.setValue;

  useEffect(function () {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = fields[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var field = _step.value;
        register({
          name: field.name
        });
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }, [fields, register]);
  return React.createElement(Form, {
    className: className,
    onSubmit: handleSubmit(onSubmit)
  }, React.createElement(LayoutGrid, {
    columnGap: "lg",
    rowGap: "md"
  }, fields.map(function (field) {
    var _ref2;

    var errorMessage = (_ref2 = errors[field.name]) === null || _ref2 === void 0 ? void 0 : _ref2.message;
    return React.createElement(GridFormInputGroup, {
      error: errorMessage,
      field: field,
      key: field.name,
      register: register,
      setValue: function setValue(value) {
        return _setValue(field.name, value);
      }
    });
  }), React.createElement(GridFormSubmit, submit), children));
}
export default GridForm;