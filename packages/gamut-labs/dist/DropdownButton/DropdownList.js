import { Menu, MenuItem } from '@codecademy/gamut';
import React from 'react';
export var DropdownList = function DropdownList(_ref) {
  var dropdownItems = _ref.dropdownItems,
      onClose = _ref.onClose;
  return /*#__PURE__*/React.createElement(Menu, {
    variant: "action",
    border: "none",
    minWidth: "max-content",
    py: 12
  }, dropdownItems.map(function (item) {
    var id = item.id,
        text = item.text,
        href = item.href,
        clickHandler = item.clickHandler,
        icon = item.icon;

    var onClick = function onClick(event) {
      clickHandler === null || clickHandler === void 0 ? void 0 : clickHandler(event);
      onClose === null || onClose === void 0 ? void 0 : onClose();
    };

    return /*#__PURE__*/React.createElement(MenuItem, {
      key: id,
      "data-testid": "dropdown-item-".concat(id),
      onClick: onClick,
      href: href,
      icon: icon
    }, text);
  }));
};