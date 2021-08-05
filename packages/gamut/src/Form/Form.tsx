import { styledOptions, system } from '@codecademy/gamut-styles';
import { variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import cx from 'classnames';
import React, { ComponentProps } from 'react';

import styles from './styles/Form.module.scss';

const formSystemProps = variance.compose(
  system.space,
  system.border,
  system.layout,
  system.positioning,
  system.flex,
  system.grid
);

const StyledForm = styled('form', styledOptions<'form'>())(formSystemProps);

export type FormProps = ComponentProps<typeof StyledForm>;

export const Form: React.FC<FormProps> = ({ method = 'post', ...props }) => {
  const className = cx(styles.Form, props.className);

  return <StyledForm {...props} method={method} className={className} />;
};
