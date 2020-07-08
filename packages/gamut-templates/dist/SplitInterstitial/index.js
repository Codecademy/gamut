import cx from 'classnames';
import React from 'react';
import blueCurve from './assets/blueCurve.svg';
import purpleCurveBottomRight from './assets/purpleCurveBottomRight.svg';
import purpleCurveTopLeft from './assets/purpleCurveTopLeft.svg';
import styles from './styles.module.scss';
export var SplitInterstitial = function SplitInterstitial(_ref) {
  var className = _ref.className,
      _ref$left = _ref.left,
      left = _ref$left === void 0 ? {} : _ref$left,
      _ref$right = _ref.right,
      right = _ref$right === void 0 ? {} : _ref$right,
      _ref$topLeftImage = _ref.topLeftImage,
      topLeftImage = _ref$topLeftImage === void 0 ? {} : _ref$topLeftImage,
      _ref$bottomRightImage = _ref.bottomRightImage,
      bottomRightImage = _ref$bottomRightImage === void 0 ? {} : _ref$bottomRightImage;
  return React.createElement("div", {
    className: cx(styles.splitInterstitial, className)
  }, React.createElement("div", {
    className: cx(styles.side)
  }, right.children), React.createElement("div", {
    className: cx(styles.side, styles.left)
  }, React.createElement("img", {
    alt: "",
    className: cx(styles.topLeftImage, topLeftImage.className),
    src: topLeftImage.src || purpleCurveTopLeft
  }), bottomRightImage.src ? React.createElement("img", {
    alt: "",
    className: cx(styles.bottomRightImage, bottomRightImage.className),
    src: bottomRightImage.src
  }) : React.createElement(React.Fragment, null, React.createElement("img", {
    alt: "",
    className: cx(styles.bottomRightImage),
    src: blueCurve
  }), React.createElement("img", {
    alt: "",
    className: cx(styles.bottomRightImage),
    src: purpleCurveBottomRight
  })), React.createElement("div", {
    className: styles.children
  }, left.children)));
};
export default SplitInterstitial;