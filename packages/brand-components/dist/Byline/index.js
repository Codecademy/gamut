import React from 'react';
import s from './styles.module.scss';
import cx from 'classnames';
import networkPin from './assets/networkPin.svg';
export var Byline = function Byline(_ref) {
  var firstName = _ref.firstName,
      occupation = _ref.occupation,
      location = _ref.location,
      _ref$classNames = _ref.classNames,
      classNames = _ref$classNames === void 0 ? {} : _ref$classNames,
      company = _ref.company,
      lastName = _ref.lastName;
  return React.createElement("div", {
    className: cx(s.bylineContainer, classNames.bylineContainer)
  }, React.createElement("span", {
    "data-testid": "author-container",
    className: cx(s.author, classNames.author)
  }, React.createElement("span", {
    "aria-label": "First Name"
  }, firstName), lastName && React.createElement("span", {
    "aria-label": "Last Name",
    className: s.lastName
  }, " ".concat(lastName))), React.createElement("div", {
    "data-testid": "job-container",
    className: classNames.jobContainer
  }, React.createElement("span", {
    "aria-label": "Occupation"
  }, occupation), company && React.createElement("span", {
    "aria-label": "Company",
    className: s.company
  }, " @ ".concat(company))), location && React.createElement("div", {
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