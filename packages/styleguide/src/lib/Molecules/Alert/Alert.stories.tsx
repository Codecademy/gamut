import { Alert, Box, StrokeButton } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

import { ALERTS } from './constants'
import { useState } from 'react';


const meta: Meta<typeof Alert> = {
  component: Alert,
  args: {},
};

export default meta;
type Story = StoryObj<typeof Alert>;

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
}

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
}


export const SmallWidthExample: React.FC = () => {
  return (
    <Box width="400px">
      <Alert type="general" cta={{children: 'Add your name'}} >
        Small Width
      </Alert>
    </Box>
  )
}

export const SmallWidth: Story= {
  render: () => <SmallWidthExample />,
}

const TestingWithButtonComponent: React.FC = () => {
  const [isHidden, setIsHidden] = useState(false);
  const toggle = () => setIsHidden(!isHidden);
  return (
    <>
      <StrokeButton onClick={toggle}>Toggle Alert</StrokeButton>
      <Alert type="general" hidden={isHidden} onClose={toggle}>
        Testing with button
      </Alert>
    </>
  );
};

export const TestingWithButton: Story = {
  render: () => <TestingWithButtonComponent />,
}
