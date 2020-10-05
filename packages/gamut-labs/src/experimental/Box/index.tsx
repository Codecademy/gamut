import {
  border,
  BorderProps,
  color,
  ColorProps,
  layout,
  LayoutProps,
  space,
  positioning,
  PositioningProps,
  SpaceProps,
  variant,
  styled,
} from '@codecademy/gamut-styles';

const baseBoxProps = {
  borderColor: 'navy',
  borderStyle: 'solid',
  borderWidth: '1px',
} as const;

export const boxVariants = variant({
  variants: {
    navy: {
      ...baseBoxProps,
      backgroundColor: 'navy',
      color: 'white',
    },
    yellow: {
      ...baseBoxProps,
      color: 'navy',
      backgroundColor: 'yellow',
    },
    white: {
      ...baseBoxProps,
      backgroundColor: 'white',
      color: 'navy',
    },
  },
});

type BoxProps = SpaceProps &
  LayoutProps &
  BorderProps &
  ColorProps &
  PositioningProps;

export const NewBox = styled.div<BoxProps>`
  ${border}
  ${layout}
  ${space}
  ${color}
  ${positioning}
`;

NewBox.defaultProps = {
  padding: 16,
};
