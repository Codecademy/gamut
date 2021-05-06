import { Box, Text } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

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
  border: 1px solid ${({ theme }) => theme.colors.navy};
`;

export const Difficulty: React.FC<DifficultyProps> = ({ difficulty }) => (
  <Text fontSize={14}>
    <DifficultySpan bg={difficulty >= 0 ? 'navy' : 'white'} />
    <DifficultySpan bg={difficulty >= 1 ? 'navy' : 'white'} />
    {difficulty === 0 ? 'Beginner friendly' : 'Intermediate'}
  </Text>
);
