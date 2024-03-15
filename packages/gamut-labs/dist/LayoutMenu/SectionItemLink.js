import { Anchor } from '@codecademy/gamut';
import React from 'react';
export var SectionItemLink = function SectionItemLink(_ref) {
  var onClick = _ref.onClick,
      href = _ref.href,
      children = _ref.children;
  return /*#__PURE__*/React.createElement(Anchor, {
    variant: "interface",
    display: "block",
    href: href,
    onClick: onClick
  }, children);
};