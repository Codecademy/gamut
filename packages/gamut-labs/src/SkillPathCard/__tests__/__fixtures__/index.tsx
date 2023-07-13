import {
  CourseDifficulty,
  EnrollmentStatus,
} from '../../../ContentGroupBaseCard/types';
import { SkillPathCardProps } from '../..';

export const mockSkillPathContent: SkillPathCardProps = {
  difficulty: CourseDifficulty.Intermediate,
  enrollmentStatus: EnrollmentStatus.None,
  courseCount: 5,
  lessonCount: 11,
  shortDescription: 'This is a skill path card.',
  title: 'Skill 101',
  imageUrl:
    'https://static-assets.codecademy.com/components/curriculum/path/code-foundations/curriculum-card.svg',
};
