import { setupRtl } from '@codecademy/gamut-tests';

import {
  CourseDifficulty,
  EnrollmentStatus,
} from '../../ContentGroupBaseCard/types';
import { CareerPathCard } from '../index';

const renderView = setupRtl(CareerPathCard, {
  enrollmentStatus: EnrollmentStatus.None,
  lessonCount: 46,
  shortDescription:
    'BI Data Analysts use Python and SQL to query, analyze, and visualize data.',
  difficulty: CourseDifficulty.Beginner,
  title: 'Python 101',
  imageUrl:
    'https://static-assets.codecademy.com/components/curriculum/path/front-end-engineer-career-path/curriculum-card.svg',
  courseCount: 18,
});

describe('CareerPathCard', () => {
  it('renders career in header', () => {
    const { view } = renderView();
    view.getByText('Career path');
  });

  it('renders professional certification if career journey exists for the career', () => {
    const { view } = renderView({ hasCareerJourney: true });
    view.getByText('Professional Certification');
  });

  it('renders certificate for other career paths', () => {
    const { view } = renderView({ hasCareerJourney: false });
    view.getByText('Certificate');
  });

  it('renders salary data when provided', () => {
    const { view } = renderView({
      salary: { upperBound: 200000, lowerBound: 145000 },
    });
    view.getByText('Average Salary (US)');
    view.getByText('$145K - 200K');
  });

  it('does not render course count data when salary data is provided', () => {
    const { view } = renderView({
      salary: { upperBound: 200000, lowerBound: 145000 },
    });
    view.getByText('Average Salary (US)');
    view.getByText('$145K - 200K');
    expect(view.queryByText('18 Courses')).toBeNull();
  });

  it('renders course count data when salary data is not provided', () => {
    const { view } = renderView({});
    view.getByText('18 Courses');
  });

  it('does not render salary information when salary data is not provided', () => {
    const { view } = renderView({});
    expect(view.queryByText('Average Salary (US)')).toBeNull();
  });
});
