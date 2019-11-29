import React from 'react';
import omitProps from '../utils/omitProps';
import style from './styles/index.scss';

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
  'tagName',
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
    .filter(key => classMap[key])
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

export type ColProps = {
  xs?: boolean | number;
  sm?: boolean | number;
  md: boolean | number;
  lg: boolean | number;
  xsOffset?: number;
  smOffset?: number;
  mdOffset?: number;
  lgOffset?: number;
  tagName?: string;
  className?: string;
  reverse?: boolean;
};

export const Col = (props: ColProps) => {
  const className = getClassNames(props);

  return React.createElement(
    props.tagName || 'div',
    omitProps(propKeys, { ...props, className })
  );
};

export default Col;
