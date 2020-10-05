import {
  border,
  color,
  space,
  SpaceProps,
  styled,
  variant,
} from '@codecademy/gamut-styles';

const boxVariants = variant({
  variants: {
    navy: {
      backgroundColor: 'yellow',
      color: 'navy',
    },
    yellow: {
      color: 'white',
      backgroundColor: 'yellow',
    },
    white: {
      backgroundColor: 'white',
      color: 'navy',
    },
  },
});
type BoxProps = SpaceProps & Parameters<typeof boxVariants>[0];

export const NewBox = styled.div<BoxProps>`
  ${space({ padding: 16 })}
  ${border({ borderStyle: 'solid', borderWidth: '1px' })}
  ${color({ borderColor: 'navy' })}
  ${boxVariants}
`;

NewBox.defaultProps = {
  padding: 16,
};
