import {
  AlertIcon,
  CloseCircleIcon,
  InfoCircleIcon,
  RatingStarCircleIcon,
  CheckCircledIcon,
} from '@codecademy/gamut-icons';

export const BANNER_CONFIG = {
  alert: AlertIcon,
  error: CloseCircleIcon,
  info: InfoCircleIcon,
  announcement: RatingStarCircleIcon,
  success: CheckCircledIcon,
};
export const CHAR_WIDTH = 7.15;
export const ELLIPSIS_OFFSET = CHAR_WIDTH * 3;
export const ICON_OFFSET = 24;
export const CHARACTER_BUFFER = (ICON_OFFSET + ELLIPSIS_OFFSET) / CHAR_WIDTH;
