import cx from 'classnames';
import React from 'react';

// eslint-disable-next-line gamut/no-css-standalone
import styles from './styles.module.scss';

export type ErrorBlockProps = {
  className?: string;
};

export const ErrorBlock: React.FC<ErrorBlockProps> = ({
  children,
  className,
}) => {
  return <code className={cx(styles.errorBlock, className)}>{children}</code>;
};
