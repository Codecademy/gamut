import { Box, PATTERN_VARIANTS } from '@codecademy/gamut-labs/src';
import { createDropPattern, spacing } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

export const DottedBox = styled(Box)`
  ${createDropPattern({
    url: PATTERN_VARIANTS.dotted,
    xOffset: `-${spacing[16]}`,
    yOffset: spacing[16],
  })}
`;

export const DiagonalBox = styled(Box)`
  ${createDropPattern({
    url: PATTERN_VARIANTS.diagonal,
    xOffset: `-${spacing[16]}`,
    yOffset: spacing[16],
  })}
`;

export const MatrixBox = styled(Box)`
  ${createDropPattern({
    url: PATTERN_VARIANTS.matrix,
    xOffset: `-${spacing[16]}`,
    yOffset: spacing[16],
  })}
`;
