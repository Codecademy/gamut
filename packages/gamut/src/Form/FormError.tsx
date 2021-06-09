import { theme, variant } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import React, { HTMLAttributes } from 'react';

import { colorStates } from './styles/shared';

const errorSpanVariants = variant({
  base: {
    left: 0,
    top: `calc(100% - ${theme.spacing[8]})`,
    color: colorStates.error.color,
    display: 'inline-block',
    fontSize: 'small',
  },
  defaultVariant: 'absolute',
  variants: {
    absolute: {
      position: 'absolute',
    },
    inlineCentered: {
      position: 'initial',
      textAlign: 'center',
    },
  },
});

const ErrorSpan = styled.span(errorSpanVariants);

type FormErrorProps = StyleProps<typeof errorSpanVariants> &
  HTMLAttributes<HTMLSpanElement>;

export const FormError: React.FC<FormErrorProps> = (props) => {
  return <ErrorSpan {...props} />;
};
