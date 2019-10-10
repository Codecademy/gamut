import { isNumber, omit } from 'lodash';
import React from 'react';
import cx from 'classnames';
import s from './styles/index.scss';
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
class Container extends React.Component {
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
    return React.createElement(
      'div',
      Object.assign({}, propsToTransfer, { className: classes }),
      this.props.children
    );
  }
}
Container.displayName = 'Container';
Container.defaultProps = {
  flex: true,
  inline: false,
};
export default Container;
//# sourceMappingURL=Container.js.map
