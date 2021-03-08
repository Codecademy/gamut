import {
  color,
  shouldForwardProp,
  space,
  truncate,
  typography,
} from '@codecademy/gamut-styles';
import { compose, HandlerProps } from '@codecademy/gamut-system';
import styled from '@emotion/styled';

export const textStyles = compose(typography, color, space);

export interface TextProps extends HandlerProps<typeof textStyles> {
  truncateLine?: boolean;
}

export const Text = styled('span', { shouldForwardProp })<TextProps>`
  color: inherit;
  ${textStyles}
  ${({ truncateLine }) => truncateLine && truncate}
`;

Text.defaultProps = {
  fontSize: 16,
  margin: 0,
  fontFamily: 'base',
  fontWeight: 'base',
  lineHeight: 'base',
};
