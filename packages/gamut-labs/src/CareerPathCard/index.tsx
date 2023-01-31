import { CardProps } from '@codecademy/gamut';

import { getPathImageUrl } from '../ContentGroupBaseCard/helpers';
import { ContentGroupBaseCard } from '../ContentGroupBaseCard/index';
import { CertificateComponent, Divider } from '../ContentGroupBaseCard/shared';
import {
  CourseDifficulty,
  EnrollmentStatus,
} from '../ContentGroupBaseCard/types';

type CareerPathCardProps = {
  title: string;
  lessonCount: number;
  enrollmentStatus: EnrollmentStatus;
  shortDescription?: string | null;
  difficulty?: CourseDifficulty | null;
  imageUrl: string;
  courseCount: number;
  isFullSize?: boolean;
  minHeight?: CardProps['minHeight'];
  minWidth?: CardProps['minWidth'];
};

export const CareerPathCard: React.FC<CareerPathCardProps> = ({
  imageUrl,
  courseCount,
  shortDescription,
  difficulty,
  enrollmentStatus,
  lessonCount,
  title,
  isFullSize,
  minHeight,
  minWidth,
}) => {
  return (
    <ContentGroupBaseCard
      headerBackgroundColor="navy"
      headerText="Career path"
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
