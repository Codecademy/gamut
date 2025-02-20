import { states, theme, variant } from "@codecademy/gamut-styles";

export const cardVariants = variant({
  defaultVariant: 'default',
  base: {
    border: 1,
    borderRadius: 'md',
    p: 16,
    color: 'text',
    maxWidth: "100%",
    position: "relative"
  },
  variants: {
    default: {
      bg: 'background',
    },
    white: {
      bg: 'white'
    },
    yellow: {
      bg: 'yellow'
    },
    beige: {
      bg: 'beige'
    },
    navy: {
      bg: 'navy',
    },
    hyper: {
      bg: 'hyper',
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
      boxShadow: `-6px 6px ${theme.colors['background-current']}, -6px 6px 0 1px ${theme.colors['border-primary']}`,
      transition: 'box-shadow 200ms ease, transform 200ms ease',
      // '&:hover': {
      //   // transform: 'translate(4px, -4px)',
      //   boxShadow: `0 0 0 ${theme.colors['shadow-primary']}`,
      // },
    }
  }
})

export const hoverState = states({
  isInteractive: {
    '&:hover': {
      // transform: 'translate(4px, -4px)',
      boxShadow: `0 0 0 ${theme.colors['shadow-primary']}`,
    },
  },
  // isInteractiveRight: {
  //   '&:hover': {
  //     // transform: 'translate(4px, 4px)',
  //     boxShadow: `8px 8px 0 currentColor`,
  //   },
  // }
})
