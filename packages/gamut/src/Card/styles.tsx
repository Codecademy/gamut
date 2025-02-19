import { states, variant } from "@codecademy/gamut-styles";

export const cardVariants = variant({
  defaultVariant: 'default',
  base: {
    border: 1,
    borderRadius: 'md',
    p: 16,
    color: 'text',
  },
  variants: {
    default: {
      bg: 'background',
    },
    navy: {
      bg: 'navy'
    },
    white: {
      bg: 'white'
    },
    hyper: {
      bg: 'hyper'
    },
    yellow: {
      bg: 'yellow'
    },
    beige: {
      bg: 'beige'
    },
  }
})

export const shadowVariants = variant({
  defaultVariant: 'none',
  prop: 'shadow',
  variants: {
    none: {},
    patternLeft: {},
    patternRight: {},
    outline: {
      position: 'relative',
      boxShadow: `0px 0px 0 currentColor`,
      transition: 'box-shadow 200ms ease, transform 200ms ease',
    }
  }
})

export const hoverState = states({
  isInteractive: {
    '&:hover': {
      transform: 'translate(4px, -4px)',
      boxShadow: `-8px 8px 0 currentColor`,
    },
  }
})
