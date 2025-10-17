import { Alert, Box } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

import { ALERTS } from './constants';

const meta: Meta<typeof Alert> = {
  component: Alert,
  args: {},
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    children: 'This is an alert',
    cta: { children: 'Click Me' },
    onClose: () => {},
  },
};

export const General: Story = {
  args: {
    ...ALERTS.general,
  },
};

export const Success: Story = {
  args: {
    ...ALERTS.success,
  },
};

export const Feature: Story = {
  args: {
    ...ALERTS.feature,
  },
};

export const Notice: Story = {
  args: {
    ...ALERTS.notice,
  },
};

export const Error: Story = {
  args: {
    ...ALERTS.error,
  },
};

export const Subtle: Story = {
  args: {
    ...ALERTS.subtle,
  },
};

export const GeneralInline: Story = {
  args: {
    ...ALERTS.general,
    placement: 'inline',
  },
};

export const SuccessInline: Story = {
  args: {
    ...ALERTS.success,
    placement: 'inline',
  },
};

export const FeatureInline: Story = {
  args: {
    ...ALERTS.feature,
    placement: 'inline',
  },
};

export const NoticeInline: Story = {
  args: {
    ...ALERTS.notice,
    placement: 'inline',
  },
};

export const ErrorInline: Story = {
  args: {
    ...ALERTS.error,
    placement: 'inline',
  },
};

export const SubtleInline: Story = {
  args: {
    ...ALERTS.subtle,
    placement: 'inline',
  },
};

export const SmallWidthExample: React.FC = () => {
  return (
    <Box width="400px">
      <Alert cta={{ children: 'Add your name' }} type="general">
        Small Width
      </Alert>
    </Box>
  );
};

export const SmallWidth: Story = {
  render: () => <SmallWidthExample />,
};
