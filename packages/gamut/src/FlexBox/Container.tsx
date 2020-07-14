import { isNumber, omit } from 'lodash';
import React, { ReactNode, HTMLAttributes } from 'react';
import cx from 'classnames';
import s from './styles/index.module.scss';

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

export class Container extends React.Component<ContainerProps> {
  static displayName = 'Container';

  static defaultProps = {
    flex: true,
    inline: false,
  };

  render() {
    const classes = cx({
      [s.flex]: this.props.flex && !this.props.inline,
      [s.inline]: this.props.flex && this.props.inline,
      [s.fld]: isNumber(this.props.grow) || isNumber(this.props.shrink),
      [s[`flg-${this.props.grow}`]]: isNumber(this.props.grow),
      [s[`fls-${this.props.shrink}`]]: isNumber(this.props.shrink),
      [s.row]: this.props.row,
      [s.col]: this.props.column,
      [s.wrap]: this.props.wrap,
      [s.nowrap]: this.props.nowrap,
      [s.rev]: this.props.reverse,
      [s.fit]: this.props.fit,
      [s['align-center']]: this.props.center && !this.props.align,
      [s['justify-center']]: this.props.center && !this.props.justify,
      [s[`align-${this.props.align}`]]: !!this.props.align,
      [s[`justify-${this.props.justify}`]]: !!this.props.justify,
      [s[`aself-${this.props.alignSelf}`]]: !!this.props.alignSelf,
      [this.props.className]: !!this.props.className,
    });

    const propsToTransfer = omit(this.props, internalProps);

    return (
      <div {...propsToTransfer} className={classes}>
        {this.props.children}
      </div>
    );
  }
}

export default Container;
