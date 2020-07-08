import React from 'react';
import s from './styles.module.scss';
export var EditorialImage = function EditorialImage(_ref) {
  var image = _ref.image,
      alt = _ref.alt,
      caption = _ref.caption;
  return React.createElement("div", null, React.createElement("div", {
    className: s.imageContainer
  }, React.createElement("img", {
    className: s.image,
    alt: alt,
    src: image
  })), caption && React.createElement("span", {
    className: s.caption
  }, caption));
};
export default EditorialImage;