import { styledOptions, system } from '@codecademy/gamut-styles';
import { variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import React, { ComponentProps } from 'react';

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

export const Form: React.FC<FormProps> = ({
  method = 'post',
  display = 'flex',
  flexDirection = 'column',
  ...props
}) => {
  return <StyledForm {...props} noValidate method={method} />;
};
