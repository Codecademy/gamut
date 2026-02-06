import { styledOptions, system } from '@codecademy/gamut-styles';
import { variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import { ComponentProps, forwardRef } from 'react';

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

export const Form = forwardRef<HTMLFormElement | null, FormProps>(
  ({ method = 'post', ...props }, ref) => {
    return <StyledForm {...props} method={method} noValidate ref={ref} />;
  }
);
