import React from 'react';
import s from './styles.module.scss';
import cx from 'classnames';
import networkPin from './assets/networkPin.svg';
export var Byline = function Byline(_ref) {
  var name = _ref.name,
      occupation = _ref.occupation,
      location = _ref.location,
      _ref$classNames = _ref.classNames,
      classNames = _ref$classNames === void 0 ? {} : _ref$classNames;
  return React.createElement("div", {
    className: cx(s.bylineContainer, classNames.bylineContainer)
  }, React.createElement("span", {
    "aria-label": "Name",
    className: cx(s.name, classNames.name)
  }, name), React.createElement("span", {
    "aria-label": "Occupation",
    className: classNames.occupation
  }, occupation), location && React.createElement("div", {
    className: s.locationContainer
  }, React.createElement("img", {
    alt: "Location pin icon",
    className: s.networkPin,
    src: networkPin
  }), React.createElement("span", {
    className: classNames.location
  }, location)));
};
export default Byline;