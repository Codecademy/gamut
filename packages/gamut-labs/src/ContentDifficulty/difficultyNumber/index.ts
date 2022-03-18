export enum ContainerDifficulty {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
}

/**
 * converting ContainerDifficulty enum into union type
 * type ContainerDifficultyUnion = "Beginner" | "Intermediate" | "Advanced"
 */
export type ContainerDifficultyUnion = `${ContainerDifficulty}`;

export const difficultyNumber = <
  Type extends ContainerDifficultyUnion | ContainerDifficulty
>(
  difficulty: Type
): 0 | 1 | 2 => {
  if (difficulty === ContainerDifficulty.Beginner) return 0;
  if (difficulty === ContainerDifficulty.Intermediate) return 1;

  return 2;
};
