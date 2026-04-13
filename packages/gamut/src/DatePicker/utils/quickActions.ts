import { QuickAction } from '../Calendar/types';
import { capitalizeFirst } from '../Calendar/utils/format';
import { stringifyLocale } from './locale';
import { DatePickerTranslations } from './translations';

const getRelativeDisplayText = (
  num: number,
  timePeriod: QuickAction['timePeriod'],
  locale: Intl.Locale
) => {
  const rtf = new Intl.RelativeTimeFormat(stringifyLocale(locale), {
    numeric: 'auto',
  });
  return capitalizeFirst(rtf.format(num, timePeriod), locale);
};

export const getDefaultSingleQuickActions = (
  locale: Intl.Locale
): QuickAction[] => [
  {
    num: -1,
    timePeriod: 'day',
    displayText: getRelativeDisplayText(-1, 'day', locale),
  },
  {
    num: 0,
    timePeriod: 'day',
    displayText: getRelativeDisplayText(0, 'day', locale),
  },
  {
    num: 1,
    timePeriod: 'day',
    displayText: getRelativeDisplayText(1, 'day', locale),
  },
];

export const getDefaultRangeQuickActions = (
  translations: Required<DatePickerTranslations>
): QuickAction[] => [
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
 * Computes [start, end] for footer quick actions when `onClick` is omitted.
 * `date` (local calendar day of `now`) is the anchor — returned as `end` unless the range
 * is reordered (see below).
 *
 * **Rolling** offsets (no month/year boundaries):
 * - **day**: `num` days from anchor.
 * - **week**: `num × 7` days.
 * - **month**: `num × 30` days.
 * - **year**: `num × 365` days.
 *
 * **Range mode (`isRange: true`):** if `start` is after the anchor day, returns
 * `{ start: anchor, end: computed }` so the interval runs forward. Otherwise
 * `{ start: computed, end: anchor }` (past through “today”).
 *
 * **Single mode:** same return shape; the calendar uses `start` as the selected day.
 */
export const computeQuickAction = (
  num: number,
  timePeriod: QuickAction['timePeriod'],
  isRange: boolean,
  now = new Date()
) => {
  const date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let start: Date;

  switch (timePeriod) {
    case 'day': {
      start = new Date(date);
      start.setDate(start.getDate() + num);
      break;
    }
    case 'week': {
      start = new Date(date);
      start.setDate(start.getDate() + num * 7);
      break;
    }
    case 'month': {
      start = new Date(date);
      start.setDate(start.getDate() + num * 30);
      break;
    }
    case 'year': {
      start = new Date(date);
      start.setDate(start.getDate() + num * 365);
      break;
    }
  }

  if (isRange && start.getTime() > date.getTime()) {
    return { start: date, end: start };
  }
  return { start, end: date };
};
