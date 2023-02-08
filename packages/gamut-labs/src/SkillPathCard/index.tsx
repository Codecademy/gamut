import { CardProps } from '@codecademy/gamut';

import { ContentGroupBaseCard } from '../ContentGroupBaseCard';
import { getPathImageUrl } from '../ContentGroupBaseCard/helpers';
import {
  CertificateComponent,
  CourseCountComponent,
  Divider,
} from '../ContentGroupBaseCard/shared';
import {
  DifficultyLevel,
  EnrollmentStatus,
} from '../ContentGroupBaseCard/types';

export interface SkillPathCardProps {
  title: string;
  lessonCount: number;
  enrollmentStatus: EnrollmentStatus;
  shortDescription?: string | null;
  difficulty?: DifficultyLevel | null;
  imageUrl: string;
  courseCount: number;
  isFullSize?: boolean;
  minHeight?: CardProps['minHeight'];
  minWidth?: CardProps['minWidth'];
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
  minHeight,
  minWidth,
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
      minHeight={minHeight}
      minWidth={minWidth}
    >
      <Divider />
      <CourseCountComponent count={courseCount} />
      <Divider />
      <CertificateComponent />
    </ContentGroupBaseCard>
  );
};
