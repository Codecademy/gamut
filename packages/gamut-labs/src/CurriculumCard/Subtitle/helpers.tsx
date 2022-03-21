import {
  ContainerDifficulty,
  ContainerDifficultyUnion,
} from '../Difficulty/types';

/* Quick and easy credit: https://stackoverflow.com/a/39835908 */
export const pluralizeWithS = (scope: string, scopeCount: number) => {
  // Out of all of our content types, only quizzes need a different way to be pluralized
  if (scope.charAt(scope.length - 1) === 'z') {
    return `${scope}${scopeCount !== 1 ? 'zes' : ''}`;
  }

  return `${scope}${scopeCount !== 1 ? 's' : ''}`;
};

/**
 * calculate number associated with a difficulty level for a particular content
 *
 * @param difficulty level of of difficulty for a particular content
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
