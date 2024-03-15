import { Box } from '@codecademy/gamut';
import React from 'react';
export var TabPanelExperimental = function TabPanelExperimental() {
  return null;
};
export var DerivedTabPanel = function DerivedTabPanel(_ref) {
  var children = _ref.children,
      className = _ref.className,
      isActiveTab = _ref.isActiveTab;
  return /*#__PURE__*/React.createElement(Box, {
    role: "tabpanel",
    hidden: !isActiveTab,
    className: className
  }, children);
};