import { Arg } from '@animus-ui/core';

import { Box } from './Box';

export const GridBox = Box.extend()
  .styles({
    display: 'grid',
  })
  .states({
    center: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    fitContent: {
      gridTemplate: 'minmax(0, 1fr) / minmax(0, 1fr)',
    },
  })
  .asElement('div');

export type GridBoxProps = Arg<typeof GridBox>;
