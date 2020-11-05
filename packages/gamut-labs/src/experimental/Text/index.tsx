import styled from '@emotion/styled';

import { compose, HandlerProps } from '@codecademy/gamut-system';
import { typography, color, space } from '@codecademy/gamut-styles';

export const textStyles = compose(typography, color, space);

export type TextProps = HandlerProps<typeof textStyles>;

export const Text = styled.span<TextProps>(textStyles);

Text.defaultProps = {
  fontSize: 16,
  margin: 0,
  fontFamily: 'base',
  fontWeight: 'base',
  lineHeight: 'base',
};
