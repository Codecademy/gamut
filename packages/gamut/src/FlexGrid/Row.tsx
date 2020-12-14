import cx from 'classnames';
import React from 'react';

import { omitProps } from '../utils/omitProps';
import style from './styles/index.module.scss';

const propKeys = [
  'reverse',
  'start',
  'center',
  'end',
  'top',
  'middle',
  'bottom',
  'around',
  'between',
  'first',
  'last',
  'className',
  'as',
  'children',
];

function getClassNames(props: RowProps) {
  const modificators = [style.row];

  for (const key of modificatorKeys) {
    const value = props[key as keyof typeof props];
    if (value) {
      modificators.push(style[`${key}-${value}`]);
    }
  }

  if (props.reverse) {
    modificators.push(style.reverse);
  }

  return cx(props.className, modificators);
}

const modificatorKeys = [
  'start',
  'center',
  'end',
  'top',
  'middle',
  'bottom',
  'around',
  'between',
  'first',
  'last',
];

type ModificatorType = 'xs' | 'sm' | 'md' | 'lg';

export type RowProps = {
  /** Justify columns with `space-around` on screen sizes greater than modifer */
  around?: ModificatorType;
  /** Justify columns with `space-between` on screen sizes greater than modifer */
  between?: ModificatorType;
  /** Align columns to `flex-end` on screen sizes greater than modifer */
  bottom?: ModificatorType;
  /** Justify columns to `center` on screen sizes greater than modifer */
  center?: ModificatorType;
  className?: string;
  /** Justify columns to `flex-end` on screen sizes greater than modifer */
  end?: ModificatorType;
  /** Set the row to be the first item in the FlexGrid on screen sizes greater than modifer*/
  first?: ModificatorType;
  /** Set the row to be the last item in the FlexGrid on screen sizes greater than modifer */
  last?: ModificatorType;
  /** Align columns to `center` on screen sizes greater than modifer */
  middle?: ModificatorType;
  /** Reverses the flex direction of the columns */
  reverse?: boolean;
  /** Justify columns to `flex-start` on screen sizes greater than modifer */
  start?: ModificatorType;
  /**
   * Component type to wrap children with.
   */
  as?: React.ElementType;
  /** Align columns to `flex-start` on screen sizes greater than modifer */
  top?: ModificatorType;
};

export const Row: React.FC<RowProps> = ({ as: Element = 'div', ...props }) => {
  const className = getClassNames(props);
  return <Element {...omitProps(propKeys, { ...props, className })} />;
};
