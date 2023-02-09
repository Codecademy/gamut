import { CardProps } from '@codecademy/gamut';

import { getPathImageUrl } from '../ContentGroupBaseCard/helpers';
import { ContentGroupBaseCard } from '../ContentGroupBaseCard/index';
import {
  CertificateComponent,
  CourseCountComponent,
  Divider,
} from '../ContentGroupBaseCard/shared';
import {
  DifficultyLevel,
  EnrollmentStatus,
} from '../ContentGroupBaseCard/types';

type CareerPathCardProps = {
  title: string;
  lessonCount: number;
  enrollmentStatus: EnrollmentStatus;
  shortDescription?: string | null;
  difficulty?: DifficultyLevel | null;
  hasCareerJourney?: boolean;
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
  hasCareerJourney,
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
      <CertificateComponent professionalCert={!!hasCareerJourney} />
    </ContentGroupBaseCard>
  );
};
