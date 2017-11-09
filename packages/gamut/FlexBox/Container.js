import { isNumber, omit } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles';

const positions = [
  'start',
  'end',
  'center',
  'baseline',
  'stretch',
  'spaceAround',
  'spaceBetween'
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
  'alignSelf'
];

class Container extends React.Component {
  static displayName = 'Container';
  static propTypes = {
    flex: PropTypes.bool,
    inline: PropTypes.bool,
    grow: PropTypes.number,
    shrink: PropTypes.number,
    row: PropTypes.bool,
    column: PropTypes.bool,
    wrap: PropTypes.bool,
    nowrap: PropTypes.bool,
    center: PropTypes.bool,
    reverse: PropTypes.bool,
    fit: PropTypes.bool,
    align: PropTypes.oneOf(positions),
    justify: PropTypes.oneOf(positions),
    alignSelf: PropTypes.oneOf(positions),
    children: PropTypes.node,
    className: PropTypes.string
  };

  static defaultProps = {
    flex: true,
    inline: false
  };

  render() {
    let classes = cx({
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
      [this.props.className]: !!this.props.className
    });

    let propsToTransfer = omit(this.props, internalProps);

    return (
      <div {...propsToTransfer} className={classes}>
        {this.props.children}
      </div>
    );
  }
}

export default Container;
