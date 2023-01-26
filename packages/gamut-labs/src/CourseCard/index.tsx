import { CardProps } from '@codecademy/gamut';

import { ContentGroupBaseCard } from '../ContentGroupBaseCard';
import { CertificateComponent, Divider } from '../ContentGroupBaseCard/shared';
import {
  CourseDifficulty,
  EnrollmentStatus,
} from '../ContentGroupBaseCard/types';
// TODO: handle moduleBasedGatingExperiment logic
// import { moduleBasedGatingExperimentTrackList } from '../CoursePages/CourseLandingPages';

type CourseCardProps = {
  title: string;
  lessonCount: number;
  grantsCertificate: boolean;
  shortDescription?: string | null;
  difficulty?: CourseDifficulty | null;
  enrollmentStatus: EnrollmentStatus;
  pro: boolean;
  isFullSize?: boolean;
  minHeight?: CardProps['minHeight'];
  minWidth?: CardProps['minWidth'];
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
  minHeight,
  minWidth,
}) => {
  // only show certificates for pro exclusive courses, since only pro users can do pro courses & only pro users can gain certificates
  // edge case here: pro users who are logged in wont be able to tell - from the card - that a free course can grant them a cert as well

  // const inModuleBasedGatingExp = moduleBasedGatingExperimentTrackList.includes(
  //   content.slug
  // );

  const inModuleBasedGatingExp = true;

  const showCertificate = grantsCertificate && pro;
  return (
    <ContentGroupBaseCard
      headerBackgroundColor="green-100"
      headingLevel="h3"
      headerText={pro || inModuleBasedGatingExp ? 'Course' : 'Free course'}
      title={title}
      description={shortDescription}
      difficulty={difficulty}
      numLessons={lessonCount}
      isFullSize={isFullSize}
      imageSrc="https://static-assets.codecademy.com/Courses/Course-Cards/pillars.svg"
      enrollmentStatus={enrollmentStatus}
      minHeight={minHeight}
      minWidth={minWidth}
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
