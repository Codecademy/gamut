import { system, variant } from '@codecademy/gamut-styles';

// This is a test comment
export const tabContainerVariants = variant({
  base: {
    display: 'flex',
  },
  defaultVariant: 'standard',
  variants: {
    standard: {
      position: 'relative',
      mb: 24,
      '&:after': {
        content: '""',
        height: '1px',
        bg: 'text',
        position: 'absolute',
        bottom: 0,
        zIndex: 0,
        width: '100%',
      },
    },
    block: {
      bg: 'shadow-solid',
      mb: 16,
    },
  },
});

export const tabContainerStates = system.states({
  fill: {
    display: 'grid',
    gridAutoColumns: '1fr',
    gridTemplateRows: 'auto',
    gridAutoFlow: 'column',
  },
});
