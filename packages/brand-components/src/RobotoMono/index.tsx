import React from 'react';
import s from './styles.module.scss';

type RobotoMonoProps = {
  /** Element to render as (span is the default) */
  as?: 'span' | 'tspan';
};

export const RobotoMono: React.FC<RobotoMonoProps> = ({
  as: Element = 'span',
  children,
}) => <Element className={s.font}>{children}</Element>;

export default RobotoMono;
