import { setupRtl } from '@codecademy/gamut-tests';

import {
  CourseDifficulty,
  EnrollmentStatus,
} from '../../ContentGroupBaseCard/types';
import { CareerPathCard } from '../index';
import { PathGoalEnum } from '../types';

const content = {
  id: '1',
  title: 'Python 101',
  shortDescription:
    'BI Data Analysts use Python and SQL to query, analyze, and visualize data.',
  difficulty: CourseDifficulty.Beginner,
  lessonCount: 46,
  imageUrl:
    'https://static-assets.codecademy.com/components/curriculum/path/front-end-engineer-career-path/curriculum-card.svg',
  courseCount: 18,
  enrollmentStatus: EnrollmentStatus.None,
  goal: PathGoalEnum.Career,
  projectCount: 4,
  portfolioProjectCount: 4,
  pro: false,
  slug: 'python-101',
  type: 'Path',
};

const renderView = setupRtl(CareerPathCard);

describe('CareerPathCard', () => {
  it('renders career in header', () => {
    const { view } = renderView({
      content,
    });
    view.getByText('Career path');
  });
});
