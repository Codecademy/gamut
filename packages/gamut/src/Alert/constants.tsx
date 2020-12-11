import {
  AlertIcon,
  CheckCircledIcon,
  DeleteIcon,
  InfoCircleIcon,
  RatingStarCircleIcon,
} from '@codecademy/gamut-icons';

export enum BannerType {
  Notice = 'notice',
  Announcement = 'announcement',
  Error = 'error',
  Info = 'info',
  Success = 'success',
}

export const BANNER_CONFIG = {
  notice: AlertIcon,
  error: DeleteIcon,
  info: InfoCircleIcon,
  announcement: RatingStarCircleIcon,
  success: CheckCircledIcon,
};
