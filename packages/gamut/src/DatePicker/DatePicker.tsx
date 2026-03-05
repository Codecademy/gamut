import { Box } from '../Box';
import { PopoverContainer } from '../PopoverContainer';
import { DatePickerCalendar } from './DatePickerCalendar';
import { DatePickerInput } from './DatePickerInput';
import type { DatePickerProps } from './types';
import { useDatePicker } from './useDatePicker';

/**
 * Single-date DatePicker. With no children, renders the default layout:
 * one DatePickerInput and a calendar in a popover (open via Down Arrow or click).
 * With children, only provides state via useDatePicker; compose DatePickerInput
 * and DatePickerCalendar yourself.
 */
export function DatePicker({
  selectedDate,
  onDateSelect,
  locale,
  disabledDates,
  placeholder,
  label,
  id,
  children,
}: DatePickerProps) {
  const {
    inputProps: rawInputProps,
    calendarProps,
    isCalendarOpen,
    closeCalendar,
    calendarDialogId,
  } = useDatePicker({
    selectedDate,
    onDateSelect,
    locale,
    disabledDates,
  });

  const { inputRef, ...restInputProps } = rawInputProps;

  const inputProps = {
    ...restInputProps,
    placeholder: placeholder ?? rawInputProps.placeholder,
    label: label ?? rawInputProps.label,
    id: id ?? rawInputProps.id,
  };

  if (children !== undefined) {
    return <>{children}</>;
  }

  return (
    <>
      <Box width="fit-content">
        <DatePickerInput {...inputProps} ref={inputRef} />
      </Box>
      <PopoverContainer
        alignment="bottom-left"
        invertAxis="x"
        offset={10}
        allowPageInteraction
        isOpen={isCalendarOpen}
        onRequestClose={closeCalendar}
        targetRef={inputRef}
      >
        <div aria-label="Choose date" id={calendarDialogId} role="dialog">
          <DatePickerCalendar {...calendarProps} dialogId={calendarDialogId} />
        </div>
      </PopoverContainer>
    </>
  );
}
