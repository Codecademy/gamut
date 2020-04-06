import cx from 'classnames';
import React from 'react';

import styles from './styles.module.scss';

export type InterstitialProps = {
  buttons?: React.ReactNode[];
  className?: string;
  decoration?: React.ReactNode;
  title: string;
};

export const Interstitial: React.FC<InterstitialProps> = ({
  buttons,
  children,
  className,
  decoration,
  title,
}) => {
  return (
    <div className={cx(styles.Interstitial, className)}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          {decoration && <div className={styles.decoration}>{decoration}</div>}
          {title}
        </h1>
        <div className={styles.children}>{children}</div>
      </div>
      {buttons && <div className={styles.buttons}>{buttons}</div>}
    </div>
  );
};

export default Interstitial;
