import { getPathImageUrl } from '../ContentGroupBaseCard/helpers';
import { ContentGroupBaseCard } from '../ContentGroupBaseCard/index';
import {
  CertificateComponent,
  CourseCountComponent,
  Divider,
} from '../ContentGroupBaseCard/shared';
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
  hasCareerJourney?: boolean;
  imageUrl: string;
  courseCount: number;
  isFullSize?: boolean;
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
    >
      <Divider />
      <CourseCountComponent count={courseCount} />
      <Divider />
      <CertificateComponent professionalCert={!!hasCareerJourney} />
    </ContentGroupBaseCard>
  );
};
