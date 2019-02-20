import { isNumber, omit } from 'lodash';
import React, { ReactNode, HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles/index.scss';

const positions = [
  'start',
  'end',
  'center',
  'baseline',
  'stretch',
  'spaceAround',
  'spaceBetween',
];

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

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  align?: string;
  alignSelf?: string;
  center?: boolean;
  children?: ReactNode | ReactNode[];
  className?: string;
  column?: boolean;
  fit?: boolean;
  flex?: boolean;
  grow?: number;
  inline?: boolean;
  justify?: string;
  nowrap?: boolean;
  reverse?: boolean;
  row?: boolean;
  shrink?: number;
  wrap?: boolean;
}

class Container extends React.Component<ContainerProps> {
  static displayName = 'Container';
  static propTypes = {
    align: PropTypes.oneOf(positions),
    alignSelf: PropTypes.oneOf(positions),
    center: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    column: PropTypes.bool,
    fit: PropTypes.bool,
    flex: PropTypes.bool,
    grow: PropTypes.number,
    inline: PropTypes.bool,
    justify: PropTypes.oneOf(positions),
    nowrap: PropTypes.bool,
    reverse: PropTypes.bool,
    row: PropTypes.bool,
    shrink: PropTypes.number,
    wrap: PropTypes.bool,
  };

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
