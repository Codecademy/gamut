import { styled } from '@storybook/theming';
import { variant } from './styles';
import { colors, fontBase, fontSmoothing } from '@codecademy/gamut-styles';

export const badgeVariants = variant({
  prop: 'status',
  variants: {
    stable: {
      backgroundColor: colors.green,
    },
    volatile: {
      backgroundColor: colors.yellow,
    },
    deprecated: {
      backgroundColor: colors.red,
    },
  },
});

export const Badge = styled.div`
  display: inline-block;
  align-items: center;
  padding: 0.15rem 0.75rem 0;
  line-height: 2;
  font-size: 0.8rem;
  font-weight: 900;
  line-height: 1.75;
  border-radius: 0.75rem;
  text-transform: uppercase;
  font-family: ${fontBase};
  color: ${colors.white};
  ${badgeVariants}
  ${fontSmoothing()}
`;
