import React from 'react';
import styles from './styles.module.scss';

type BrandMonospaceProps = {
  /** Element to render as (span is the default) */
  as?: 'span' | 'tspan';
};

export const BrandMonospace: React.FC<BrandMonospaceProps> = ({
  as: Element = 'span',
  children,
}) => <Element className={styles.font}>{children}</Element>;
