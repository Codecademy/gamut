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

const storybookLocaleOptions = [
  undefined,
  'en',
  'en-US',
  'en-GB',
  'de-DE',
  'es',
  'es-ES',
  'fr-FR',
  'ja-JP',
  'pt-BR',
  'zh-CN',
  'ko-KR',
  'it-IT',
  'nl-NL',
  'pl-PL',
  'ru-RU',
  'sv-SE',
  'tr-TR',
  'hi-IN',
  'ar',
  'ar-SA',
  'he-IL',
  'th-TH',
] as const;

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  title: 'Organisms/DatePicker',
  args: {
    mode: 'single',
    locale: 'en-US',
  },
  argTypes: {
    mode: {
      description: 'Pick a single date or a range of dates.',
      type: {
        name: 'enum',
        value: ['single', 'range'],
        required: true,
      },
      control: { type: 'radio' },
      table: { type: { summary: "'single' | 'range'" } },
    },
    locale: {
      description:
        'BCP 47 language tag for `Intl` segment order, month names, and quick-action relative dates. `undefined` uses runtime default.',
      control: { type: 'select' },
      options: [...storybookLocaleOptions],
    },
    selectedDate: {
      if: { arg: 'mode', eq: 'single' },
      control: false,
    },
    onSelected: {
      if: { arg: 'mode', eq: 'single' },
      control: false,
    },
    startDate: {
      if: { arg: 'mode', eq: 'range' },
      control: false,
    },
    endDate: {
      if: { arg: 'mode', eq: 'range' },
      control: false,
    },
    onStartSelected: {
      if: { arg: 'mode', eq: 'range' },
      control: false,
    },
    onEndSelected: {
      if: { arg: 'mode', eq: 'range' },
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: function DatePickerStory(args) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    if (args.mode === 'range') {
      return (
        <DatePicker
          {...args}
          endDate={endDate}
          mode="range"
          startDate={startDate}
          onEndSelected={setEndDate}
          onStartSelected={setStartDate}
        />
      );
    }

    return (
      <DatePicker
        {...args}
        mode="single"
        selectedDate={selectedDate}
        onSelected={setSelectedDate}
      />
    );
  },
};

const fixedMode = (mode: 'single' | 'range') =>
  ({
    args: { mode },
    argTypes: {
      mode: { control: false },
    },
  } as const);

export const SingleDate: Story = {
  ...fixedMode('single'),
  render: function DatePickerStory(args) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    return (
      <DatePicker
        {...args}
        mode="single"
        selectedDate={selectedDate}
        onSelected={setSelectedDate}
      />
    );
  },
};

export const Range: Story = {
  ...fixedMode('range'),
  render: function DatePickerStory(args) {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    return (
      <DatePicker
        {...args}
        endDate={endDate}
        mode="range"
        startDate={startDate}
        onEndSelected={setEndDate}
        onStartSelected={setStartDate}
      />
    );
  },
};

export const WithInitialDateSingle: Story = {
  ...fixedMode('single'),
  render: function DatePickerStory(args) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(
      () => new Date(2026, 1, 15)
    );
    return (
      <DatePicker
        {...args}
        mode="single"
        selectedDate={selectedDate}
        onSelected={setSelectedDate}
      />
    );
  },
};

export const WithInitialDateRange: Story = {
  ...fixedMode('range'),
  render: function DatePickerStory(args) {
    const [startDate, setStartDate] = useState<Date | null>(
      () => new Date(2026, 1, 15)
    );
    const [endDate, setEndDate] = useState<Date | null>(
      () => new Date(2026, 1, 20)
    );
    return (
      <DatePicker
        {...args}
        endDate={endDate}
        mode="range"
        startDate={startDate}
        onEndSelected={setEndDate}
        onStartSelected={setStartDate}
      />
    );
  },
};

export const RangeSmall: Story = {
  ...fixedMode('range'),
  args: { inputSize: 'small' },
  render: function DatePickerStory(args) {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    return (
      <DatePicker
        {...args}
        endDate={endDate}
        mode="range"
        startDate={startDate}
        onEndSelected={setEndDate}
        onStartSelected={setStartDate}
      />
    );
  },
};

export const SingleDefaultQuickActions: Story = {
  ...fixedMode('single'),
  render: function DatePickerStory(args) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    return (
      <DatePicker
        {...args}
        mode="single"
        selectedDate={selectedDate}
        onSelected={setSelectedDate}
      />
    );
  },
};

export const RangeDefaultQuickActions: Story = {
  ...fixedMode('range'),
  render: function DatePickerStory(args) {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    return (
      <DatePicker
        {...args}
        endDate={endDate}
        mode="range"
        startDate={startDate}
        onEndSelected={setEndDate}
        onStartSelected={setStartDate}
      />
    );
  },
};

export const SingleNoQuickActions: Story = {
  ...fixedMode('single'),
  args: { quickActions: null },
  render: function DatePickerStory(args) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    return (
      <Box>
        <DatePicker
          {...args}
          mode="single"
          selectedDate={selectedDate}
          onSelected={setSelectedDate}
        />
      </Box>
    );
  },
};

export const RangeNoQuickActions: Story = {
  ...fixedMode('range'),
  args: { quickActions: null },
  render: function DatePickerStory(args) {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    return (
      <DatePicker
        {...args}
        endDate={endDate}
        mode="range"
        startDate={startDate}
        onEndSelected={setEndDate}
        onStartSelected={setStartDate}
      />
    );
  },
};

