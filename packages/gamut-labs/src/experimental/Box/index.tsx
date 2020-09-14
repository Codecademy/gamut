import styled from '@emotion/styled';

import {
  border,
  BorderProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from '@codecademy/gamut-styles/dist/system';

export type BoxProps = SpaceProps & LayoutProps & BorderProps;

export const Box = styled.div<BoxProps>`
  ${space}
  ${layout}
  ${border}
`;
