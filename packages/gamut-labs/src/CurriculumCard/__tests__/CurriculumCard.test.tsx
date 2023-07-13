import { setupRtl } from '@codecademy/gamut-tests';

import { ContainerDifficulty } from '../Difficulty/types';
import { CurriculumCard } from '../index';

const renderView = setupRtl(CurriculumCard, {
  difficulty: ContainerDifficulty.Beginner,
  scope: { lesson: 12 },
  text: 'Course',
  title: 'I am a card',
});

describe('CurriculumCard', () => {
  it('loads', () => {
    const { view } = renderView();
    view.getByText('I am a card');
  });

  it('prefixes the content type with Free for free courses', () => {
    const { view } = renderView({
      description: 'hey now!',
      showDescription: true,
      showProLogo: false,
    });
    view.getByText('Free Course');
  });

  it('does not prefix the content type with Free for courses that are pro only', () => {
    const { view } = renderView({
      description: 'hey now!',
      showDescription: true,
      showProLogo: true,
    });
    view.getByText('Course');
    expect(view.queryByText('Free Course')).toBeFalsy();
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

  it('shows a description when value is present and showDescription is true', () => {
    const { view } = renderView({
      description: 'hey now!',
      showDescription: true,
    });
    view.getByText('hey now!');
  });
});
