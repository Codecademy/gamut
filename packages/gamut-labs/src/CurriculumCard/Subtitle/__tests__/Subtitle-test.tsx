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
    view.getByText('10');
    view.getByText('Lessons');
  });

  it('does not display scope count if scope count is undefined', () => {
    const { view } = renderView({ scopeCount: undefined });

    expect(view.queryByText('lesson')).toBeFalsy();
  });

  it('does not display scope count if scope count is 0', () => {
    const { view } = renderView({ scopeCount: 0 });

    expect(view.queryByText('lesson')).toBeFalsy();
  });
});
