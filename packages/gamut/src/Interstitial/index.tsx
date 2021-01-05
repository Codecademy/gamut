import cx from 'classnames';
import React, { useEffect, useRef } from 'react';

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
  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headerRef.current?.focus();
  });

  return (
    <div className={cx(styles.Interstitial, className)}>
      <div className={styles.content}>
        <h1 className={styles.title} ref={headerRef} tabIndex={0}>
          {decoration && <div className={styles.decoration}>{decoration}</div>}
          {title}
        </h1>
        <div className={styles.children}>{children}</div>
      </div>
      {buttons && <div className={styles.buttons}>{buttons}</div>}
    </div>
  );
};
