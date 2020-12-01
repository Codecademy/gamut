import cx from 'classnames';
import React from 'react';

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
