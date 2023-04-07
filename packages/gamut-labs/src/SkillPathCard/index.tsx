import { ContentGroupBaseCard } from '../ContentGroupBaseCard';
import { getPathImageUrl } from '../ContentGroupBaseCard/helpers';
import {
  CertificateComponent,
  CourseCountComponent,
  Divider,
} from '../ContentGroupBaseCard/shared';
import {
  CourseDifficulty,
  EnrollmentStatus,
} from '../ContentGroupBaseCard/types';

export interface SkillPathCardProps {
  title: string;
  lessonCount: number;
  enrollmentStatus: EnrollmentStatus;
  shortDescription?: string | null;
  difficulty?: CourseDifficulty | null;
  imageUrl: string;
  courseCount: number;
  isFullSize?: boolean;
}

export const SkillPathCard: React.FC<SkillPathCardProps> = ({
  title,
  shortDescription,
  difficulty,
  lessonCount,
  imageUrl,
  courseCount,
  enrollmentStatus,
  isFullSize = false,
}) => {
  return (
    <ContentGroupBaseCard
      headerBackgroundColor="blue-100"
      headerText="Skill path"
      title={title}
      headingLevel="h3"
      description={shortDescription}
      difficulty={difficulty}
      numLessons={lessonCount}
      shadow="outline"
      imageSrc={getPathImageUrl(enrollmentStatus, imageUrl)}
      isFullSize={isFullSize}
      enrollmentStatus={enrollmentStatus}
    >
      <Divider />
      <CourseCountComponent count={courseCount} />
      <Divider />
      <CertificateComponent />
    </ContentGroupBaseCard>
  );
};
