import cx from 'classnames';
import React, { ReactNode } from 'react';

import blueCurve from './assets/blueCurve.svg';
import purpleCurveBottomRight from './assets/purpleCurveBottomRight.svg';
import purpleCurveTopLeft from './assets/purpleCurveTopLeft.svg';
import styles from './styles.module.scss';

type SplitInterstitialSide = {
  children?: ReactNode;
  className?: string;
};

export type SplitInterstitialProps = {
  className?: string;
  left?: SplitInterstitialSide;
  right?: SplitInterstitialSide;
  topLeftImage?: {
    src?: string;
    className?: string;
  };
  bottomRightImage?: {
    src?: string;
    className?: string;
  };
};

export const SplitInterstitial: React.FC<SplitInterstitialProps> = ({
  className,
  left = {},
  right = {},
  topLeftImage = {},
  bottomRightImage = {},
}) => {
  return (
    <div className={cx(styles.splitInterstitial, className)}>
      <div className={cx(styles.side)}>{right.children}</div>
      <div className={cx(styles.side, styles.left)}>
        <img
          alt=""
          className={cx(styles.topLeftImage, topLeftImage.className)}
          src={topLeftImage.src || purpleCurveTopLeft}
        />
        {bottomRightImage.src ? (
          <img
            alt=""
            className={cx(styles.bottomRightImage, bottomRightImage.className)}
            src={bottomRightImage.src}
          />
        ) : (
          <>
            <img
              alt=""
              className={cx(styles.bottomRightImage)}
              src={blueCurve}
            />
            <img
              alt=""
              className={cx(styles.bottomRightImage)}
              src={purpleCurveBottomRight}
            />
          </>
        )}
        <div className={styles.children}>{left.children}</div>
      </div>
    </div>
  );
};

export default SplitInterstitial;
