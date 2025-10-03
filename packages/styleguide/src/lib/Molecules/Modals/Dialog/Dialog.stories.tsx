import {
  Box,
  Dialog,
  FillButton,
  FlexBox,
  StrokeButton,
  Text,
} from '@codecademy/gamut';
import { ColorMode } from '@codecademy/gamut-styles';
import type { Meta } from '@storybook/react';
import { ComponentProps, useEffect, useRef, useState } from 'react';

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  args: {
    title: 'Depeche Modal',
    children: 'All I ever wanted, all I ever needed is here in my',
    confirmCta: { children: 'Arms!' },
    cancelCta: { children: 'Heart?' },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'danger'],
    },
  },
};

export default meta;

export const Default: React.FC<ComponentProps<typeof Dialog>> = (args) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  useEffect(() => {
    setIsOpen(args.isOpen);
  }, [args.isOpen]);

  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Dialog</FillButton>
      <Dialog
        {...args}
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      />
    </>
  );
};

export const Danger: React.FC<ComponentProps<typeof Dialog>> = (args) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  useEffect(() => {
    setIsOpen(args.isOpen);
  }, [args.isOpen]);

  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Dialog</FillButton>
      <Dialog
        variant="danger"
        {...args}
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      />
    </>
  );
};

export const DarkMode: React.FC<ComponentProps<typeof Dialog>> = (args) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  useEffect(() => {
    setIsOpen(args.isOpen);
  }, [args.isOpen]);

  return (
    <ColorMode mode="dark">
      <FillButton onClick={() => setIsOpen(true)}>Open Dialog</FillButton>
      <Dialog
        {...args}
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      />
    </ColorMode>
  );
};

export const CloseButtonCustomization: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleFocusCloseButton = () => {
    closeButtonRef.current?.focus();
  };

  return (
    <>
      <FlexBox flexDirection="column" gap={16}>
        <FlexBox gap={8}>
          <FillButton onClick={() => setIsOpen(true)}>
            Open Dialog with Custom Close Button
          </FillButton>
        </FlexBox>
      </FlexBox>
      <Dialog
        cancelCta={{ children: 'Cancel' }}
        closeButtonProps={{
          ref: closeButtonRef,
          tip: 'Close this very important Dialog',
          disabled: isDisabled,
        }}
        confirmCta={{ children: 'Confirm' }}
        isOpen={isOpen}
        size="medium"
        title="Close Button Customization Demo"
        onRequestClose={() => setIsOpen(false)}
      >
        <FlexBox flexDirection="column" gap={16} p={16}>
          <Text>
            This dialog has a customized close button with a ref for
            programmatic focus management, a custom tooltip, and a disabled
            state.
          </Text>
          <FillButton disabled={isDisabled} onClick={handleFocusCloseButton}>
            Focus Close Button
          </FillButton>
          <FillButton onClick={() => setIsDisabled(!isDisabled)}>
            {isDisabled ? 'Enable' : 'Disable'} Focus Close Button
          </FillButton>
        </FlexBox>
      </Dialog>
    </>
  );
};

export const CustomClose: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Dialog</FillButton>
      <Dialog
        cancelCta={{ children: 'Cancel' }}
        closeButtonProps={{ hidden: true }}
        confirmCta={{ children: 'Agree' }}
        isOpen={isOpen}
        title="Custom Close"
        onRequestClose={() => setIsOpen(false)}
      >
        <FlexBox column gap={16} m={16}>
          <Box>
            <Text>Missing a close button?</Text>
          </Box>
          <Box>
            <StrokeButton onClick={() => setIsOpen(false)}>
              No problem, click me!
            </StrokeButton>
          </Box>
        </FlexBox>
      </Dialog>
    </>
  );
};

export const FocusManagement: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerFocusRef = useRef<HTMLDivElement>(null);

  const handleFocusDialog = () => {
    containerFocusRef.current?.focus();
  };

  const handleBlurDialog = () => {
    containerFocusRef.current?.blur();
  };

  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>
        Open Modal with Focus Control
      </FillButton>
      <Dialog
        cancelCta={{ children: 'Cancel' }}
        confirmCta={{ children: 'Agree' }}
        containerFocusRef={containerFocusRef}
        isOpen={isOpen}
        size="medium"
        title="Focus Management Demo"
        onRequestClose={() => setIsOpen(false)}
      >
        <FlexBox flexDirection="column" gap={16}>
          <Text>
            This dialog container has a ref that you can interact with
            programmatically.
          </Text>
          <FlexBox gap={8}>
            <FillButton onClick={handleFocusDialog}>
              Focus Dialog Container
            </FillButton>
            <FillButton variant="secondary" onClick={handleBlurDialog}>
              Blur Dialog Container
            </FillButton>
          </FlexBox>
          <Text color="text-disabled" fontSize={14}>
            Try tabbing through the page - the dialog container will maintain
            focus when you click the &quot;Focus Dialog Container&quot; button.
          </Text>
        </FlexBox>
      </Dialog>
    </>
  );
};
