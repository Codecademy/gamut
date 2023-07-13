import { Box, Text } from '@codecademy/gamut';
import { pxRem, system, theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { times, uniqueId } from 'lodash';
import * as React from 'react';

import { getDifficultyNumber } from './helpers';
import { ContentDifficultyProps, DifficultyString } from './types';

const DifficultySpan = styled(Box)(
  system.variant({
    base: {
      display: 'inline-block',
      marginRight: pxRem(4),
      verticalAlign: 'middle',
      border: 1,
      background: theme.colors.navy,
      marginBottom: pxRem(1),
    },
    defaultVariant: 'small',
    variants: {
      small: {
        width: pxRem(8),
        height: pxRem(8),
        borderRadius: pxRem(8),
      },
      medium: {
        width: pxRem(10),
        height: pxRem(10),
        borderRadius: pxRem(10),
      },
    },
  })
);

export const Difficulty: React.FC<ContentDifficultyProps> = ({
  difficulty,
  variant,
}) => {
  const difficultyNumber = getDifficultyNumber(difficulty);

  return (
    <>
      {times(difficultyNumber + 1, () => (
        <DifficultySpan key={uniqueId()} variant={variant} />
      ))}
      <Text>{DifficultyString[difficultyNumber]}</Text>
    </>
  );
};
