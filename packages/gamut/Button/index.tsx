import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ButtonBase from '../ButtonBase';
import omitProps from '../utils/omitProps';
import s from './styles/index.scss';

// themes can be an alias to a color
// or a unique button type
export const presetThemes: { [i: string]: string } = {
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
  round: PropTypes.bool,
  square: PropTypes.bool,
  flat: PropTypes.bool,
  fitText: PropTypes.bool,
  onClick: PropTypes.func,
};

export type ButtonProps = {
  block?: boolean;
  caps?: boolean;
  children: ReactNode | ReactNode[];
  className?: string;
  fitText?: boolean;
  flat?: boolean;
  go?: boolean;
  href?: string;
  link?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  outline?: boolean;
  round?: boolean;
  size?: 'small' | 'large';
  square?: boolean;
  theme?: string;
  underline?: boolean;
};

const Button = (props: ButtonProps) => {
  let { theme = 'primary' } = props;

  if (theme && presetThemes[theme]) {
    theme = presetThemes[theme];
  }

  const typeClassName = props.link ? s.link : s.btn;
  const themeClassName = props.link ? s[`link-${theme}`] : s[`btn-${theme}`];

  const classes = cx(
    typeClassName,
    themeClassName,
    s[props.size],
    {
      [s.block]: props.block,
      [s.go]: props.go,
      [s.outline]: props.outline,
      [s.underline]: props.underline,
      [s.caps]: props.caps,
      [s.round]: props.round,
      [s.square]: props.square,
      [s.flat]: props.flat,
      [s['fit-text']]: props.fitText,
    },
    props.className
  );

  const propsToTransfer = omitProps(propTypes, props);

  return (
    <ButtonBase
      {...propsToTransfer}
      className={classes}
      link={props.link}
      onClick={props.onClick}
    >
      {props.children}
    </ButtonBase>
  );
};

Button.propTypes = propTypes;

export default Button;
