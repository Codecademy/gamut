import { compose, HandlerProps } from '@codecademy/gamut-system';
import { styled, typography, coloration } from '@codecademy/gamut-styles';

export const textStyles = compose(typography, coloration);

export type TextProps = HandlerProps<typeof textStyles> & {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
};

export const Text = styled.span<TextProps>(typography);
