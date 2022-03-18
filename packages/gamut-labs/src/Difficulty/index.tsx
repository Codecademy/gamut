import { Box } from '@codecademy/gamut';
import { pxRem } from '@codecademy/gamut-styles';
import { times, uniqueId } from 'lodash';
import React from 'react';

import { ContentDifficultyProps, DifficultyString } from './types';

export const ContentDifficulty: React.FC<ContentDifficultyProps> = ({
  difficulty,
  ...overrides // styling overrides to change the appearance of the difficulty indicators
}) => (
  <>
    {times(difficulty + 1, () => (
      <Box
        width={pxRem(8)}
        height={pxRem(8)}
        borderRadius={pxRem(8)}
        display="inline-block"
        mr={4}
        verticalAlign="middle"
        border={1}
        key={uniqueId()}
        bg="navy"
        {...overrides}
      />
    ))}
    {DifficultyString[difficulty]}
  </>
);
