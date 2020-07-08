import { Checkbox } from '@codecademy/gamut';
import React from 'react';
export var GridFormCheckboxInput = function GridFormCheckboxInput(_ref) {
  var className = _ref.className,
      field = _ref.field,
      setValue = _ref.setValue;
  return React.createElement(Checkbox, {
    className: className,
    defaultChecked: field.defaultValue,
    htmlFor: field.name,
    label: field.description,
    onChange: function onChange(event) {
      return setValue(event.target.checked);
    }
  });
};
export default GridFormCheckboxInput;