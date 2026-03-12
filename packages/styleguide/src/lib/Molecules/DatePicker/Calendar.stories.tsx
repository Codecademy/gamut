import {
  Calendar,
  CalendarBody,
  CalendarFooter,
  CalendarHeader,
} from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';
import { useId, useState } from 'react';

const meta: Meta<typeof Calendar> = {
  component: Calendar,
  title: 'Molecules/DatePicker/Calendar',
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: function CalendarStory() {
    const headingId = useId();
    const [visibleDate, setVisibleDate] = useState(() => new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [focusedDate, setFocusedDate] = useState<Date | null>(
      () => new Date()
    );

    return (
      <Calendar>
        <CalendarHeader
          currentMonthYear={visibleDate}
          headingId={headingId}
          locale="en-US"
          onCurrentMonthYearChange={setVisibleDate}
        />
        <CalendarBody
          focusedDate={focusedDate}
          labelledById={headingId}
          locale="en-US"
          selectedDate={selectedDate}
          visibleDate={visibleDate}
          onDateSelect={setSelectedDate}
          onFocusedDateChange={setFocusedDate}
          onVisibleDateChange={setVisibleDate}
        />
        <CalendarFooter
          onCurrentMonthYearChange={setVisibleDate}
          onSelectedDateChange={setSelectedDate}
        />
      </Calendar>
    );
  },
};
