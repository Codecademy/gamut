import { Box, BoxProps } from '@codecademy/gamut';
import { pxRem } from '@codecademy/gamut-styles';
import { times, uniqueId } from 'lodash';
import React from 'react';

export type DifficultyProps = BoxProps & { difficulty: 0 | 1 | 2 };

export enum DifficultyString {
  'Beginner friendly',
  'Intermediate',
  'Advanced',
}

export const Difficulty: React.FC<DifficultyProps> = ({
  difficulty,
  ...overrides
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
