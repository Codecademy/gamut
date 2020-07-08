import { Select } from '@codecademy/gamut';
import React from 'react';
export var GridFormSelectInput = function GridFormSelectInput(_ref) {
  var className = _ref.className,
      field = _ref.field,
      register = _ref.register,
      setValue = _ref.setValue;
  return React.createElement(Select, {
    defaultValue: field.defaultValue,
    className: className,
    htmlFor: field.name,
    name: field.name,
    onChange: function onChange(event) {
      return setValue(event.target.value);
    },
    ref: register(),
    options: field.options
  });
};
export default GridFormSelectInput;