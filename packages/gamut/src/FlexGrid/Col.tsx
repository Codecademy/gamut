import React from 'react';
import { omitProps } from '../utils/omitProps';
import style from './styles/index.module.scss';

const propKeys = [
  'xs',
  'sm',
  'md',
  'lg',
  'xsOffset',
  'smOffset',
  'mdOffset',
  'lgOffset',
  'reverse',
  'className',
  'as',
  'children',
];

const classMap = {
  xs: 'col-xs',
  sm: 'col-sm',
  md: 'col-md',
  lg: 'col-lg',
  xsOffset: 'col-xs-offset',
  smOffset: 'col-sm-offset',
  mdOffset: 'col-md-offset',
  lgOffset: 'col-lg-offset',
};

function getClassNames(props: ColProps) {
  const extraClasses = [style.col];

  if (props.className) {
    extraClasses.push(props.className);
  }

  if (props.reverse) {
    extraClasses.push(style.reverse);
  }

  return (Object.keys(props) as (keyof typeof classMap & keyof typeof props)[])
    .filter((key) => classMap[key])
    .map(
      (key: keyof typeof classMap) =>
        style[
          Number.isInteger(props[key] as number)
            ? `${classMap[key]}-${props[key]}`
            : classMap[key]
        ]
    )
    .concat(extraClasses)
    .join(' ');
}

export type ColSizing = {
  /** Size of the column on screen sizes greater than `xs` */
  xs?: boolean | number;
  /** Size of the column on screen sizes greater than `sm` */
  sm?: boolean | number;
  /** Size of the column on screen sizes greater than `md` */
  md?: boolean | number;
  /** Size of the column on screen sizes greater than `lg` */
  lg?: boolean | number;
  /** Offset of the column on screen sizes greater than `xs` */
  xsOffset?: number;
  /** Offset of the column on screen sizes greater than `sm` */
  smOffset?: number;
  /** Offset of the column on screen sizes greater than `md` */
  mdOffset?: number;
  /** Offset of the column on screen sizes greater than `lg` */
  lgOffset?: number;
};

export type ColProps = ColSizing & {
  as?: string;
  className?: string;
  /** Reverses the column's flex-direction */
  reverse?: boolean;
};

export const Col: React.FC<ColProps> = (props) => {
  const className = getClassNames(props);

  return React.createElement(
    props.as || 'div',
    omitProps(propKeys, { ...props, className })
  );
};
