import { Box } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

import { Text } from '../..';

export type DifficultyProps = {
  difficulty: 0 | 1;
};

const DifficultySpan = styled(Box)`
  width: 8px;
  height: 8px;
  border-radius: 8px;
  display: inline-block;
  margin-right: 4px;
  vertical-align: middle;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.navy};
`;

export const Difficulty: React.FC<DifficultyProps> = ({ difficulty }) => (
  <Text fontSize={14}>
    <DifficultySpan
      as="span"
      backgroundColor={difficulty >= 0 ? 'navy' : 'white'}
    />
    <DifficultySpan
      as="span"
      backgroundColor={difficulty >= 1 ? 'navy' : 'white'}
    />
    {difficulty === 0 ? 'Beginner friendly' : 'Intermediate'}
  </Text>
);
