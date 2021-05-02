import { FloatingCard } from '@codecademy/gamut';
import { system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

const beakVariants = system.variant({
  prop: 'beak',
  base: {
    position: 'relative',
    '&:after': {
      content: '""',
      width: '1.5rem',
      height: '1.5rem',
      bg: 'background',
      transform: 'rotate(45deg)',
      position: 'absolute',
      borderRadiusTopLeft: '2px',
      border: 1,
      borderStyleRight: 'none',
      borderStyleBottom: 'none',
    },
  },
  variants: {
    'top-left': {
      '&:after': {
        bottom: 'calc(-0.75rem - 1px)',
        left: '1.5rem',
        transform: 'rotate(225deg)',
      },
    },
    'top-right': {
      '&:after': {
        bottom: 'calc(-0.75rem - 1px)',
        right: '1.5rem',
        transform: 'rotate(225deg)',
      },
    },
    'bottom-left': {
      '&:after': {
        top: 'calc(-0.75rem - 1px)',
        left: '1.5rem',
        transform: 'rotate(45deg)',
      },
    },
    'bottom-right': {
      '&:after': {
        top: 'calc(-0.75rem - 1px)',
        right: '1.5rem',
        transform: 'rotate(45deg)',
      },
    },
  },
});

export const PopoverCard = styled(FloatingCard)(beakVariants);
