type ContainerDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export const difficultyNumber = (
  difficulty: ContainerDifficulty
): 0 | 1 | 2 => {
  if (difficulty === 'Beginner') return 0;
  if (difficulty === 'Intermediate') return 1;

  return 2;
};
