import { CalendarQuickAction } from '../../sharedTypes';
import { stringifyLocale } from '../../utils/locale';
import { DatePickerTranslations } from '../../utils/translations';
import { capitalizeFirst } from '../Calendar/utils/format';

const getRelativeDisplayText = ({
  num,
  timePeriod,
  locale,
}: {
  num: number;
  timePeriod: CalendarQuickAction['timePeriod'];
  locale: Intl.Locale;
}) => {
  const rtf = new Intl.RelativeTimeFormat(stringifyLocale(locale), {
    numeric: 'auto',
  });
  return capitalizeFirst({ str: rtf.format(num, timePeriod), locale });
};

export const getDefaultSingleQuickActions = (
  locale: Intl.Locale
): CalendarQuickAction[] => [
  {
    num: -1,
    timePeriod: 'day',
    displayText: getRelativeDisplayText({
      num: -1,
      timePeriod: 'day',
      locale,
    }),
  },
  {
    num: 0,
    timePeriod: 'day',
    displayText: getRelativeDisplayText({ num: 0, timePeriod: 'day', locale }),
  },
  {
    num: 1,
    timePeriod: 'day',
    displayText: getRelativeDisplayText({ num: 1, timePeriod: 'day', locale }),
  },
];

export const getDefaultRangeQuickActions = (
  translations: Required<DatePickerTranslations>
): CalendarQuickAction[] => [
  {
    num: -7,
    timePeriod: 'day',
    displayText: translations.last7DaysDisplayText,
  },
  {
    num: -30,
    timePeriod: 'day',
    displayText: translations.last30DaysDisplayText,
  },
  {
    num: -90,
    timePeriod: 'day',
    displayText: translations.last90DaysDisplayText,
  },
];

/**
 * Computes `[startDate, endDate]` for footer quick actions when `onClick` is omitted.
 * `anchorDate` (local calendar day of `now`) is the anchor — returned as `endDate` unless the range
 * is reordered (see below).
 *
 * **Rolling** offsets (no month/year boundaries):
 * - **day**: `num` days from anchor.
 * - **week**: `num × 7` days.
 * - **month**: `num × 30` days.
 * - **year**: `num × 365` days.
 *
 * **Range mode (`isRange: true`):** if the computed day is after the anchor day, returns
 * `{ startDate: anchor, endDate: computed }` so the interval runs forward. Otherwise
 * `{ startDate: computed, endDate: anchor }` (past through “today”).
 *
 * **Single mode:** same return shape; the calendar uses `startDate` as the selected day.
 */
export const computeQuickAction = ({
  num,
  timePeriod,
  isRange,
  now = new Date(),
}: {
  num: number;
  timePeriod: CalendarQuickAction['timePeriod'];
  isRange: boolean;
  now?: Date;
}) => {
  const anchorDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let startDate: Date;

  switch (timePeriod) {
    case 'day': {
      startDate = new Date(anchorDate);
      startDate.setDate(startDate.getDate() + num);
      break;
    }
    case 'week': {
      startDate = new Date(anchorDate);
      startDate.setDate(startDate.getDate() + num * 7);
      break;
    }
    case 'month': {
      startDate = new Date(anchorDate);
      startDate.setDate(startDate.getDate() + num * 30);
      break;
    }
    case 'year': {
      startDate = new Date(anchorDate);
      startDate.setDate(startDate.getDate() + num * 365);
      break;
    }
  }

  if (isRange && startDate.getTime() > anchorDate.getTime()) {
    return { startDate: anchorDate, endDate: startDate };
  }
  return { startDate, endDate: anchorDate };
};
