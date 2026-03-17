import {
  Box,
  DatePicker,
  DatePickerCalendar,
  DatePickerInput,
  PopoverContainer,
  useDatePicker,
} from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  title: 'Molecules/DatePicker/DatePicker',
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: function DatePickerStory() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    return (
      <Box p={32}>
        <DatePicker
          label="Date"
          locale="de-DE"
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </Box>
    );
  },
};

export const WithInitialDate: Story = {
  render: function DatePickerStory() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(
      () => new Date(2026, 1, 15)
    );
    return (
      <DatePicker
        label="Date"
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    );
  },
};

/** Range mode: two inputs for start and end date. First calendar click sets start, second sets end. */
export const Range: Story = {
  render: function DatePickerStory() {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    return (
      <Box p={32}>
        <DatePicker
          endDate={endDate}
          endLabel="End date"
          mode="range"
          setEndDate={setEndDate}
          setStartDate={setStartDate}
          startDate={startDate}
          startLabel="Start date"
        />
      </Box>
    );
  },
};

/**
 * Composed usage: DatePicker with children provides shared state via context.
 * The child uses useDatePicker() to get open/close and inputRef, then composes
 * DatePickerInput and DatePickerCalendar with a custom PopoverContainer layout.
 */
export const ComposedWithContext: Story = {
  render: function DatePickerStory() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    return (
      <Box p={32}>
        <DatePicker
          label="Start date"
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        >
          <ComposedDatePickerLayout />
        </DatePicker>
      </Box>
    );
  },
};

function ComposedDatePickerLayout() {
  const { isCalendarOpen, openCalendar, closeCalendar, calendarDialogId } =
    useDatePicker();
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <Box width="fit-content" onClick={openCalendar}>
        <DatePickerInput ref={inputRef} />
      </Box>
      <PopoverContainer
        alignment="bottom-left"
        allowPageInteraction
        focusOnProps={{ autoFocus: false, focusLock: false }}
        invertAxis="x"
        isOpen={isCalendarOpen}
        offset={10}
        targetRef={inputRef}
        onRequestClose={closeCalendar}
      >
        <div aria-label="Choose date" id={calendarDialogId} role="dialog">
          <DatePickerCalendar dialogId={calendarDialogId} />
        </div>
      </PopoverContainer>
    </>
  );
}
