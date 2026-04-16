import {
  Box,
  DatePicker,
  DatePickerCalendar,
  DatePickerInput,
  matchDisabledDates,
  PopoverContainer,
  useDatePicker,
} from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  title: 'Organisms/DatePicker',
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: function DatePickerStory() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    return (
      <Box>
        <DatePicker
          locale="de-DE"
          mode="single"
          quickActions={null}
          selectedDate={selectedDate}
          translations={{ clearButtonText: 'Löschen' }}
          onSelected={setSelectedDate}
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
        inputSize="small"
        mode="single"
        selectedDate={selectedDate}
        onSelected={setSelectedDate}
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
      <Box>
        <DatePicker
          endDate={endDate}
          mode="range"
          shouldDisableDate={matchDisabledDates([new Date(2026, 3, 22)])}
          startDate={startDate}
          translations={{
            startDateLabel: 'Beginning date',
          }}
          onEndSelected={setEndDate}
          onStartSelected={setStartDate}
        />
      </Box>
    );
  },
};

/** Range mode with footer quick actions (calendar month or rolling days through today). */
export const RangeWithQuickActions: Story = {
  render: function DatePickerStory() {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const today = new Date();
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    return (
      <Box>
        <DatePicker
          endDate={endDate}
          mode="range"
          quickActions={[
            { num: -1, timePeriod: 'month', displayText: 'Last month' },
            { num: -30, timePeriod: 'day', displayText: 'Last 30 days' },
          ]}
          shouldDisableDate={(d) => d < startOfToday}
          startDate={startDate}
          translations={{
            startDateLabel: 'Beginning date',
          }}
          onEndSelected={setEndDate}
          onStartSelected={setStartDate}
        />
      </Box>
    );
  },
};

export const RangeSmall: Story = {
  render: function DatePickerStory() {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    return (
      <Box>
        <DatePicker
          endDate={endDate}
          inputSize="small"
          mode="range"
          shouldDisableDate={matchDisabledDates([new Date(2026, 3, 15)])}
          startDate={startDate}
          translations={{
            startDateLabel: 'Beginning date',
          }}
          onEndSelected={setEndDate}
          onStartSelected={setStartDate}
        />
      </Box>
    );
  },
};

/**
 * Composed usage: DatePicker with `mode="single"` and children provides shared state via context.
 * The child uses useDatePicker() to get open/close and inputRef, then composes
 * DatePickerInput and DatePickerCalendar with a custom PopoverContainer layout.
 */
export const ComposedWithContext: Story = {
  render: function DatePickerStory() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    return (
      <Box p={32}>
        <DatePicker
          mode="single"
          selectedDate={selectedDate}
          onSelected={setSelectedDate}
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
      <Box
        width="fit-content"
        onClick={() => {
          openCalendar();
        }}
      >
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
