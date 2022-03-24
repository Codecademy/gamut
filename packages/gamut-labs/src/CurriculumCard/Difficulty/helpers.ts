import { ContainerDifficulty, ContainerDifficultyUnion } from './types';

/**
 * calculate the number associated with the difficulty level for a particular content
 *
 * @param difficulty level of difficulty for a particular content
 * @returns 0 indicating beginner, 1 intermediate and 2 for advanced content.
 */
export const getDifficultyNumber = <
  Type extends ContainerDifficultyUnion | ContainerDifficulty
>(
  difficulty: Type
): 0 | 1 | 2 => {
  if (difficulty === ContainerDifficulty.Beginner) return 0;
  if (difficulty === ContainerDifficulty.Intermediate) return 1;

  return 2;
};
