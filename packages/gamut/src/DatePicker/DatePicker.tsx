import { useCallback, useId, useMemo, useRef, useState } from 'react';

import { FlexBox } from '../Box';
import { PopoverContainer } from '../PopoverContainer';
import { DatePickerCalendar } from './DatePickerCalendar';
import { DatePickerProvider } from './DatePickerContext';
import { DatePickerInput } from './DatePickerInput';
import type {
  DatePickerContextValue,
  DatePickerRangeProps,
  DatePickerProps,
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
  const {
    locale = 'en-US',
    disabledDates = [],
    placeholder,
    mode,
    children,
  } = props;
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dialogId = useId();
  const calendarDialogId = `datepicker-dialog-${dialogId.replace(/:/g, '')}`;

  const openCalendar = useCallback(() => setIsCalendarOpen(true), []);
  const closeCalendar = useCallback(() => {
    setIsCalendarOpen(false);
    inputRef.current?.focus();
  }, []);

  // do we want to refer to this as startDate or selectedDate internally? its the selected date in single mode and the start date in range mode
  const startDate = isRangeProps(props) ? props.startDate : props.selectedDate;
  const endDate = isRangeProps(props) ? props.endDate : null; // null vs undefined?

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

  const contextValue = useMemo<DatePickerContextValue>(
    () => ({
      mode: mode ?? 'single',
      selectedDate: startDate,
      startDate,
      endDate,
      setSelection,
      isCalendarOpen,
      openCalendar,
      closeCalendar,
      locale,
      disabledDates,
      calendarDialogId,
    }),
    [
      mode,
      startDate,
      endDate,
      setSelection,
      isCalendarOpen,
      openCalendar,
      closeCalendar,
      locale,
      disabledDates,
      calendarDialogId,
    ]
  );

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
        <FlexBox width="fit-content" gap={8} wrap>
          {mode === 'range' ? (
            <>
              <DatePickerInput
                rangePart="start"
                placeholder={placeholder}
                label={props.startLabel}
                ref={inputRef}
              />
              <DatePickerInput
                rangePart="end"
                placeholder={placeholder}
                label={props.endLabel}
                // does this need a ref?
              />
            </>
          ) : (
            <DatePickerInput
              placeholder={placeholder}
              label={props.label}
              ref={inputRef}
            />
          )}
        </FlexBox>
        <PopoverContainer
          alignment="bottom-left"
          invertAxis="x"
          offset={10}
          allowPageInteraction
          isOpen={isCalendarOpen}
          onRequestClose={closeCalendar}
          targetRef={inputRef}
          // look into if we can kill this and mess with where we are focusing instead
          focusOnProps={{ autoFocus: false, focusLock: false }} // without this we cant type in the input but there has to be a better way
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
