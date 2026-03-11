import {
  Box,
  DatePicker,
  DatePickerCalendar,
  DatePickerInput,
  PopoverContainer,
  useDatePicker,
} from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

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
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          label="Date"
          placeholder="MM/DD/YYYY"
          locale="de-DE"
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
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        label="Date"
        placeholder="MM/DD/YYYY"
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
          mode="range"
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          startLabel="Start date"
          endLabel="End date"
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
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          label="Start date"
          placeholder="MM/DD/YYYY"
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

  return (
    <>
      <Box onClick={openCalendar} width="fit-content">
        <DatePickerInput />
      </Box>
      <PopoverContainer
        isOpen={isCalendarOpen}
        onRequestClose={closeCalendar}
        // targetRef={inputRef}
        alignment="bottom-left"
        invertAxis="x"
        offset={10}
        allowPageInteraction
        focusOnProps={{ autoFocus: false, focusLock: false }}
      >
        <div aria-label="Choose date" id={calendarDialogId} role="dialog">
          <DatePickerCalendar dialogId={calendarDialogId} />
        </div>
      </PopoverContainer>
    </>
  );
}
