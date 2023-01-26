import { CardProps } from '@codecademy/gamut';

// TODO: create type for these content data
import { CourseDataFragment } from '~/typings/generated/monolith';

import { ContentGroupBaseCard } from '../ContentGroupBaseCard';
import { CertificateComponent, Divider } from '../ContentGroupBaseCard/shared';
// TODO: handle moduleBasedGatingExperiment logic
import { moduleBasedGatingExperimentTrackList } from '../CoursePages/CourseLandingPages';

type CourseCardProps = {
  content: CourseDataFragment;
  isFullSize?: boolean;
  minHeight?: CardProps['minHeight'];
  minWidth?: CardProps['minWidth'];
};

export const CourseCard: React.FC<CourseCardProps> = ({
  content,
  isFullSize,
  minHeight,
  minWidth,
}) => {
  const {
    title,
    grantsCertificate,
    shortDescription,
    difficulty,
    lessonCount,
    pro,
    enrollmentStatus,
  } = content;
  // only show certificates for pro exclusive courses, since only pro users can do pro courses & only pro users can gain certificates
  // edge case here: pro users who are logged in wont be able to tell - from the card - that a free course can grant them a cert as well

  const inModuleBasedGatingExp = moduleBasedGatingExperimentTrackList.includes(
    content.slug
  );

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
