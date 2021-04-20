import { setupRtl } from '@codecademy/gamut-tests';

import { CurriculumCard } from '../index';

const renderView = setupRtl(CurriculumCard, {
  difficulty: 0,
  scope: 'lesson',
  scopeCount: 12,
  text: 'Course',
  title: 'I am a card',
});

describe('CurriculumCard', () => {
  it('loads', () => {
    const { view } = renderView();
    view.getByText('I am a card');
  });
  it('does not display an image when image does not exist', () => {
    const { view } = renderView();
    expect(view.queryByRole('img')).toBeFalsy();
  });
  it('shows an enrolled state', () => {
    const { view } = renderView({ progressState: 'inProgress' });
    view.getByText('Enrolled...');
  });
  it('shows a completed state', () => {
    const { view } = renderView({ progressState: 'completed' });
    view.getByText('Completed');
  });
});
