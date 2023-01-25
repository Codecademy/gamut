import { EnrollmentStatus } from './types';

export const getPathImageUrl = (
  enrollment: EnrollmentStatus,
  imageUrl: string
) => {
  if (enrollment === EnrollmentStatus.InProgress) {
    return imageUrl.replaceAll('-inProgress', '');
  }
  if (enrollment === EnrollmentStatus.Completed) {
    return imageUrl.replaceAll('-completed', '');
  }
  return imageUrl;
};
