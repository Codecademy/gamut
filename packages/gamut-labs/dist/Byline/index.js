import { Box, FlexBox } from '@codecademy/gamut';
import { LocationPinIcon } from '@codecademy/gamut-icons';
import React from 'react';
export var Byline = function Byline(_ref) {
  var firstName = _ref.firstName,
      occupation = _ref.occupation,
      location = _ref.location,
      company = _ref.company,
      lastName = _ref.lastName;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Box, {
    "data-testid": "author-container",
    fontSize: 18,
    fontWeight: "title",
    whiteSpace: "nowrap"
  }, /*#__PURE__*/React.createElement("span", null, firstName), lastName && /*#__PURE__*/React.createElement(Box, {
    as: "span",
    display: {
      _: 'none',
      xs: 'initial'
    }
  }, " ".concat(lastName))), /*#__PURE__*/React.createElement(Box, {
    "data-testid": "job-container",
    whiteSpace: "nowrap"
  }, /*#__PURE__*/React.createElement("span", null, occupation), company && /*#__PURE__*/React.createElement(Box, {
    as: "span",
    display: {
      _: 'none',
      xs: 'initial'
    }
  }, " @ ".concat(company))), location && /*#__PURE__*/React.createElement(FlexBox, {
    alignItems: "center"
  }, /*#__PURE__*/React.createElement(LocationPinIcon, {
    size: 12
  }), /*#__PURE__*/React.createElement(Box, {
    as: "span",
    ml: 12
  }, location)));
};