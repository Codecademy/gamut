import { Box, FlexBox } from '@codecademy/gamut';
import styled from '@emotion/styled';
import { uniqueId } from 'lodash';
import React from 'react';

export type DifficultyProps = {
  difficulty: 0 | 1 | 2;
};

const DifficultySpan = styled(Box)`
  width: 8px;
  height: 8px;
  border-radius: 8px;
  display: inline-block;
  margin-right: 4px;
  margin-bottom: 1px;
  vertical-align: middle;
  border: 1px solid ${({ theme }) => theme.colors.navy};
`;

enum DifficultyString {
  'Beginner friendly',
  'Intermediate',
  'Advanced',
}

export const Difficulty: React.FC<DifficultyProps> = ({ difficulty }) => {
  const currentDifficulty = difficulty || 0;

  return (
    <FlexBox fontSize={14} alignItems="center">
      {[...Array(Number(currentDifficulty) + 1)].map(() => (
        <DifficultySpan key={uniqueId()} bg="navy" />
      ))}
      {DifficultyString[currentDifficulty]}
    </FlexBox>
  );
};
