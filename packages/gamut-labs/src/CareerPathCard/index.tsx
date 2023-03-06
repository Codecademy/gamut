import { Text } from '@codecademy/gamut';

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
  SalaryRange,
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
  salary?: SalaryRange;
};

const SalaryComponent: React.FC<SalaryRange> = ({ lowerBound, upperBound }) => {
  return (
    <Text variant="p-small">
      Average Salary (US){' '}
      <b>
        ${lowerBound / 1000}K - {upperBound / 1000}K
      </b>
    </Text>
  );
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
  salary,
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
      {salary ? (
        <>
          <SalaryComponent
            lowerBound={salary.lowerBound}
            upperBound={salary.upperBound}
          />
        </>
      ) : (
        <>
          <CourseCountComponent count={courseCount} />
        </>
      )}

      <Divider />
      <CertificateComponent professionalCert={!!hasCareerJourney} />
    </ContentGroupBaseCard>
  );
};
