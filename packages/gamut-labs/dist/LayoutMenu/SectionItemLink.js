import { Anchor } from '@codecademy/gamut';
import * as React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
export var SectionItemLink = function SectionItemLink(_ref) {
  var onClick = _ref.onClick,
    href = _ref.href,
    children = _ref.children;
  return /*#__PURE__*/_jsx(Anchor, {
    variant: "interface",
    display: "block",
    href: href,
    onClick: onClick,
    children: children
  });
};