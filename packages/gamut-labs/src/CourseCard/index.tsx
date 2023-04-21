import { ContentGroupBaseCard } from '../ContentGroupBaseCard';
import { CertificateComponent, Divider } from '../ContentGroupBaseCard/shared';
import {
  CourseDifficulty,
  EnrollmentStatus,
} from '../ContentGroupBaseCard/types';

export type CourseCardProps = {
  title: string;
  lessonCount: number;
  grantsCertificate: boolean;
  enrollmentStatus: EnrollmentStatus;
  pro: boolean;
  shortDescription?: string | null;
  difficulty?: CourseDifficulty | null;
  isFullSize?: boolean;
};

export const CourseCard: React.FC<CourseCardProps> = ({
  title,
  lessonCount,
  grantsCertificate,
  shortDescription,
  difficulty,
  enrollmentStatus,
  pro,
  isFullSize,
}) => {
  // only show certificates for pro exclusive courses, since only pro users can do pro courses & only pro users can gain certificates
  // edge case here: pro users who are logged in wont be able to tell - from the card - that a free course can grant them a cert as well
  const showCertificate = grantsCertificate && pro;

  return (
    <ContentGroupBaseCard
      headerBackgroundColor="green-100"
      headingLevel="h3"
      headerText={pro ? 'Course' : 'Free course'}
      title={title}
      description={shortDescription}
      difficulty={difficulty}
      numLessons={lessonCount}
      isFullSize={isFullSize}
      imageSrc="https://static-assets.codecademy.com/Courses/Course-Cards/pillars.svg"
      enrollmentStatus={enrollmentStatus}
    >
      {showCertificate && (
        <>
          <Divider />
          <CertificateComponent />
        </>
      )}
    </ContentGroupBaseCard>
  );
};
