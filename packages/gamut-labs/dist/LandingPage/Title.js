function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { Text } from '@codecademy/gamut';
import React from 'react';
var titleProps = {
  heading: {
    as: 'h1',
    fontSize: {
      _: 34,
      sm: 44,
      lg: 64
    }
  },
  subheading: {
    as: 'h2',
    fontSize: {
      _: 26,
      lg: 34
    }
  }
};
export var Title = function Title(_ref) {
  var isPageHeading = _ref.isPageHeading,
      children = _ref.children;
  return /*#__PURE__*/React.createElement(Text, _extends({
    maxWidth: "58rem"
  }, titleProps[isPageHeading ? 'heading' : 'subheading']), children);
};