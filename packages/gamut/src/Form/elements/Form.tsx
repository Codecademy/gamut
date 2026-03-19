import { system, useVariance } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import { forwardRef, FormHTMLAttributes } from 'react';
import * as React from 'react';

const formSystemProps = variance.compose(
  system.space,
  system.border,
  system.layout,
  system.positioning,
  system.flex,
  system.grid
);

export type FormProps = FormHTMLAttributes<HTMLFormElement> &
  StyleProps<typeof formSystemProps>;

const StyledForm = forwardRef<HTMLFormElement, FormProps>((props, ref) => {
  const { rest } = useVariance(props as Record<string, unknown>, formSystemProps);
  return <form ref={ref} {...rest} />;
});

export const Form: React.FC<FormProps> = forwardRef(
  ({ method = 'post', ...props }, ref) => {
    return <StyledForm {...props} method={method} noValidate ref={ref} />;
  }
);
