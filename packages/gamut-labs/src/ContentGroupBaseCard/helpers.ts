import { EnrollmentStatus } from './types';

export const getPathImageUrl = (
  enrollment: EnrollmentStatus,
  imageUrl: string
) => {
  if (enrollment === EnrollmentStatus.InProgress) {
    return imageUrl.replace('-inProgress', '');
  }
  if (enrollment === EnrollmentStatus.Completed) {
    return imageUrl.replace('-completed', '');
  }
  return imageUrl;
};
