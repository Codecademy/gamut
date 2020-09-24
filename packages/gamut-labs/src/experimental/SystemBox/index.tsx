import styled from '@emotion/styled';
import {
  createVariant,
  spacing,
  border,
  SpacingProps,
  BorderProps,
} from '@codecademy/gamut-styles/dist/system';

const boxVariants = createVariant({
  primary: {
    borderColor: 'navy',
    backgroundColor: 'white',
    color: 'navy',
  },
  secondary: {
    borderColor: 'navy',
    backgroundColor: 'navy',
    color: 'white',
  },
  alternate: {
    borderColor: 'navy',
    backgroundColor: 'yellow',
    color: 'white',
  },
});

type BoxVariantProps = Parameters<typeof boxVariants>[0];
export type SystemBoxProps = SpacingProps & BorderProps & BoxVariantProps;

export const SystemBox = styled.div<SystemBoxProps>`
  ${border}
  ${spacing}
  ${boxVariants}
`;

SystemBox.defaultProps = {
  margin: '16px',
  borderStyle: 'solid',
  borderWidth: '1px',
  padding: '16px',
} as any;
