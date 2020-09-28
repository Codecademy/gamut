import React from 'react';
import cx from 'classnames';

import styles from './styles.module.scss';

export type PseudoBlockProps = {
  className?: string;
};

export const PseudoBlock: React.FC<PseudoBlockProps> = ({
  children,
  className,
}) => {
  return <code className={cx(styles.pseudoBlock, className)}>{children}</code>;
};
