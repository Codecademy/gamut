import React from 'react';
import s from './styles.module.scss';
export var BrandMonospace = function BrandMonospace(_ref) {
  var _ref$as = _ref.as,
      Element = _ref$as === void 0 ? 'span' : _ref$as,
      children = _ref.children;
  return React.createElement(Element, {
    className: s.font
  }, children);
};
export default BrandMonospace;