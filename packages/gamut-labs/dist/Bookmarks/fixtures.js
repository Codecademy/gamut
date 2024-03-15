import React from 'react';
export var mockBookmarkParts = {
  icon: jest.fn(function () {
    return /*#__PURE__*/React.createElement("div", null, "IMA BOOKMARKS BUTTON");
  }),
  buttonAriaLabel: 'Bookmarks - greatest thing since sliced bread',
  desktop: jest.fn(function () {
    return /*#__PURE__*/React.createElement("div", null, "DESKTOP BOOKMARKS CONTENT");
  }),
  mobile: jest.fn(function () {
    return /*#__PURE__*/React.createElement("div", null, "MOBILE BOOKMARKS CONTENT");
  }),
  onEnable: jest.fn()
};