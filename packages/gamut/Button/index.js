import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Spinner from '../Spinner';
import omitProps from '../utils/omitProps';
import s from './styles';

// themes can be an alias to a color
// or a unique button type
export const presetThemes = {
  primary: 'red',
  secondary: 'mint',
  platform: 'greyblue',
  lantern: 'darkmint',
};

const propTypes = {
  theme: PropTypes.string,
  size: PropTypes.oneOf(['large', 'small']),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  focused: PropTypes.bool,
  active: PropTypes.bool,
  outline: PropTypes.bool,
  underline: PropTypes.bool,
  link: PropTypes.bool,
  caps: PropTypes.bool,
  go: PropTypes.bool,
  children: PropTypes.node,
  block: PropTypes.bool,
  className: PropTypes.string,
  href: PropTypes.string,
};

const Button = props => {
  let { theme = 'primary' } = props;

  if (theme && presetThemes[theme]) {
    theme = presetThemes[theme];
  }

  const typeClassName = props.link ? s.link : s.btn;
  const themeClassName = props.link ? s[`link-${theme}`] : s[`btn-${theme}`];

  const buttonClasses = cx(
    typeClassName,
    themeClassName,
    s[props.size],
    {
      [s.active]: props.active,
      [s.focus]: props.focused,
      [s.block]: props.block,
      [s.go]: props.go,
      [s.disabled]: props.disabled,
      [s.outline]: props.outline,
      [s.underline]: props.underline,
      [s.caps]: props.caps,
    },
    props.className
  );

  const childrenClasses = cx(s.children, {
    [s.loadingText]: props.loading,
  });

  const spinnerClasses = cx(s.loadingSpinner, {
    [s.hidden]: !props.loading,
  });

  const spinnerSize = props.size === 'large' ? '32' : '24';

  const propsToTransfer = omitProps(propTypes, props);

  const Tag = props.href ? 'a' : 'button';

  return (
    <Tag
      data-btn
      {...propsToTransfer}
      href={props.href}
      disabled={props.disabled || props.loading}
      className={buttonClasses}
    >
      {props.loading && (
        <Spinner className={spinnerClasses} size={spinnerSize} />
      )}
      <span className={childrenClasses}>{props.children}</span>
    </Tag>
  );
};

Button.propTypes = propTypes;

export default Button;
