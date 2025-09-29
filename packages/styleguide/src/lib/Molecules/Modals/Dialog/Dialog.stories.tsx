import { Dialog, FillButton, FlexBox, Text } from '@codecademy/gamut';
import { ColorMode } from '@codecademy/gamut-styles';
import type { Meta } from '@storybook/react';
import { ComponentProps, useEffect, useState, useRef } from 'react';

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

export const CloseButtonDialogCustomization: React.FC = () => {
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
        closeButtonProps={{
          ref: closeButtonRef,
          tip: 'Close this very important Dialog',
          disabled: isDisabled,
        }}
        isOpen={isOpen}
        size="medium"
        title="Close Button Customization Demo"
        onRequestClose={() => setIsOpen(false)}
        confirmCta={{ children: 'Confirm' }}
        cancelCta={{ children: 'Cancel' }}
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
