import { theme, variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

export const FormError = styled.span(
  variant({
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
  })
);
