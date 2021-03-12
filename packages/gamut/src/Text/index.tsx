import {
  color,
  properties,
  shouldForwardProp,
  space,
  typography,
  variant,
} from '@codecademy/gamut-styles';
import { compose, HandlerProps } from '@codecademy/gamut-system';
import styled from '@emotion/styled';

const textVariants = variant({
  prop: 'as',
  variants: {
    h1: {
      fontSize: 64,
      fontWeight: 'title',
      lineHeight: 'title',
    },
    h2: {
      fontSize: 44,
      fontWeight: 'title',
      lineHeight: 'title',
    },
    h3: {
      fontSize: 34,
      fontWeight: 'title',
      lineHeight: 'title',
    },
    h4: {
      fontSize: 26,
      fontWeight: 'title',
      lineHeight: 'title',
    },
    h5: {
      fontSize: 22,
      fontWeight: 'title',
      lineHeight: 'title',
    },
    h6: {
      fontSize: 20,
      fontWeight: 'title',
      lineHeight: 'title',
    },
    small: {
      fontSize: 14,
    },
    p: {
      fontSize: 16,
    },
    strong: {
      fontWeight: 'title',
    },
    code: {
      fontFamily: 'monospace',
    },
    span: {},
  },
});

export const textStyles = compose(
  properties.display,
  properties.width,
  properties.height,
  typography,
  color,
  space
);

export interface TextProps
  extends HandlerProps<typeof textStyles>,
    HandlerProps<typeof textVariants> {}

export const Text = styled('span', { shouldForwardProp })<TextProps>(
  textVariants,
  textStyles
);

Text.defaultProps = {
  as: 'p',
};
