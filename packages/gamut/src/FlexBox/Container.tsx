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
  align?: ContainerPosition;
  alignSelf?: ContainerPosition;
  center?: boolean;
  children?: ReactNode | ReactNode[];
  className?: string;
  column?: boolean;
  fit?: boolean;
  flex?: boolean;
  grow?: number;
  inline?: boolean;
  justify?: ContainerPosition;
  nowrap?: boolean;
  reverse?: boolean;
  row?: boolean;
  shrink?: number;
  wrap?: boolean;
}

export class Container extends React.Component<ContainerProps> {
  static displayName = 'Container';

  static defaultProps = {
    flex: true,
    inline: false,
  };

  render() {
    const classes = cx(this.props.className, {
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
