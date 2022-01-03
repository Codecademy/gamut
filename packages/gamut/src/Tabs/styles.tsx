import { system } from '@codecademy/gamut-styles';

export const tabContainerStyles = system.css({
  display: 'flex',
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
});

export const tabContainerStates = system.states({
  fill: {
    display: 'grid',
    gridAutoColumns: '1fr',
    gridTemplateRows: 'auto',
    gridAutoFlow: 'column',
  },
});
