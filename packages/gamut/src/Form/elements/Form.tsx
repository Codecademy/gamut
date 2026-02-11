import { styledOptions, system } from '@codecademy/gamut-styles';
import { variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import {
  ComponentProps,
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';

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

/** React 19 ref compat: Omit ref so forwardRef is the single source (see typings/react-19-compat.d.ts). */
export const Form = forwardRef<
  HTMLFormElement | null,
  Omit<FormProps, 'ref'>
>(({ method = 'post', ...props }, ref) => {
  return <StyledForm {...props} method={method} noValidate ref={ref} />;
}) as ForwardRefExoticComponent<
  Omit<FormProps, 'ref'> & RefAttributes<HTMLFormElement | null>
>;
