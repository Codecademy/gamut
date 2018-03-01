import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ButtonBase from '../ButtonBase';
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
  outline: PropTypes.bool,
  underline: PropTypes.bool,
  link: PropTypes.bool,
  caps: PropTypes.bool,
  go: PropTypes.bool,
  children: PropTypes.node,
  block: PropTypes.bool,
  className: PropTypes.string,
  curved: PropTypes.bool,
  flat: PropTypes.bool,
  color: PropTypes.string,
};

const Button = props => {
  let { theme = 'primary' } = props;

  if (theme && presetThemes[theme] && !props.color) {
    theme = presetThemes[theme];
  } else {
    theme = props.theme;
  }

  const typeClassName = props.link ? s.link : s.btn;
  const themeClassName = props.link ? s[`link-${theme}`] : s[`btn-${theme}`];
  const colorClassName = props.link
    ? s[`link-${props.color}`]
    : s[`btn-${props.color}`];

  const classes = cx(
    typeClassName,
    themeClassName,
    colorClassName,
    s[props.size],
    {
      [s.block]: props.block,
      [s.go]: props.go,
      [s.outline]: props.outline,
      [s.underline]: props.underline,
      [s.caps]: props.caps,
      [s.curved]: props.curved,
      [s.flat]: props.flat,
    },
    props.className
  );

  const propsToTransfer = omitProps(propTypes, props);

  return (
    <ButtonBase {...propsToTransfer} className={classes} link={props.link}>
      {props.children}
    </ButtonBase>
  );
};

Button.propTypes = propTypes;

export default Button;
