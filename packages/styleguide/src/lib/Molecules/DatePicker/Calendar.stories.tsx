import {
  Box,
  CalendarBody,
  CalendarFooter,
  CalendarHeader,
  CalendarWrapper,
} from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';
import { useId, useState } from 'react';

const meta: Meta<typeof CalendarWrapper> = {
  component: CalendarWrapper,
  title: 'Molecules/DatePicker/Calendar',
};

export default meta;

type Story = StoryObj<typeof CalendarWrapper>;

export const Default: Story = {
  render: function CalendarStory() {
    const headingId = useId();
    const [displayDate, setDisplayDate] = useState(() => new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [focusedDate, setFocusedDate] = useState<Date | null>(
      () => new Date()
    );

    return (
      <CalendarWrapper>
        <Box p={24}>
          <CalendarHeader
            displayDate={displayDate}
            headingId={headingId}
            onDisplayDateChange={setDisplayDate}
          />
          <CalendarBody
            displayDate={displayDate}
            focusedDate={focusedDate}
            labelledById={headingId}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            onDisplayDateChange={setDisplayDate}
            onFocusedDateChange={setFocusedDate}
          />
        </Box>
        <CalendarFooter
          showClearButton
          onClearDate={() => setSelectedDate(null)}
          onTodayClick={() => {
            const today = new Date();
            setSelectedDate(today);
            setDisplayDate(today);
            setFocusedDate(today);
          }}
        />
      </CalendarWrapper>
    );
  },
};
