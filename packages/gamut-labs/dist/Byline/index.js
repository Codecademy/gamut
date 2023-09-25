import { Box, FlexBox } from '@codecademy/gamut';
import { LocationPinIcon } from '@codecademy/gamut-icons';
import * as React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var Byline = function Byline(_ref) {
  var firstName = _ref.firstName,
    occupation = _ref.occupation,
    location = _ref.location,
    company = _ref.company,
    lastName = _ref.lastName;
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsxs(Box, {
      "data-testid": "author-container",
      fontSize: 18,
      fontWeight: "title",
      whiteSpace: "nowrap",
      children: [/*#__PURE__*/_jsx("span", {
        children: firstName
      }), lastName && /*#__PURE__*/_jsx(Box, {
        as: "span",
        display: {
          _: 'none',
          xs: 'initial'
        },
        children: " ".concat(lastName)
      })]
    }), /*#__PURE__*/_jsxs(Box, {
      "data-testid": "job-container",
      whiteSpace: "nowrap",
      children: [/*#__PURE__*/_jsx("span", {
        children: occupation
      }), company && /*#__PURE__*/_jsx(Box, {
        as: "span",
        display: {
          _: 'none',
          xs: 'initial'
        },
        children: " @ ".concat(company)
      })]
    }), location && /*#__PURE__*/_jsxs(FlexBox, {
      alignItems: "center",
      children: [/*#__PURE__*/_jsx(LocationPinIcon, {
        size: 12
      }), /*#__PURE__*/_jsx(Box, {
        as: "span",
        ml: 12,
        children: location
      })]
    })]
  });
};