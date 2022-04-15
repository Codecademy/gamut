import { animus, Arg } from '@animus-ui/core';

export const Box = animus
  .states({
    fit: {
      width: 1,
      height: 1,
    },
    context: {
      position: 'relative',
      zIndex: 1,
    },
    'no-select': {
      WebkitTouchCallout: 'none',
      userSelect: 'none',
    },
  })
  .groups({
    space: true,
    borders: true,
    layout: true,
    color: true,
    shadows: true,
    positioning: true,
    background: true,
    typography: true,
    flex: true,
    grid: true,
  })
  .asElement('div');

export type BoxProps = Arg<typeof Box>;
