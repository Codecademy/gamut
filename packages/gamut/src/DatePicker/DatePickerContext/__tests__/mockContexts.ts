import { DEFAULT_DATE_PICKER_TRANSLATIONS } from '../../utils/translations';
import type {
  DatePickerRangeContextValue,
  DatePickerSingleContextValue,
} from '../types';

export function createMockSingleContext(
  overrides: Partial<DatePickerSingleContextValue> = {}
): DatePickerSingleContextValue {
  return {
    mode: 'single',
    locale: new Intl.Locale('en-US'),
    isCalendarOpen: false,
    openCalendar: jest.fn(),
    focusCalendar: jest.fn(),
    focusGridSignal: false,
    gridFocusRequested: false,
    clearGridFocusRequest: jest.fn(),
    closeCalendar: jest.fn(),
    translations: { ...DEFAULT_DATE_PICKER_TRANSLATIONS },
    quickActions: [],
    selectedDate: new Date(2024, 2, 15),
    onSelection: jest.fn(),
    ...overrides,
  };
}

export function createMockRangeContext(
  overrides: Partial<DatePickerRangeContextValue> = {}
): DatePickerRangeContextValue {
  return {
    mode: 'range',
    locale: new Intl.Locale('en-US'),
    isCalendarOpen: false,
    openCalendar: jest.fn(),
    focusCalendar: jest.fn(),
    focusGridSignal: false,
    gridFocusRequested: false,
    clearGridFocusRequest: jest.fn(),
    closeCalendar: jest.fn(),
    translations: { ...DEFAULT_DATE_PICKER_TRANSLATIONS },
    quickActions: [],
    startDate: null,
    endDate: null,
    onRangeSelection: jest.fn(),
    activeRangePart: null,
    setActiveRangePart: jest.fn(),
    ...overrides,
  };
}
