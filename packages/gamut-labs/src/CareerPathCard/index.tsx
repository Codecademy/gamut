import { CardProps } from '@codecademy/gamut';

import { getPathImageUrl } from '../ContentGroupBaseCard/helpers';
import { ContentGroupBaseCard } from '../ContentGroupBaseCard/index';
import {
  CertificateComponent,
  CourseCountComponent,
  Divider,
} from '../ContentGroupBaseCard/shared';
import { PathDataFragment } from './types';

type CareerPathCardProps = {
  content: PathDataFragment;
  isFullSize?: boolean;
  minHeight?: CardProps['minHeight'];
  minWidth?: CardProps['minWidth'];
};

export const CareerPathCard: React.FC<CareerPathCardProps> = ({
  content,
  isFullSize = false,
  minHeight,
  minWidth,
}) => {
  const {
    title,
    shortDescription,
    difficulty,
    lessonCount,
    imageUrl,
    courseCount,
    enrollmentStatus,
  } = content;

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
