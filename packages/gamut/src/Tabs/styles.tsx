import { system, variant } from '@codecademy/gamut-styles';

export const tabsBaseVariants = variant({
  base: {},
  variants: {
    standard: {},
    learningEnvironment: {
      bg: 'background-current',
    },
  },
});

export const tabContainerVariants = variant({
  base: {
    display: 'flex',
  },
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
    learningEnvironment: {
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
