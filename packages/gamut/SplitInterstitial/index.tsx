import cx from 'classnames';
import React, { ReactNode } from 'react';

import blueCurve from './assets/blueCurve.svg';
import purpleCurveBottomRight from './assets/purpleCurveBottomRight.svg';
import purpleCurveTopLeft from './assets/purpleCurveTopLeft.svg';
import styles from './styles.scss';

type SplitInterstitialSide = {
  children?: ReactNode;
  className?: string;
};

export type SplitInterstitialProps = {
  className?: string;
  left?: SplitInterstitialSide;
  right?: SplitInterstitialSide;
};

export const SplitInterstitial: React.FC<SplitInterstitialProps> = ({
  className,
  left = {},
  right = {},
}) => {
  return (
    <div className={cx(styles.splitInterstitial, className)}>
      <div className={cx(styles.side)}>{right.children}</div>
      <div className={cx(styles.side, styles.left)}>
        <img
          alt=""
          className={cx(styles.sideImage, styles.purpleCurveTopLeft)}
          src={purpleCurveTopLeft}
        />
        <img
          alt=""
          className={cx(styles.sideImage, styles.blueCurve)}
          src={blueCurve}
        />
        <img
          alt=""
          className={cx(styles.sideImage, styles.purpleCurveBottomRight)}
          src={purpleCurveBottomRight}
        />
        <div className={styles.children}>{left.children}</div>
      </div>
    </div>
  );
};

export default SplitInterstitial;
