import React, { PureComponent, ReactNode } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles/index.scss';

/**
 * Icon Component
 *
 * Uses the Ikona icon-font which is stored in ./styles/ikona
 *
 * props:
 *
 * name: The name of the icon in the ikona font,
 *       you can reference the names in
 *       this file: ./styles/ikona/classes.scss
 *
 * size: the icons are based on a 16px grid, so if you want the icon
 *       to stay sharp, it's font-size has to be a multiple of 16px.
 *       So, if you pass in a size prop of 2, the icon will be 32x32
 *       If you need a different sized icon, just pass in a style
 *       with your custom font size.
 *
 * usage:
 *
 * <Icon name="fullscreen" />
 *
 * <Icon name="fullscreen" size={2}/>
 */

const ICON_SIZE = 16;

export interface IkonaIconProps {
  children?: ReactNode | ReactNode[];
  className?: string;
  name?: string;
  size?: number;
  style: {};
}

class IkonaIcon extends PureComponent<IkonaIconProps> {
  static propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.number,
    className: PropTypes.string,
    children: PropTypes.node,
    style: PropTypes.object,
  };

  render() {
    const icon: string =
      `ikona-${this.props.name}` in s
        ? s[`ikona-${this.props.name}`]
        : `cc-symbol cc-symbol-icon-${this.props.name}`;

    const classes = cx(s.i, icon, this.props.className);

    let styles = this.props.style;

    if (this.props.size) {
      styles = {
        fontSize: this.props.size * ICON_SIZE,
        ...this.props.style,
      };
    }

    return (
      <em {...this.props} className={classes} style={styles}>
        {this.props.children}
      </em>
    );
  }
}

export default IkonaIcon;
