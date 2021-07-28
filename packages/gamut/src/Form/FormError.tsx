import { theme, variant } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import React, { HTMLAttributes } from 'react';

import { Markdown } from '../Markdown';

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

const ErrorSpan = styled.span(errorSpanVariants);

type FormErrorBaseProps = HTMLAttributes<HTMLSpanElement> & {
  markdown?: false;
};

type FormErrorMarkdownProps = {
  markdown: true;
  children: string;
};

type FormErrorDiscriminatedType = FormErrorBaseProps | FormErrorMarkdownProps;

type FormErrorProps = FormErrorDiscriminatedType &
  StyleProps<typeof errorSpanVariants>;

export const FormError: React.FC<FormErrorProps> = ({
  children,
  markdown,
  ...rest
}) => {
  if (markdown && typeof children === 'string') {
    return (
      <ErrorSpan {...rest}>
        <Markdown inline text={children} spacing="none" />
      </ErrorSpan>
    );
  }
  return <ErrorSpan {...rest}>{children}</ErrorSpan>;
};
