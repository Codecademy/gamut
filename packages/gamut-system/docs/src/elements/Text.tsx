import { compose, HandlerProps } from '@codecademy/gamut-system';
import {
  styled,
  layout,
  spacing,
  typography,
  variant,
  border,
  colors,
} from '../system';

export const textProps = compose(typography, layout, spacing, colors);

type TextProps = HandlerProps<typeof textProps> & {
  as?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'span'
    | 'em'
    | 'strong'
    | 'code';
};

export const Text = styled.p<TextProps>(textProps);

Text.defaultProps = {
  fontSize: 2,
  fontWeight: 'base',
  fontFamily: 'base',
  lineHeight: 'base',
};

const headingVariant = variant({
  prop: 'headingType',
  variants: {
    h1: {
      marginTop: 32,
      marginBottom: 16,
      fontFamily: 'accent',
      fontSize: 7,
    },
    h2: {
      marginTop: 32,
      marginBottom: 16,
      fontFamily: 'accent',
      fontSize: 6,
    },
    h3: {
      marginTop: 16,
      marginBottom: 8,
      fontFamily: 'accent',
      fontSize: 5,
    },
    h4: {
      marginTop: 16,
      marginBottom: 8,
      fontFamily: 'accent',
      fontSize: 4,
    },
    h5: {
      marginTop: 16,
      marginBottom: 8,
      fontFamily: 'accent',
      fontSize: 3,
    },
    h6: {
      marginTop: 16,
      marginBottom: 8,
      fontFamily: 'accent',
      fontSize: 2,
    },
  },
});

type HeadingProps = {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
} & Parameters<typeof headingVariant>[0];

export const HeadingElement = styled(Text)<HeadingProps>`
  ${headingVariant}
`;
HeadingElement.defaultProps = {
  fontWeight: 'heading',
};

export const Heading: React.FC<Pick<TextProps & HeadingProps, 'as'>> = ({
  as,
  ...restProps
}) => <HeadingElement {...restProps} as={as} headingType={as} />;
