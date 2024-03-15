import React from 'react'; // eslint-disable-next-line gamut/no-css-standalone

import styles from './styles.module.scss';
export var EditorialImage = function EditorialImage(_ref) {
  var image = _ref.image,
      alt = _ref.alt,
      caption = _ref.caption;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: styles.imageContainer
  }, /*#__PURE__*/React.createElement("img", {
    className: styles.image,
    alt: alt,
    src: image
  })), caption && /*#__PURE__*/React.createElement("span", {
    className: styles.caption
  }, caption));
};