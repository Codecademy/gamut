export enum ContainerDifficulty {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
}

/**
 * converting ContainerDifficulty enum into union type
 */
export type ContainerDifficultyUnion = `${ContainerDifficulty}`;

export type ContentDifficultyProps = {
  difficulty: ContainerDifficulty | ContainerDifficultyUnion;
  difficultyVariant?: 'small' | 'medium';
};

export enum DifficultyString {
  'Beginner friendly',
  'Intermediate',
  'Advanced',
}
