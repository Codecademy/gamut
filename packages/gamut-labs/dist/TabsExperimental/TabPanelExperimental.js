import { Box } from '@codecademy/gamut';
import * as React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
export var TabPanelExperimental = function TabPanelExperimental() {
  return null;
};
export var DerivedTabPanel = function DerivedTabPanel(_ref) {
  var children = _ref.children,
    className = _ref.className,
    isActiveTab = _ref.isActiveTab;
  return /*#__PURE__*/_jsx(Box, {
    role: "tabpanel",
    hidden: !isActiveTab,
    className: className,
    children: children
  });
};