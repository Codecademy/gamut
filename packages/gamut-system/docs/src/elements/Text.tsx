import { compose } from '@codecademy/gamut-system';
import {
  styled,
  layout,
  spacing,
  typography,
  variant,
  border,
} from '../system';

export const textProps = compose(typography, layout, spacing);

export const Text = styled.p(textProps);

Text.defaultProps = {
  fontSize: 2,
  fontWeight: 'base',
  fontFamily: 'base',
  lineHeight: 'base',
};

const codeProps = compose(textProps, border);

export const Code = styled.code`
  ${codeProps}
`;

Code.defaultProps = {
  borderRadius: 'sm',
  fontWeight: 'base',
  fontFamily: 'monospace',
  fontSize: 1,
  paddingX: 4,
};

const headingVariant = variant({
  prop: 'hSize',
  variants: {
    '1': {
      fontFamily: 'accent',
      fontSize: 9,
    },
    '2': {
      fontFamily: 'accent',
      fontSize: 8,
    },
    '3': {
      fontFamily: 'accent',
      fontSize: 7,
    },
    '4': {
      fontFamily: 'accent',
      fontSize: 6,
    },
    '5': {
      fontFamily: 'accent',
      fontSize: 5,
    },
    '6': {
      fontFamily: 'accent',
      fontSize: 4,
    },
  },
});

type HeadingProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
} & Parameters<typeof headingVariant>[0];

export const Heading = styled(Text)<HeadingProps>(headingVariant);
