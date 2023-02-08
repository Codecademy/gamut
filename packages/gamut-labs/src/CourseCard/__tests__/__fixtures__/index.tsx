import {
  DifficultyLevels,
  EnrollmentStatus,
} from '../../../ContentGroupBaseCard/types';
import { CourseCardProps } from '../..';

export const mockFreeCourseContent: CourseCardProps = {
  difficulty: DifficultyLevels.Beginner,
  enrollmentStatus: EnrollmentStatus.None,
  grantsCertificate: false,
  lessonCount: 20,
  pro: false,
  shortDescription: 'This is a free course card.',
  title: 'Free Title 101',
};

export const mockProCourseContent: CourseCardProps = {
  difficulty: DifficultyLevels.Advanced,
  enrollmentStatus: EnrollmentStatus.None,
  grantsCertificate: true,
  lessonCount: 10,
  pro: true,
  shortDescription: 'This is a pro course card.',
  title: 'Pro Title 101',
};
