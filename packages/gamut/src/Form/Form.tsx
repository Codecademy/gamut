import { system } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import cx from 'classnames';
import React, { FormHTMLAttributes } from 'react';

import styles from './styles/Form.module.scss';

const formSystemProps = variance.compose(
  system.space,
  system.border,
  system.layout,
  system.color,
  system.shadow,
  system.positioning,
  system.background,
  system.typography,
  system.flex,
  system.grid
);

export type FormProps = FormHTMLAttributes<HTMLFormElement> &
  StyleProps<typeof formSystemProps> & {
    className?: string;
  };

const StyledForm = styled('form')<FormProps>(formSystemProps);

export const Form: React.FC<FormProps> = ({ method = 'post', ...props }) => {
  const className = cx(styles.Form, props.className);

  return <StyledForm {...props} method={method} className={className} />;
};
