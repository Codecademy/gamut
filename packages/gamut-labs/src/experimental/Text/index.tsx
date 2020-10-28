import { compose, HandlerProps } from '@codecademy/gamut-system';
import { styled, typography, color, space } from '@codecademy/gamut-styles';

export const textStyles = compose(typography, color, space);

export type TextProps = HandlerProps<typeof textStyles> & {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
};

export const Text = styled.span<TextProps>(textStyles);

Text.defaultProps = {
  fontSize: 16,
  margin: 0,
  fontFamily: 'base',
  fontWeight: 'base',
  lineHeight: 'base',
};
