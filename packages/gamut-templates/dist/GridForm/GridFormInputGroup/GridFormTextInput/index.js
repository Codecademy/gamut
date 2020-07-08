import { Input } from '@codecademy/gamut';
import React from 'react';
export var GridFormTextInput = function GridFormTextInput(_ref) {
  var className = _ref.className,
      field = _ref.field,
      register = _ref.register,
      setValue = _ref.setValue;

  var onChange = function onChange(event) {
    setValue(event.target.value);
  };

  return React.createElement(Input, {
    className: className,
    htmlFor: field.name,
    name: field.name,
    onChange: onChange,
    ref: register(field.validation),
    type: field.type
  });
};
export default GridFormTextInput;