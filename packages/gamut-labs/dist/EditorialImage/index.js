import * as React from 'react';

// eslint-disable-next-line gamut/no-css-standalone
import styles from './styles.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var EditorialImage = function EditorialImage(_ref) {
  var image = _ref.image,
    alt = _ref.alt,
    caption = _ref.caption;
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsx("div", {
      className: styles.imageContainer,
      children: /*#__PURE__*/_jsx("img", {
        className: styles.image,
        alt: alt,
        src: image
      })
    }), caption && /*#__PURE__*/_jsx("span", {
      className: styles.caption,
      children: caption
    })]
  });
};