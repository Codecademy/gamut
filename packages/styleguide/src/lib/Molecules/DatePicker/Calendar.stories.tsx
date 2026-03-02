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

    return (
      <Calendar>
        <CalendarHeader
          currentMonthYear={visibleDate}
          onCurrentMonthYearChange={setVisibleDate}
          locale="en-US"
          headingId={headingId}
        />
        <CalendarBody
          visibleDate={visibleDate}
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          labelledById={headingId}
          locale="en-US"
        />
        <CalendarFooter
          onSelectedDateChange={setSelectedDate}
          onCurrentMonthYearChange={setVisibleDate}
        />
      </Calendar>
    );
  },
};
