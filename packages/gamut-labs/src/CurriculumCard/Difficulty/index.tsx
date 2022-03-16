import { Box, FlexBox } from '@codecademy/gamut';
import { pxRem } from '@codecademy/gamut-styles';
import { times, uniqueId } from 'lodash';
import React from 'react';

export type DifficultyProps = {
  difficulty: 0 | 1 | 2;
};

enum DifficultyString {
  'Beginner friendly',
  'Intermediate',
  'Advanced',
}

export const Difficulty: React.FC<DifficultyProps> = ({ difficulty }) => (
  <FlexBox fontSize={14} alignItems="center">
    {times(difficulty + 1).map(() => (
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
      />
    ))}
    {DifficultyString[difficulty]}
  </FlexBox>
);
