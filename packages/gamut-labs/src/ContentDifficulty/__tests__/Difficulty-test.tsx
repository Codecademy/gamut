import { setupRtl } from '@codecademy/gamut-tests';

import { ContentDifficulty } from '../index';

describe('CurriculumCard Difficulty', () => {
  it('displays beginner friendly difficulty', () => {
    const { view } = setupRtl(ContentDifficulty, { difficulty: 0 })();
    view.getByText('Beginner friendly');
  });
  it('displays intermediate difficulty', () => {
    const { view } = setupRtl(ContentDifficulty, { difficulty: 1 })();
    view.getByText('Intermediate');
  });
  it('displays advance difficulty', () => {
    const { view } = setupRtl(ContentDifficulty, { difficulty: 2 })();
    view.getByText('Advanced');
  });
});
