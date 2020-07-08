import { Button, Column } from '@codecademy/gamut';
import React from 'react';
export var GridFormSubmit = function GridFormSubmit(_ref) {
  var contents = _ref.contents,
      size = _ref.size;
  return React.createElement(Column, {
    size: size
  }, React.createElement(Button, {
    theme: "brand-purple",
    type: "submit"
  }, contents));
};
export default GridFormSubmit;