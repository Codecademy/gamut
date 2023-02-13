import { setupRtl } from '@codecademy/gamut-tests';

import { ContentGroupBaseCard } from '..';
import { CourseDifficulty, EnrollmentStatus } from '../types';

const renderView = setupRtl(ContentGroupBaseCard, {
  headerBackgroundColor: 'pink',
  headerText: 'Course',
  headingLevel: 'h3',
  title: 'Python 101',
  numLessons: 20,
});

const image =
  'https://static-assets.codecademy.com/components/curriculum/path/front-end-engineer-career-path/curriculum-card.svg';

describe('ContentGroupBaseCard', () => {
  it('displays the header title', () => {
    const { view } = renderView();

    expect(view.getByRole('heading', { level: 3 })).toHaveTextContent(
      'Python 101'
    );
  });

  it('appends the word Lessons to the number of lessons', () => {
    const { view } = renderView();

    const lessonsContent = view.getByTestId('card-num-lessons');
    expect(lessonsContent).toHaveTextContent('20 Lessons');
  });

  it('appends the word Friendly if the difficulty level is Beginner', () => {
    const { view } = renderView({
      difficulty: CourseDifficulty.Beginner,
    });

    const difficultyContent = view.getByTestId('card-difficulty');
    expect(difficultyContent).toHaveTextContent('Beginner Friendly');
  });

  it('displays an image on the full size card', () => {
    const { view } = renderView({
      isFullSize: true,
      imageSrc: image,
    });

    expect(view.getAllByRole('img', { hidden: true })[1]).toHaveAttribute(
      'src',
      image
    );
  });

  it('displays an enrolled state', () => {
    const { view } = renderView({
      enrollmentStatus: EnrollmentStatus.InProgress,
    });

    view.getByText('In progress...');
  });

  it('displays a completed state', () => {
    const { view } = renderView({
      enrollmentStatus: EnrollmentStatus.Completed,
    });

    view.getByText('Course completed!');
  });
});
