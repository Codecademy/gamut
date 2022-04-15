import { Arg } from '@animus-ui/core';

import { Box } from './Box';

export const FlexBox = Box.extend()
  .styles({
    display: 'flex',
  })
  .states({
    inline: {
      display: 'inline-flex',
    },
    wrap: {
      flexWrap: 'wrap',
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
    },
    column: {
      flexDirection: 'column',
    },
  })
  .asElement('div');

export type FlexBoxProps = Arg<typeof FlexBox>;
