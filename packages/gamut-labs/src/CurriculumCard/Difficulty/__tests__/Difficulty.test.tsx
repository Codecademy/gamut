import { setupRtl } from '@codecademy/gamut-tests';

import { Difficulty } from '../index';

const renderView = setupRtl(Difficulty, {});

describe('CurriculumCard Difficulty', () => {
  it('displays beginner friendly difficulty', () => {
    const { view } = renderView({ difficulty: 'Beginner' });
    view.getByText('Beginner friendly');
  });

  it('displays intermediate difficulty', () => {
    const { view } = renderView({ difficulty: 'Intermediate' });
    view.getByText('Intermediate');
  });

  it('displays advance difficulty', () => {
    const { view } = renderView({ difficulty: 'Advanced' });
    view.getByText('Advanced');
  });
});
