import { setupRtl } from '@codecademy/gamut-tests';

import { Difficulty } from '../index';

describe('CurriculumCard Difficulty', () => {
  it('displays beginner friendly difficulty', () => {
    const { view } = setupRtl(Difficulty, { difficulty: 0 })();
    view.getByText('Beginner friendly');
  });
  it('displays intermediate difficulty', () => {
    const { view } = setupRtl(Difficulty, { difficulty: 1 })();
    view.getByText('Intermediate');
  });
});
