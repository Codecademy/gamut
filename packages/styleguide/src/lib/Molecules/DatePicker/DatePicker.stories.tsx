import { Box, DatePicker } from '@codecademy/gamut';
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
          onDateSelect={setSelectedDate}
          label="Date"
          placeholder="MM/DD/YYYY"
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
        onDateSelect={setSelectedDate}
        label="Date"
        placeholder="MM/DD/YYYY"
      />
    );
  },
};
