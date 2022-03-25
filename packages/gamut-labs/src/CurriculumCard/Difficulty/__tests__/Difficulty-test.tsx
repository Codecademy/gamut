import { setupRtl } from '@codecademy/gamut-tests';

import { Difficulty } from '../index';
import { ContainerDifficulty } from '../types';

describe('CurriculumCard Difficulty', () => {
  it('displays beginner friendly difficulty', () => {
    const { view } = setupRtl(Difficulty, {
      difficulty: ContainerDifficulty.Beginner,
    })();
    view.getByText('Beginner friendly');
  });
  it('displays intermediate difficulty', () => {
    const { view } = setupRtl(Difficulty, {
      difficulty: ContainerDifficulty.Intermediate,
    })();
    view.getByText('Intermediate');
  });
  it('displays advance difficulty', () => {
    const { view } = setupRtl(Difficulty, {
      difficulty: ContainerDifficulty.Advanced,
    })();
    view.getByText('Advanced');
  });
});
