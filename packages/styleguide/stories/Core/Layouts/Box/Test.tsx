import { Box, patterns } from '@codecademy/gamut-labs/src';
import { styled } from '@storybook/theming';

export const DottedBox = styled(Box)`
  ${patterns.dotted}
`;

export const DiagonalBox = styled(Box)`
  ${patterns.diagonal}
`;

export const MatrixBox = styled(Box)`
  ${patterns.matrix}
`;
