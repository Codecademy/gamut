import { Alert, Box, FillButton, FlexBox, Text } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

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

export const SmallWidth: Story = {
  render: () => (
    <Box width="400px">
      <Alert cta={{ children: 'Add your name' }} type="general">
        Small Width
      </Alert>
    </Box>
  ),
};

export const WithCloseButton: Story = {
  args: {
    children: 'This is an alert',
    type: 'general',
    onClose: () => {},
  },
};

export const Dismissible = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return (
      <Box p={16}>
        <Text>Alert has been dismissed!</Text>
        <FillButton onClick={() => setIsVisible(true)}>
          Show Alert Again
        </FillButton>
      </Box>
    );
  }

  return (
    <Alert onClose={() => setIsVisible(false)}>
      This is a dismissible alert. Click the X button to dismiss it!
    </Alert>
  );
};

export const CloseButtonCustomization: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleFocusCloseButton = () => {
    closeButtonRef.current?.focus();
  };

  const handleShowAlert = () => {
    setIsVisible(true);
  };

  return (
    <>
      <FlexBox flexDirection="column" gap={16}>
        <FlexBox gap={8}>
          {!isVisible && (
            <FillButton onClick={handleShowAlert}>
              Show Alert with Custom Close Button
            </FillButton>
          )}
        </FlexBox>
      </FlexBox>
      {isVisible && (
        <Alert
          closeButtonProps={{
            tip: 'Wow, a left-aligned tooltip!',
            ref: closeButtonRef,
            tipAlignment: 'left-center' as const,
          }}
          type="feature"
          onClose={() => setIsVisible(false)}
        >
          <FlexBox flexDirection="column" gap={16}>
            <Text>
              Expand this Alert to see focus controls
            </Text>
            <FlexBox gap={8}>
              <FillButton
                disabled={isDisabled}
                onClick={handleFocusCloseButton}
              >
                Focus Close Button
              </FillButton>
              <FillButton onClick={() => setIsDisabled(!isDisabled)}>
                {isDisabled ? 'Enable' : 'Disable'} Focus Button
              </FillButton>
            </FlexBox>
          </FlexBox>
        </Alert>
      )}
    </>
  );
};
