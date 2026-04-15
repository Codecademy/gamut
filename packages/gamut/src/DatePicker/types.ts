import { ComponentProps } from 'react';

import { Input } from '../Form/inputs/Input';
import {
  CalendarBodyProps,
  QuickAction,
} from './DatePickerCalendar/Calendar/types';
import { DatePickerTranslations } from './utils/translations';

interface DatePickerBaseProps
  extends Pick<CalendarBodyProps, 'locale' | 'disabledDates'> {
  /** When provided, only the provider is rendered and children compose Input + Calendar. */
  children?: React.ReactNode;
  /** Override default UI strings for internationalization.
   *
   * @default DEFAULT_DATE_PICKER_TRANSLATIONS
   * @see {@link DatePickerTranslations} for the shape of the translations and default values
   * @example
   * ```tsx
   * <DatePicker
   *   translations={{
   *     dateLabel: 'Choose a date',
   *   }}
   * />
   * ```
   */
  translations?: DatePickerTranslations;
  /** Size of the input.
   * @default "base"
   * @see `size` on {@link Input}
   */
  inputSize?: ComponentProps<typeof Input>['size'];
  /**
   * Calendar footer quick actions. Default values are provided based on the mode, but you can pass your own. Only the first 3 quick actions will be displayed.
   * Pass `null` to omit quick actions.
   *
   * @default for single mode: Yesterday, Today, Tomorrow
   * for range mode: Last 7 days, Last 30 days, Last 90 days
   *
   * @see {@link QuickAction} for the shape of the quick actions.
   *
   * @example single mode:
   * ```tsx
   * <DatePicker
   *   quickActions={[
   *     { num: -1, timePeriod: 'day', displayText: 'Yesterday' },
   *     { num: 0, timePeriod: 'day', displayText: 'Today' },
   *     { num: 1, timePeriod: 'day', displayText: 'Tomorrow' },
   *   ]}
   * />
   * ```
   * @example range mode:
   * ```tsx
   * <DatePicker
   *   mode="range"
   *   quickActions={[
   *     { num: -7, timePeriod: 'day', displayText: 'Last 7 days' },
   *     { num: -30, timePeriod: 'day', displayText: 'Last 30 days' },
   *     { num: -90, timePeriod: 'day', displayText: 'Last 90 days' },
   *   ]}
   * ```
   */
  quickActions?: QuickAction[] | null;
}

export interface DatePickerSingleProps extends DatePickerBaseProps {
  mode?: 'single';
  /** Controlled selected date. Pass `null` to not have a default selected date. Pass a `Date` to have a default selected date.
   *
   * @example
   * ```tsx
   * const [selectedDate, setSelectedDate] = useState<Date | null>(null);
   * <DatePicker
   *   selectedDate={selectedDate}
   *   onSelected={setSelectedDate}
   * />
   * ```
   */
  selectedDate: Date | null;
  /** Callback called when the user selects a date. Pass the new date to the callback so the component can update the state.
   *
   * @example
   * ```tsx
   * const [selectedDate, setSelectedDate] = useState<Date | null>(null);
   * <DatePicker
   *   selectedDate={selectedDate}
   *   onSelected={setSelectedDate}
   * />
   * ```
   */
  onSelected: (date: Date | null) => void;
}

export interface DatePickerRangeProps extends DatePickerBaseProps {
  mode: 'range';
  /** Controlled start date. Pass `null` to not have a default start date. Pass a `Date` to have a default start date.
   *
   * @example
   * ```tsx
   * const [startDate, setStartDate] = useState<Date | null>(null);
   * const [endDate, setEndDate] = useState<Date | null>(null);
   *
   * <DatePicker
   *   startDate={startDate}
   *   onStartSelected={setStartDate}
   *   endDate={endDate}
   *   onEndSelected={setEndDate}
   * />
   * ```
   */
  startDate: Date | null;
  /** Controlled end date. Pass `null` to not have a default end date. Pass a `Date` to have a default end date.
   *
   * @example
   * ```tsx
   * const [endDate, setEndDate] = useState<Date | null>(null);
   * const [startDate, setStartDate] = useState<Date | null>(null);
   * <DatePicker
   *   endDate={endDate}
   *   onEndSelected={setEndDate}
   *   startDate={startDate}
   *   onStartSelected={setStartDate}
   * />
   * ```
   */
  endDate: Date | null;
  /** Callback called when the user changes the start date. Pass the new start date to the callback so the component can update the state.
   *
   * @example
   * ```tsx
   * const [startDate, setStartDate] = useState<Date | null>(null);
   * const [endDate, setEndDate] = useState<Date | null>(null);
   * <DatePicker
   *   startDate={startDate}
   *   onStartSelected={setStartDate}
   *   endDate={endDate}
   *   onEndSelected={setEndDate}
   * />
   * ```
   */
  onStartSelected: (date: Date | null) => void;
  /** Callback called when the user changes the end date. Pass the new end date to the callback so the component can update the state.
   *
   * @example
   * ```tsx
   * const [endDate, setEndDate] = useState<Date | null>(null);
   * const [startDate, setStartDate] = useState<Date | null>(null);
   * <DatePicker
   *   endDate={endDate}
   *   onEndSelected={setEndDate}
   *   startDate={startDate}
   *   onStartSelected={setStartDate}
   * />
   * ```
   */
  onEndSelected: (date: Date | null) => void;
}

export type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps;
