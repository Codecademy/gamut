import { CardProps } from '@codecademy/gamut';

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
  imageUrl: string;
  courseCount: number;
  shortDescription?: string | null;
  difficulty?: CourseDifficulty | null;
  enrollmentStatus: EnrollmentStatus;
  lessonCount: number;
  projectCount: number;
  portfolioProjectCount: number;
  pro: boolean;
  slug: string;
  tag?: string | null;
  title: string;
  categories?: { title: string }[] | null;
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
