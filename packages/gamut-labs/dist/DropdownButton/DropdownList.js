import { Menu, MenuItem } from '@codecademy/gamut';
import * as React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
export var DropdownList = function DropdownList(_ref) {
  var dropdownItems = _ref.dropdownItems,
    onClose = _ref.onClose;
  return /*#__PURE__*/_jsx(Menu, {
    variant: "action",
    border: "none",
    minWidth: "max-content",
    py: 12,
    children: dropdownItems.map(function (item) {
      var id = item.id,
        text = item.text,
        href = item.href,
        clickHandler = item.clickHandler,
        icon = item.icon,
        target = item.target;
      var onClick = function onClick(event) {
        clickHandler === null || clickHandler === void 0 ? void 0 : clickHandler(event);
        onClose === null || onClose === void 0 ? void 0 : onClose();
      };
      return /*#__PURE__*/_jsx(MenuItem, {
        "data-testid": "dropdown-item-".concat(id),
        onClick: onClick,
        href: href,
        icon: icon,
        tabIndex: 0,
        target: target,
        children: text
      }, id);
    })
  });
};