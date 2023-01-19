import cx from 'classnames';
import * as React from 'react';

import { GenericMarkdownProps } from '../types';
// eslint-disable-next-line gamut/no-css-standalone
import styles from './styles.module.scss';

export const PseudoBlock: React.FC<GenericMarkdownProps> = ({
  children,
  className,
}) => {
  return <code className={cx(styles.pseudoBlock, className)}>{children}</code>;
};
