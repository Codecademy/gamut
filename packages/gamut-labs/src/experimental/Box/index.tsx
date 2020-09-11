import styled from '@emotion/styled';

import {
  padding,
  margin,
  display,
  dimensions,
  borderWidth,
  borderStyle,
  borderColor,
  backgroundColor,
  borderRadius,
} from '@codecademy/gamut-styles/dist/system';
import { HandlerProps } from '@codecademy/gamut-styles/dist/system/types';

type BoxProps = HandlerProps<typeof padding> &
  HandlerProps<typeof margin> &
  HandlerProps<typeof dimensions> &
  HandlerProps<typeof display> &
  HandlerProps<typeof borderWidth> &
  HandlerProps<typeof borderStyle> &
  HandlerProps<typeof borderColor> &
  HandlerProps<typeof borderRadius> &
  HandlerProps<typeof backgroundColor>;

export const Box = styled.div<BoxProps>`
  ${padding}
  ${margin}
  ${dimensions}
  ${display}
  ${borderWidth}
  ${borderStyle}
  ${borderColor}
  ${borderRadius}
  ${backgroundColor}
`;
