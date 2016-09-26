import _ from 'lodash';
import React, { PureComponent } from 'react';
import cx from 'classnames';
import s from './styles';

/**
 * Reference:
 * http://codecademy.com/styleguide/buttons
 */

// themes can be an alias to a color
// or a unique button type
export const presetThemes = {
  primary: 'red',
  secondary: 'mint',
  platform: 'greyblue',
  lantern: 'darkmint'
};

export class Button extends PureComponent {
  static displayName = 'Button';
  static propTypes = {
    theme: React.PropTypes.string.isRequired,
    size: React.PropTypes.oneOf(['large', 'small']),
    disabled: React.PropTypes.bool,
    focused: React.PropTypes.bool,
    active: React.PropTypes.bool,
    outline: React.PropTypes.bool,
    underline: React.PropTypes.bool,
    link: React.PropTypes.bool,
    caps: React.PropTypes.bool,
    go: React.PropTypes.bool,
    children: React.PropTypes.node,
    block: React.PropTypes.bool,
    className: React.PropTypes.string,
    href: React.PropTypes.string
  };

  static defaultProps = {
    theme: 'primary'
  };

  render() {
    let { theme } = this.props;

    if (theme && presetThemes[theme]) {
      theme = presetThemes[this.props.theme];
    }

    const classes = cx({
      [s.btn]: true,
      [s.link]: this.props.link,
      [s[`btn-${theme}`]]: Boolean(theme),
      [s.active]: this.props.active,
      [s.focus]: this.props.focused,
      [s.block]: this.props.block,
      [s.go]: this.props.go,
      [s.disabled]: this.props.disabled,
      [s.outline]: this.props.outline,
      [s.underline]: this.props.underline,
      [s.caps]: this.props.caps,
      [s[this.props.size]]: Boolean(this.props.size)
    }, this.props.className);

    const propsToTransfer = _.omit(this.props, 'theme', 'color', 'type', 'go');

    if (this.props.href) {
      return (
        <a data-btn {...propsToTransfer} className={classes}>
          {this.props.children}
        </a>
      );
    }

    return (
      <button data-btn {...propsToTransfer} className={classes}>
        {this.props.children}
      </button>
    );
  }
}

export default Button;
