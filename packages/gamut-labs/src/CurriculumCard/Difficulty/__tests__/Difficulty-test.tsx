import { setupRtl } from '@codecademy/gamut-tests';

import { Difficulty } from '../index';

describe('CurriculumCard Difficulty', () => {
  it('displays beginner friendly difficulty', () => {
    const { view } = setupRtl(Difficulty, { difficulty: 'Beginner' })();
    view.getByText('Beginner friendly');
  });
  it('displays intermediate difficulty', () => {
    const { view } = setupRtl(Difficulty, { difficulty: 'Intermediate' })();
    view.getByText('Intermediate');
  });
  it('displays advance difficulty', () => {
    const { view } = setupRtl(Difficulty, { difficulty: 'Advanced' })();
    view.getByText('Advanced');
  });
});
