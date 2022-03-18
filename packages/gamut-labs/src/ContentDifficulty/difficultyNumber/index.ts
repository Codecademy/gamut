import { ContainerDifficulty, ContainerDifficultyUnion } from '../types';

/**
 * calculate difficulty for a particular content
 *
 * @param difficulty
 * @returns 0 indicating beginner, 1 intermediate and 2 being advanced content.
 */
export const difficultyNumber = <
  Type extends ContainerDifficultyUnion | ContainerDifficulty
>(
  difficulty: Type
): 0 | 1 | 2 => {
  if (difficulty === ContainerDifficulty.Beginner) return 0;
  if (difficulty === ContainerDifficulty.Intermediate) return 1;

  return 2;
};
