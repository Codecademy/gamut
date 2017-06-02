import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import omitProps from '../utils/omitProps';
import s from './styles';

// themes can be an alias to a color
// or a unique button type
export const presetThemes = {
  primary: 'red',
  secondary: 'mint',
  platform: 'greyblue',
  lantern: 'darkmint'
};

const propTypes = {
  theme: PropTypes.string,
  size: PropTypes.oneOf(['large', 'small']),
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
  href: PropTypes.string
};

const Button = (props) => {
  let { theme = 'primary' } = props;

  if (theme && presetThemes[theme]) {
    theme = presetThemes[theme];
  }

  let typeClassName = props.link ? s.link : s.btn;
  let themeClassName = props.link ? s[`link-${theme}`] : s[`btn-${theme}`];

  const classes = cx(
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
      [s.caps]: props.caps
    },
    props.className
  );

  const propsToTransfer = omitProps(propTypes, props);

  if (props.href) {
    return (
      <a data-btn {...propsToTransfer} href={props.href} className={classes}>
        {props.children}
      </a>
    );
  }

  return (
    <button data-btn {...propsToTransfer} disabled={props.disabled} className={classes}>
      {props.children}
    </button>
  );
};

Button.propTypes = propTypes;

export default Button;
