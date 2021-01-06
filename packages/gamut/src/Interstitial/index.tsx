/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import cx from 'classnames';
import React, { useEffect, useRef } from 'react';

import styles from './styles.module.scss';

export type InterstitialProps = {
  buttons?: React.ReactNode[];
  className?: string;
  decoration?: React.ReactNode;
  /** If enabled, pull focus onto the header of the component upon render. Should be enabled if Interstitial is not the child of a component with focus managment, such as Modal. */
  focus?: boolean;
  title: string;
};

export const Interstitial: React.FC<InterstitialProps> = ({
  buttons,
  children,
  className,
  decoration,
  focus,
  title,
}) => {
  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    focus && headerRef.current?.focus();
  });

  return (
    <div className={cx(styles.Interstitial, className)}>
      <div className={styles.content}>
        <h1 className={styles.title} ref={headerRef} tabIndex={focus ? 0 : -1}>
          {decoration && <div className={styles.decoration}>{decoration}</div>}
          {title}
        </h1>
        <div className={styles.children}>{children}</div>
      </div>
      {buttons && <div className={styles.buttons}>{buttons}</div>}
    </div>
  );
};
