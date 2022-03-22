export enum ContainerDifficulty {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
}

/**
 * converting ContainerDifficulty enum into union type
 */
export type ContainerDifficultyUnion = `${ContainerDifficulty}`;

export type DifficultyVariant = 'small' | 'medium';

export type ContentDifficultyProps = {
  difficulty: ContainerDifficulty | ContainerDifficultyUnion;
  variant?: DifficultyVariant;
};

export enum DifficultyString {
  'Beginner friendly',
  'Intermediate',
  'Advanced',
}