export const SingleCustomQuickActions: Story = {
  ...fixedMode('single'),
  args: {
    quickActions: [
      { num: -3, timePeriod: 'day', displayText: '3 days ago' },
      { num: 0, timePeriod: 'day', displayText: 'Today' },
      { num: 3, timePeriod: 'day', displayText: 'In 3 days' },
    ],
  },
  render: function DatePickerStory(args) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    return (
      <DatePicker
        {...args}
        mode="single"
        selectedDate={selectedDate}
        onSelected={setSelectedDate}
      />
    );
  },
};

export const RangeCustomQuickActions: Story = {
  ...fixedMode('range'),
  args: {
    quickActions: [
      { num: -7, timePeriod: 'day', displayText: 'Last 7 days' },
      { num: -14, timePeriod: 'day', displayText: 'Last 14 days' },
      { num: -30, timePeriod: 'day', displayText: 'Last 30 days' },
    ],
  },
  render: function DatePickerStory(args) {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    return (
      <DatePicker
        {...args}
        endDate={endDate}
        mode="range"
        startDate={startDate}
        onEndSelected={setEndDate}
        onStartSelected={setStartDate}
      />
    );
  },
};

export const Locale: Story = {
  ...fixedMode('single'),
  args: { locale: 'de-DE' },
  render: function DatePickerStory(args) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    return (
      <DatePicker
        {...args}
        mode="single"
        selectedDate={selectedDate}
        onSelected={setSelectedDate}
      />
    );
  },
};

export const MatchDisabledDates: Story = {
  ...fixedMode('range'),
  args: {
    disableDate: matchDisabledDates([new Date(2026, 3, 22)]),
  },
  render: function DatePickerStory(args) {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    return (
      <DatePicker
        {...args}
        endDate={endDate}
        mode="range"
        startDate={startDate}
        onEndSelected={setEndDate}
        onStartSelected={setStartDate}
      />
    );
  },
};

const calendarDate = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const Range30DayWindowFromStart: Story = {
  ...fixedMode('range'),
  render: function DatePickerStory(args) {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    return (
      <DatePicker
        {...args}
        disableDate={(date) => {
          if (startDate === null) {
            return false;
          }
          const start = calendarDate(startDate);
          const min = new Date(start);
          min.setDate(min.getDate() - 30);
          const max = new Date(start);
          max.setDate(max.getDate() + 30);
          const day = calendarDate(date);
          return day < min || day > max;
        }}
        endDate={endDate}
        mode="range"
        startDate={startDate}
        onEndSelected={setEndDate}
        onStartSelected={setStartDate}
      />
    );
  },
};

export const RangeDisabledBeforeToday: Story = {
  ...fixedMode('range'),
  args: {
    disableDate: (date) => {
      const today = new Date();
      const startOfToday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      return date < startOfToday;
    },
  },
  render: function DatePickerStory(args) {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    return (
      <DatePicker
        {...args}
        endDate={endDate}
        mode="range"
        startDate={startDate}
        onEndSelected={setEndDate}
        onStartSelected={setStartDate}
      />
    );
  },
};

export const RangeDisabledMoreThan30DaysBeforeToday: Story = {
  ...fixedMode('range'),
  args: {
    disableDate: (date) => {
      const today = new Date();
      const thirtyDaysAgo = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 30
      );
      return date < thirtyDaysAgo;
    },
  },
  render: function DatePickerStory(args) {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    return (
      <DatePicker
        {...args}
        endDate={endDate}
        mode="range"
        startDate={startDate}
        onEndSelected={setEndDate}
        onStartSelected={setStartDate}
      />
    );
  },
};

export const RangeDisabledWeekends: Story = {
  ...fixedMode('range'),
  args: {
    disableDate: (date) => date.getDay() === 0 || date.getDay() === 6,
  },
  render: function DatePickerStory(args) {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    return (
      <DatePicker
        {...args}
        endDate={endDate}
        mode="range"
        startDate={startDate}
        onEndSelected={setEndDate}
        onStartSelected={setStartDate}
      />
    );
  },
};

export const Translations: Story = {
  name: 'Translations (Spanish)',
  args: {
    locale: 'es',
    translations: {
      clearButtonText: 'Borrar',
      dateLabel: 'Fecha',
      startDateLabel: 'Fecha de inicio',
      endDateLabel: 'Fecha de fin',
      calendarDialogAriaLabel: 'Elegir fecha',
      last7DaysDisplayText: 'Últimos 7 días',
      last30DaysDisplayText: 'Últimos 30 días',
      last90DaysDisplayText: 'Últimos 90 días',
    },
  },
  render: function DatePickerStory(args) {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    return (
      <DatePicker
        {...args}
        endDate={endDate}
        mode="range"
        startDate={startDate}
        onEndSelected={setEndDate}
        onStartSelected={setStartDate}
      />
    );
  },
};

export const ComposedWithContext: Story = {
  ...fixedMode('single'),
  render: function DatePickerStory(args) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    return (
      <DatePicker
        {...args}
        mode="single"
        selectedDate={selectedDate}
        onSelected={setSelectedDate}
      >
        <ComposedDatePickerLayout />
      </DatePicker>
    );
  },
};

function ComposedDatePickerLayout() {
  const { isCalendarOpen, openCalendar, closeCalendar } = useDatePicker();
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
        <div aria-label="Choose date" id="calendar-dialog" role="dialog">
          <DatePickerCalendar dialogId="calendar-dialog" />
        </div>
      </PopoverContainer>
    </>
  );
}
