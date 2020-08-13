import React from 'react';
import s from './styles.module.scss';

type BrandMonospaceProps = {
  /** Element to render as (span is the default) */
  as?: 'span' | 'tspan';
};

export const BrandMonospace: React.FC<BrandMonospaceProps> = ({
  as: Element = 'span',
  children,
}) => <Element className={s.font}>{children}</Element>;
