import { setupRtl } from '@codecademy/gamut-tests';

import {
  CourseDifficulty,
  EnrollmentStatus,
  PathGoalEnum,
} from '../../ContentGroupBaseCard/types';
import { CareerPathCard } from '../index';

const renderView = setupRtl(CareerPathCard);

describe('CareerPathCard', () => {
  it('renders career in header', () => {
    const { view } = renderView({
      type: 'Path',
      enrollmentStatus: EnrollmentStatus.None,
      id: '1',
      lessonCount: 46,
      pro: false,
      slug: 'python-101',
      shortDescription:
        'BI Data Analysts use Python and SQL to query, analyze, and visualize data.',
      difficulty: CourseDifficulty.Beginner,
      title: 'Python 101',
      goal: PathGoalEnum.Career,
      imageUrl:
        'https://static-assets.codecademy.com/components/curriculum/path/front-end-engineer-career-path/curriculum-card.svg',
      courseCount: 18,
      projectCount: 4,
      portfolioProjectCount: 4,
    });
    view.getByText('Career path');
  });
});
