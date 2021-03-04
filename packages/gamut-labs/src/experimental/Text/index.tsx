import {
  color,
  shouldForwardProp,
  space,
  typography,
} from '@codecademy/gamut-styles';
import { compose, HandlerProps } from '@codecademy/gamut-system';
import styled from '@emotion/styled';

export const textStyles = compose(typography, color, space);

export interface TextProps extends HandlerProps<typeof textStyles> {}

export const Text = styled('span', { shouldForwardProp })<TextProps>(
  textStyles
);

Text.defaultProps = {
  fontSize: 16,
  margin: 0,
  fontFamily: 'base',
  fontWeight: 'base',
  lineHeight: 'base',
};
