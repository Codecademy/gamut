import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Box } from '../Box';
import { PopoverContainer } from '../PopoverContainer';
import { DatePickerCalendar } from './DatePickerCalendar';
import { DatePickerProvider } from './DatePickerContext';
import { DatePickerInput } from './DatePickerInput';
import type { DatePickerContextValue, DatePickerProps } from './types';

/**
 * Single-date DatePicker. Holds shared state (selectedDate, isCalendarOpen, inputRef)
 * and provides it via context. DatePickerInput and DatePickerCalendar own their
 * specific state and update this shared state when needed.
 * With no children, renders the default layout (input + calendar popover).
 * With children, renders only children so you can compose the layout yourself.
 */
export function DatePicker({
  selectedDate,
  setSelectedDate,
  locale = 'en-US',
  disabledDates = [],
  placeholder,
  label,
  id,
  children,
}: DatePickerProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dialogId = useId();
  const calendarDialogId = `datepicker-dialog-${dialogId.replace(/:/g, '')}`;

  const openCalendar = useCallback(() => setIsCalendarOpen(true), []);
  const closeCalendar = useCallback(() => {
    setIsCalendarOpen(false);
    inputRef.current?.focus();
  }, []);

  const contextValue = useMemo<DatePickerContextValue>(
    () => ({
      selectedDate,
      setSelectedDate,
      isCalendarOpen,
      openCalendar,
      closeCalendar,
      inputRef,
      locale,
      disabledDates,
      calendarDialogId, // do we need this in context? or just pass it as props? does that defeat the purpose of the context?
    }),
    [
      selectedDate,
      setSelectedDate,
      isCalendarOpen,
      openCalendar,
      closeCalendar,
      locale,
      disabledDates,
      calendarDialogId,
    ]
  );

  useEffect(() => {
    if (!isCalendarOpen) return;
    const id = setTimeout(() => inputRef.current?.focus(), 0);
    return () => clearTimeout(id);
  }, [isCalendarOpen]);

  const content =
    children !== undefined ? (
      children
    ) : (
      <>
        <Box width="fit-content">
          <DatePickerInput
            placeholder={placeholder}
            label={label}
            id={id}
            // ref={inputRef}
          />
        </Box>
        <PopoverContainer
          alignment="bottom-left"
          invertAxis="x"
          offset={10}
          allowPageInteraction
          isOpen={isCalendarOpen}
          onRequestClose={closeCalendar}
          targetRef={inputRef}
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
}
