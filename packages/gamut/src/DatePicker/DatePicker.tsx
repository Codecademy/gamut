import { MiniArrowRightIcon } from '@codecademy/gamut-icons';
import { useCallback, useId, useMemo, useRef, useState } from 'react';

import { Box, FlexBox } from '../Box';
import { PopoverContainer } from '../PopoverContainer';
import { DatePickerCalendar } from './DatePickerCalendar';
import { DatePickerProvider } from './DatePickerContext';
import { DatePickerInput } from './DatePickerInput';
import { DEFAULT_DATE_PICKER_TRANSLATIONS } from './translations';
import type {
  DatePickerContextValue,
  DatePickerProps,
  OpenCalendarOptions,
} from './types';
import { isRangeProps } from './utils';

/**
 * DatePicker: single-date or range. Holds shared state and provides it via context.
 * Single: selectedDate, setSelectedDate. Range: startDate, endDate, setStartDate, setEndDate.
 * With no children, renders default layout (input + calendar popover).
 */
export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const {
    locale,
    disabledDates = [],
    placeholder,
    mode,
    children,
    translations: translationsProp,
    inputSize,
  } = props;
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [focusGridSignal, setFocusGridSignal] = useState(false);
  const [gridFocusRequested, setGridFocusRequested] = useState(false);
  const [activeRangePart, setActiveRangePart] = useState<
    'start' | 'end' | null
  >(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dialogId = useId();
  const calendarDialogId = `datepicker-dialog-${dialogId.replace(/:/g, '')}`;

  const clearGridFocusRequest = useCallback(() => {
    setGridFocusRequested(false);
  }, []);

  const openCalendar = useCallback((options?: OpenCalendarOptions) => {
    const moveFocus = options?.moveFocusIntoCalendar ?? false;
    setIsCalendarOpen(true);
    if (moveFocus) {
      setGridFocusRequested(true);
      setFocusGridSignal((signal) => !signal);
    } else {
      setGridFocusRequested(false);
    }
  }, []);

  const focusCalendarGrid = useCallback(() => {
    setGridFocusRequested(true);
    setFocusGridSignal((signal) => !signal);
  }, []);

  const closeCalendar = useCallback(() => {
    setIsCalendarOpen(false);
    setActiveRangePart(null);
    setGridFocusRequested(false);
    inputRef.current?.focus();
  }, []);

  const startOrSelectedDate = isRangeProps(props)
    ? props.startDate
    : props.selectedDate;
  const endDate = isRangeProps(props) ? props.endDate : null;

  const setSelection = useCallback(
    (start: Date | null, end?: Date | null) => {
      if (isRangeProps(props)) {
        props.setStartDate(start);
        props.setEndDate(end ?? null);
      } else {
        props.setSelectedDate(start);
      }
    },
    [props]
  );

  const contextValue = useMemo<DatePickerContextValue>(() => {
    const translations = {
      ...DEFAULT_DATE_PICKER_TRANSLATIONS,
      ...translationsProp,
    };
    const base = {
      startOrSelectedDate,
      setSelection,
      isCalendarOpen,
      openCalendar,
      focusCalendarGrid,
      focusGridSignal,
      gridFocusRequested,
      clearGridFocusRequest,
      closeCalendar,
      locale,
      disabledDates,
      calendarDialogId,
      translations,
    };
    return mode === 'range'
      ? {
          ...base,
          mode: 'range',
          endDate,
          activeRangePart,
          setActiveRangePart,
        }
      : { ...base, mode: 'single' };
  }, [
    mode,
    startOrSelectedDate,
    endDate,
    setSelection,
    activeRangePart,
    setActiveRangePart,
    isCalendarOpen,
    openCalendar,
    focusCalendarGrid,
    focusGridSignal,
    gridFocusRequested,
    clearGridFocusRequest,
    closeCalendar,
    locale,
    disabledDates,
    calendarDialogId,
    translationsProp,
  ]);

  const content =
    children !== undefined ? (
      children
    ) : (
      <>
        <FlexBox gap={inputSize === 'small' ? 4 : 8} width="fit-content">
          {mode === 'range' ? (
            <>
              <DatePickerInput
                label={props.startLabel}
                placeholder={placeholder}
                rangePart="start"
                ref={inputRef}
                size={inputSize}
              />
              <Box alignSelf="center" mt={32}>
                <MiniArrowRightIcon />
              </Box>
              <DatePickerInput
                label={props.endLabel}
                placeholder={placeholder}
                rangePart="end"
                size={inputSize}
                // does this need a ref?
              />
            </>
          ) : (
            <DatePickerInput
              label={props.label}
              placeholder={placeholder}
              ref={inputRef}
              size={inputSize}
            />
          )}
        </FlexBox>
        <PopoverContainer
          alignment="bottom-left"
          allowPageInteraction
          focusOnProps={{ autoFocus: false, focusLock: false }}
          invertAxis="x"
          isOpen={isCalendarOpen}
          targetRef={inputRef}
          x={-20}
          y={-16}
          onRequestClose={closeCalendar}
        >
          <div
            aria-label={contextValue.translations.calendarDialogAriaLabel}
            id={calendarDialogId}
            role="dialog"
          >
            <DatePickerCalendar dialogId={calendarDialogId} />
          </div>
        </PopoverContainer>
      </>
    );

  return (
    <DatePickerProvider value={contextValue}>{content}</DatePickerProvider>
  );
};
