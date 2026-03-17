import { useCallback, useId, useMemo, useRef, useState } from 'react';

import { FlexBox } from '../Box';
import { PopoverContainer } from '../PopoverContainer';
import { DatePickerCalendar } from './DatePickerCalendar';
import { DatePickerProvider } from './DatePickerContext';
import { DatePickerInput } from './DatePickerInput';
import type {
  DatePickerContextValue,
  DatePickerProps,
  DatePickerRangeProps,
} from './types';

function isRangeProps(props: DatePickerProps): props is DatePickerRangeProps {
  return props.mode === 'range';
}

/**
 * DatePicker: single-date or range. Holds shared state and provides it via context.
 * Single: selectedDate, setSelectedDate. Range: startDate, endDate, setStartDate, setEndDate.
 * With no children, renders default layout (input + calendar popover).
 */
export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const { locale, disabledDates = [], placeholder, mode, children } = props;
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [activeRangePart, setActiveRangePart] = useState<
    'start' | 'end' | null
  >(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dialogId = useId();
  const calendarDialogId = `datepicker-dialog-${dialogId.replace(/:/g, '')}`;

  const openCalendar = useCallback(() => setIsCalendarOpen(true), []);
  const closeCalendar = useCallback(() => {
    setIsCalendarOpen(false);
    setActiveRangePart(null);
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
    const base = {
      startOrSelectedDate,
      setSelection,
      isCalendarOpen,
      openCalendar,
      closeCalendar,
      locale,
      disabledDates,
      calendarDialogId,
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
    closeCalendar,
    locale,
    disabledDates,
    calendarDialogId,
  ]);

  // what is this doing
  // useEffect(() => {
  //   if (!isCalendarOpen) return;
  //   const id = setTimeout(() => inputRef.current?.focus(), 0);
  //   return () => clearTimeout(id);
  // }, [isCalendarOpen]);

  const content =
    children !== undefined ? (
      children
    ) : (
      <>
        <FlexBox gap={8} width="fit-content" wrap>
          {mode === 'range' ? (
            <>
              <DatePickerInput
                label={props.startLabel}
                placeholder={placeholder}
                rangePart="start"
                ref={inputRef}
              />
              <DatePickerInput
                label={props.endLabel}
                placeholder={placeholder}
                rangePart="end"
                // does this need a ref?
              />
            </>
          ) : (
            <DatePickerInput
              label={props.label}
              placeholder={placeholder}
              ref={inputRef}
            />
          )}
        </FlexBox>
        <PopoverContainer
          alignment="bottom-left"
          allowPageInteraction
          // look into if we can kill this and mess with where we are focusing instead
          focusOnProps={{ autoFocus: false, focusLock: false }}
          invertAxis="x"
          isOpen={isCalendarOpen}
          offset={10}
          targetRef={inputRef}
          onRequestClose={closeCalendar} // without this we cant type in the input but there has to be a better way
        >
          <div aria-label="Choose date" id={calendarDialogId} role="dialog">
            <DatePickerCalendar dialogId={calendarDialogId} />
          </div>
        </PopoverContainer>
      </>
    );

  return (
    <DatePickerProvider value={contextValue}>{content}</DatePickerProvider>
  );
};
