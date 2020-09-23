import styled from '@emotion/styled';

import {
  createVariant,
  spacing,
  border,
} from '@codecademy/gamut-styles/dist/system';
import { colors } from '@codecademy/gamut-styles';

const boxVariants = createVariant({
  primary: {
    borderColor: colors.navy,
    backgroundColor: colors.white,
    color: colors.navy,
  },
  secondary: {
    borderColor: colors.navy,
    backgroundColor: colors.navy,
    color: colors.white,
  },
  alternate: {
    borderColor: colors.navy,
    backgroundColor: colors.yellow,
    color: colors.white,
  },
});

export const Box = styled.div`
  ${border}
  ${spacing}
  ${boxVariants}
`;

Box.defaultProps = {
  margin: '16px',
  borderStyle: 'solid',
  borderWidth: '1px',
  padding: '16px',
} as any;
