import { theme, useVariance, variant } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import { forwardRef, HTMLAttributes } from 'react';
import * as React from 'react';

const errorSpanVariants = variant({
  base: {
    left: 0,
    top: `calc(100% - ${theme.spacing[8]})`,
    color: 'feedback-error',
    display: 'inline-block',
    fontSize: 'small',
  },
  defaultVariant: 'initial',
  variants: {
    initial: {
      position: 'initial',
    },
    absolute: {
      position: 'absolute',
    },
    inlineCentered: {
      position: 'initial',
      textAlign: 'center',
    },
  },
});

type FormErrorProps = StyleProps<typeof errorSpanVariants> &
  HTMLAttributes<HTMLSpanElement>;

const ErrorSpan = forwardRef<HTMLSpanElement, FormErrorProps>((props, ref) => {
  const { rest } = useVariance(props, errorSpanVariants);
  return <span ref={ref} {...rest} />;
});

export const FormError: React.FC<FormErrorProps> = (props) => {
  return <ErrorSpan {...props} />;
};
