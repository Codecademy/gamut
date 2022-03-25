export enum ContainerDifficulty {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
}

export type DifficultyVariant = 'small' | 'medium';

export type ContentDifficultyProps = {
  difficulty: ContainerDifficulty;
  variant?: DifficultyVariant;
};

export enum DifficultyString {
  'Beginner friendly',
  'Intermediate',
  'Advanced',
}
