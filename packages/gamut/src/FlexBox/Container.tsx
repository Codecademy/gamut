import cx from 'classnames';
import { isNumber, omit } from 'lodash';
import React, { HTMLAttributes, ReactNode } from 'react';

import styles from './styles/index.module.scss';

const internalProps = [
  'flex',
  'inline',
  'grow',
  'shrink',
  'row',
  'column',
  'wrap',
  'nowrap',
  'center',
  'reverse',
  'fit',
  'align',
  'justify',
  'alignSelf',
];

type ContainerPosition =
  | 'start'
  | 'end'
  | 'center'
  | 'baseline'
  | 'stretch'
  | 'spaceAround'
  | 'spaceBetween';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Flex alignment for container content */
  align?: ContainerPosition;
  /** Custom flex alignment for the container relative to its parent */
  alignSelf?: ContainerPosition;
  /**
   * Justifies and aligns content to the center of the container
   * (cannot be used with: `justify` or `align`)
   * */
  center?: boolean;
  children?: ReactNode | ReactNode[];
  className?: string;
  /** Enables flex direction column */
  column?: boolean;
  /** Fits the container to the dimensions of its parent element */
  fit?: boolean;
  /** Enables flex behavior for the container */
  flex?: boolean;
  /** Custom flex grow specification relative to its parent */
  grow?: number;
  /** Enables inline-flex behavior for the container */
  inline?: boolean;
  /** Flex justification for container content */
  justify?: ContainerPosition;
  /** Disable flex wrapping for container content
   * (cannot be used with: `wrap`)
   * */
  nowrap?: boolean;
  /** Reverses flex direction from the default of either `row` or `column` containers.  */
  reverse?: boolean;
  /** Enables flex direction row */
  row?: boolean;
  /** Custom flex shrink specification for the container relative to its parent */
  shrink?: number;
  /** Enable flex wrapping for container content
   *  (cannot be used with: `nowrap`)
   * */
  wrap?: boolean;
}

export const Container: React.FC<ContainerProps> = (props) => {
  const classes = cx(props.className, {
    [styles.flex]: props.flex && !props.inline,
    [styles.inline]: props.flex && props.inline,
    [styles.fld]: isNumber(props.grow) || isNumber(props.shrink),
    [styles[`flg-${props.grow}`]]: isNumber(props.grow),
    [styles[`fls-${props.shrink}`]]: isNumber(props.shrink),
    [styles.row]: props.row,
    [styles.col]: props.column,
    [styles.wrap]: props.wrap,
    [styles.nowrap]: props.nowrap,
    [styles.rev]: props.reverse,
    [styles.fit]: props.fit,
    [styles['align-center']]: props.center && !props.align,
    [styles['justify-center']]: props.center && !props.justify,
    [styles[`align-${props.align}`]]: !!props.align,
    [styles[`justify-${props.justify}`]]: !!props.justify,
    [styles[`aself-${props.alignSelf}`]]: !!props.alignSelf,
  });

  const propsToTransfer = omit(props, internalProps);

  return (
    <div {...propsToTransfer} className={classes}>
      {props.children}
    </div>
  );
};

Container.displayName = 'Container';

Container.defaultProps = {
  flex: true,
  inline: false,
};
