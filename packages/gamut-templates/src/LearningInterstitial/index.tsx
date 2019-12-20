import cx from 'classnames';
import React from 'react';

import styles from './styles.module.scss';

export type LearningInterstitialProps = {
  buttons?: React.ReactNode[];
  className?: string;
  decoration?: React.ReactNode;
  title: string;
};

export const LearningInterstitial: React.FC<LearningInterstitialProps> = ({
  buttons,
  children,
  className,
  decoration,
  title,
}) => {
  return (
    <div className={cx(styles.learningInterstitial, className)}>
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

export default LearningInterstitial;
