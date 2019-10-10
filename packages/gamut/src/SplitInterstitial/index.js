import cx from 'classnames';
import React from 'react';
import blueCurve from './assets/blueCurve.svg';
import purpleCurveBottomRight from './assets/purpleCurveBottomRight.svg';
import purpleCurveTopLeft from './assets/purpleCurveTopLeft.svg';
import styles from './styles.scss';
export const SplitInterstitial = ({
  className,
  left = {},
  right = {},
  topLeftImage = {},
  bottomRightImage = {},
}) => {
  return React.createElement(
    'div',
    { className: cx(styles.splitInterstitial, className) },
    React.createElement('div', { className: cx(styles.side) }, right.children),
    React.createElement(
      'div',
      { className: cx(styles.side, styles.left) },
      React.createElement('img', {
        alt: '',
        className: cx(styles.topLeftImage, topLeftImage.className),
        src: topLeftImage.src || purpleCurveTopLeft,
      }),
      bottomRightImage.src
        ? React.createElement('img', {
            alt: '',
            className: cx(styles.bottomRightImage, bottomRightImage.className),
            src: bottomRightImage.src,
          })
        : React.createElement(
            React.Fragment,
            null,
            React.createElement('img', {
              alt: '',
              className: cx(styles.bottomRightImage),
              src: blueCurve,
            }),
            React.createElement('img', {
              alt: '',
              className: cx(styles.bottomRightImage),
              src: purpleCurveBottomRight,
            })
          ),
      React.createElement('div', { className: styles.children }, left.children)
    )
  );
};
export default SplitInterstitial;
//# sourceMappingURL=index.js.map
