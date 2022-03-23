import { setupRtl } from '@codecademy/gamut-tests';

import { Subtitle } from '../index';

const renderView = setupRtl(Subtitle, {
  difficulty: 'Intermediate',
  scope: { lesson: 10 },
  showAltSubtitle: false,
});

describe('CurriculumCard > Subtitle', () => {
  it('displays scope count', () => {
    const { view } = renderView();
    view.getByText('10');
    view.getByText('Lessons');
  });

  it('does not display scope count if scope count is undefined', () => {
    const { view } = renderView({ scope: {} });

    expect(view.queryByText('lesson')).toBeFalsy();
  });

  it('does not display scope count if scope count is 0', () => {
    const { view } = renderView({ scope: { lesson: 0, quiz: 10 } });

    expect(view.queryByText('lesson')).toBeFalsy();
  });

  it('does not show difficulty when displaying the alt subtitle', () => {
    const { view } = renderView({ showAltSubtitle: true });

    expect(view.queryByText('Beginner friendly')).toBeFalsy();
    expect(view.queryByText('Intermediate')).toBeFalsy();
  });
});
