import { Box } from '@codecademy/gamut';
import { pxRem, system, theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { times, uniqueId } from 'lodash';
import React from 'react';

export enum ContainerDifficulty {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
}

export type DifficultyVariant = 'small' | 'medium';

export type DifficultyProps = {
  difficulty: ContainerDifficulty;
  variant?: DifficultyVariant;
};

export enum DifficultyString {
  'Beginner friendly',
  'Intermediate',
  'Advanced',
}

/**
 * calculate the number associated with the difficulty level for a particular content
 *
 * @param difficulty level of difficulty for a particular content
 * @returns 0 indicating beginner, 1 intermediate and 2 for advanced content.
 */
export const getDifficultyNumber = (
  difficulty: ContainerDifficulty
): 0 | 1 | 2 => {
  if (difficulty === ContainerDifficulty.Beginner) return 0;
  if (difficulty === ContainerDifficulty.Intermediate) return 1;

  return 2;
};

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

export const Difficulty: React.FC<DifficultyProps> = ({
  difficulty,
  variant,
}) => {
  const difficultyNumber = getDifficultyNumber(difficulty);

  return (
    <>
      {times(difficultyNumber + 1, () => (
        <DifficultySpan key={uniqueId()} variant={variant} />
      ))}
      {DifficultyString[difficultyNumber]}
    </>
  );
};
