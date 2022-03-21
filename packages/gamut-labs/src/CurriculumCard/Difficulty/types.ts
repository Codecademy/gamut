import { BoxProps } from '@codecademy/gamut';

export enum ContainerDifficulty {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
}

/**
 * converting ContainerDifficulty enum into union type
 */
export type ContainerDifficultyUnion = `${ContainerDifficulty}`;

export type ContentDifficultyProps = BoxProps & { difficulty: 0 | 1 | 2 };

export enum DifficultyString {
  'Beginner friendly',
  'Intermediate',
  'Advanced',
}
