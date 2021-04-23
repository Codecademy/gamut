import { setupRtl } from '@codecademy/gamut-tests';

import { Subtitle } from '../index';

const renderView = setupRtl(Subtitle, {
  difficulty: 1,
  scope: 'lesson',
  scopeCount: 10,
});

describe('CurriculumCard > Subtitle', () => {
  it('displays scope count', () => {
    const { view } = renderView();
    view.getByText('10 Lessons');
  });

  it('does not display scope count if scope count is undefined', () => {
    const { view } = renderView({ scopeCount: undefined });

    expect(view.queryByText('lesson')).toBeFalsy();
  });
});
