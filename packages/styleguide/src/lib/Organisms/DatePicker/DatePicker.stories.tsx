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
  decorators: [
    (Story) => (
      <Box height="500px">
        <Story />
      </Box>
    ),
  ],
  render: function DatePickerStory(args) {
    const description =
      'Select a date from the calendar. Insert any rules or instructions here.';
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    if (args.mode === 'range') {
      return (
        <DatePicker
          {...args}
          description={description}
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
        description={description}
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
  decorators: [
    (Story) => (
      <Box height="500px">
        <Story />
      </Box>
    ),
  ],
  args: { placement: 'inline' },
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
  decorators: [
    (Story) => (
      <Box height="500px">
        <Story />
      </Box>
    ),
  ],
  args: { placement: 'inline' },
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
  args: { placement: 'floating' },
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
  args: { placement: 'floating' },
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

export const FloatingPlacement: Story = {
  ...fixedMode('range'),
  args: { placement: 'floating' },
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

export const RangeSmall: Story = {
  ...fixedMode('range'),
  args: { inputSize: 'small', placement: 'floating' },
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
  args: { placement: 'floating' },
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
  args: { placement: 'floating' },
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
  args: { quickActions: null, placement: 'floating' },
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

export const RangeNoQuickActions: Story = {
  ...fixedMode('range'),
  args: { quickActions: null, placement: 'floating' },
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
    placement: 'floating',
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
    placement: 'floating',
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

export const MatchDisabledDates: Story = {
  ...fixedMode('range'),
  args: {
    disableDate: matchDisabledDates([new Date(2026, 3, 22)]),
    placement: 'floating',
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
  args: { placement: 'floating' },
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
    placement: 'floating',
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
    placement: 'floating',
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
    placement: 'floating',
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
  args: { locale: 'de-DE', placement: 'floating' },
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

export const Translations: Story = {
  ...fixedMode('range'),
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
    placement: 'floating',
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
  args: { placement: 'floating' },
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

const ComposedDatePickerLayout: React.FC = () => {
  const { isCalendarOpen, closeCalendar } = useDatePicker();
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <Box width="fit-content">
        <DatePickerInput ref={inputRef} />
      </Box>
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
        <div aria-label="Choose date" id="calendar-dialog" role="dialog">
          <DatePickerCalendar dialogId="calendar-dialog" />
        </div>
      </PopoverContainer>
    </>
  );
};
