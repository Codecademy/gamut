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
  system.positioning,
  system.flex,
  system.grid
);

export type FormProps = ComponentProps<typeof StyledForm>

const StyledForm = styled('form', styledOptions<'form'>())(formSystemProps);

export const Form: React.FC<FormProps> = ({ method = 'post', ...props }) => {
  const className = cx(styles.Form, props.className);

  return <StyledForm {...props} method={method} className={className} />;
};
