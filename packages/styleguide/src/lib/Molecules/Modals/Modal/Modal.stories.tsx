import {
  Box,
  Checkbox,
  FillButton,
  FlexBox,
  Modal,
  StrokeButton,
  Text,
} from '@codecademy/gamut';
import { CodeCelebration } from '@codecademy/gamut-illustrations';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useRef, useState } from 'react';

const defaultProps = {
  title: 'Modal Modality',
  size: 'small' as const,
  children: 'Waffles a la modal',
};
const meta: Meta<typeof Modal> = {
  component: Modal,
  args: defaultProps,
};

export default meta;
type Story = StoryObj<typeof Modal>;

// This could be a SB issue, where Discriminated Unions are not being handled correctly
type WithoutViews = Omit<React.ComponentProps<typeof Modal>, 'views'>;

const ModalExample = (args: WithoutViews) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Modal</FillButton>
      <Modal isOpen={isOpen} {...args} onRequestClose={() => setIsOpen(false)}>
        Close the Modal!
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: (args) => <ModalExample {...args} />,
};

type StringOrNumber = string | number;

const GridContentPlaceholder = ({
  height = 'auto',
  width = 'auto',
}: {
  height: StringOrNumber;
  width: StringOrNumber;
}) => {
  return (
    <FlexBox flexDirection="column">
      <FlexBox
        height="2rem"
        justifyContent="space-between"
        mb={12}
        width="100%"
      >
        <Box bg="beige" height="inherit" width="85%" />
        <Box bg="beige" height="inherit" width="10%" />
      </FlexBox>
      <Box bg="beige" height={height} width={width} />
    </FlexBox>
  );
};

export const Fluid: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Modal</FillButton>
      <Modal
        {...defaultProps}
        isOpen={isOpen}
        size="fluid"
        onRequestClose={() => setIsOpen(false)}
      >
        <GridContentPlaceholder height="350px" width="540px" />
      </Modal>
    </>
  );
};

export const Large: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Modal</FillButton>
      <Modal
        {...defaultProps}
        isOpen={isOpen}
        size="large"
        onRequestClose={() => setIsOpen(false)}
      >
        <GridContentPlaceholder height="300px" width="auto" />
      </Modal>
    </>
  );
};

export const Medium: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Modal</FillButton>
      <Modal
        {...defaultProps}
        isOpen={isOpen}
        size="medium"
        onRequestClose={() => setIsOpen(false)}
      >
        <GridContentPlaceholder height="240px" width="auto" />
      </Modal>
    </>
  );
};

export const Small: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Modal</FillButton>
      <Modal
        {...defaultProps}
        isOpen={isOpen}
        size="small"
        onRequestClose={() => setIsOpen(false)}
      >
        <GridContentPlaceholder height="240px" width="auto" />
      </Modal>
    </>
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
            Open Modal with Custom Close Button
          </FillButton>
        </FlexBox>
      </FlexBox>
      <Modal
        closeButtonProps={{
          ref: closeButtonRef,
          tip: 'Close this very important modal',
          disabled: isDisabled,
        }}
        isOpen={isOpen}
        size="medium"
        title="Close Button Customization Demo"
        onRequestClose={() => setIsOpen(false)}
      >
        <FlexBox flexDirection="column" gap={16}>
          <Text>
            This modal has a customized close button with a ref for programmatic
            focus management, a custom tooltip, and a disabled state.
          </Text>
          <FillButton disabled={isDisabled} onClick={handleFocusCloseButton}>
            Focus Close Button
          </FillButton>
          <FillButton onClick={() => setIsDisabled(!isDisabled)}>
            {isDisabled ? 'Enable' : 'Disable'} Focus Close Button
          </FillButton>
        </FlexBox>
      </Modal>
    </>
  );
};

export const CustomClose: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Modal</FillButton>
      <Modal
        {...defaultProps}
        closeButtonProps={{ hidden: true }}
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <FlexBox flexDirection="column" gap={16}>
          <Box>
            <Text>Close the Modal!</Text>
          </Box>
          <Box>
            <StrokeButton onClick={() => setIsOpen(false)}>Close</StrokeButton>
          </Box>
        </FlexBox>
      </Modal>
    </>
  );
};

export const ClickOutside: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Modal</FillButton>
      <Modal
        {...defaultProps}
        closeButtonProps={{ hidden: true }}
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <FlexBox center fit>
          <FillButton onClick={() => setIsOpen(false)}>
            You can also control the state with this button
          </FillButton>
        </FlexBox>
      </Modal>
    </>
  );
};

export const Scrollable: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Modal</FillButton>
      <Modal
        {...defaultProps}
        closeButtonProps={{ hidden: true }}
        isOpen={isOpen}
        scrollable
        size="medium"
        title={undefined}
        onRequestClose={() => setIsOpen(false)}
      >
        <FlexBox flexDirection="column">
          <Box height="600px">
            Hello, I&apos;m a very large box... Try zooming in and you&apos;ll
            be able to scroll down to the button!
          </Box>
          <FillButton>Better remember to put me in!</FillButton>
        </FlexBox>
      </Modal>
    </>
  );
};

export const FocusManagement: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerFocusRef = useRef<HTMLDivElement>(null);

  const handleFocusModal = () => {
    containerFocusRef.current?.focus();
  };

  const handleBlurModal = () => {
    containerFocusRef.current?.blur();
  };

  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>
        Open Modal with Focus Control
      </FillButton>
      <Modal
        containerFocusRef={containerFocusRef}
        isOpen={isOpen}
        size="medium"
        title="Focus Management Demo"
        onRequestClose={() => setIsOpen(false)}
      >
        <FlexBox flexDirection="column" gap={16}>
          <Text>
            This modal demonstrates programmatic focus control. The modal
            container has a ref that you can interact with programmatically.
          </Text>
          <FlexBox gap={8}>
            <FillButton onClick={handleFocusModal}>
              Focus Modal Container
            </FillButton>
            <FillButton variant="secondary" onClick={handleBlurModal}>
              Blur Modal Container
            </FillButton>
          </FlexBox>
          <Text color="text-disabled" fontSize={14}>
            Try tabbing through the page - the modal container will maintain
            focus when you click the &quot;Focus Modal Container&quot; button.
          </Text>
        </FlexBox>
      </Modal>
    </>
  );
};

const ImageComponent = () => {
  return (
    <FlexBox bg="background-primary" center height="100%" p={4} width="100%">
      <CodeCelebration height="100%" />
    </FlexBox>
  );
};

export const WithImage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Modal</FillButton>
      <Modal
        {...defaultProps}
        image={<ImageComponent />}
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <Text fontSize={14} my={12} smooth>
          Optional 1-2 lines of explanation that provides relevant details.
          Lorem ipsum cras nulla massa odio ligula.
        </Text>
      </Modal>
    </>
  );
};

export const MultipleViews: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Modal</FillButton>
      <Modal
        isOpen={isOpen}
        size="medium"
        views={[
          {
            title: 'First view',
            primaryCta: {
              actionType: 'next',
              children: 'Next',
            },
            secondaryCta: { actionType: 'cancel', children: 'Cancel' },
            children: <>Hey for the first time</>,
          },
          {
            title: 'Second view',
            primaryCta: { actionType: 'next', children: 'Next' },
            secondaryCta: { actionType: 'back', children: 'Back' },
            children: <>Hey for the second time</>,
          },
          {
            title: 'Third view',
            primaryCta: {
              actionType: 'confirm',
              children: 'Done',
              onClick: () => setIsOpen(false),
            },
            secondaryCta: { actionType: 'back', children: 'Back' },
            children: <>Last one</>,
          },
        ]}
        onRequestClose={() => setIsOpen(false)}
      />
    </>
  );
};

export const MultipleViewsDisabled: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Modal</FillButton>
      <Modal
        isOpen={isOpen}
        size="medium"
        views={[
          {
            title: 'First view',
            primaryCta: {
              actionType: 'next',
              children: 'Next',
              disabled: !isChecked,
            },
            secondaryCta: { actionType: 'cancel', children: 'Cancel' },
            children: (
              <FlexBox flexDirection="column" gap={16}>
                <Text>Check the box to enable the Next button</Text>
                <Checkbox
                  aria-label="I agree to the terms"
                  checked={isChecked}
                  htmlFor="terms-checkbox"
                  label="I agree to the terms"
                  onChange={() => setIsChecked(!isChecked)}
                />
              </FlexBox>
            ),
          },
          {
            title: 'Second view',
            primaryCta: {
              actionType: 'confirm',
              children: 'Done',
              onClick: () => setIsOpen(false),
            },
            secondaryCta: { actionType: 'back', children: 'Back' },
            children: <>You made it!</>,
          },
        ]}
        onRequestClose={() => setIsOpen(false)}
      />
    </>
  );
};

export const MultipleViewsDanger: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Modal</FillButton>
      <Modal
        isOpen={isOpen}
        size="medium"
        title="Danger!!"
        views={[
          {
            title: 'First view',
            primaryCta: {
              actionType: 'confirm',
              children: 'Delete',
              variant: 'danger',
              onClick: () => setIsOpen(false),
            },
            secondaryCta: { actionType: 'cancel', children: 'Cancel' },
            children: <>I use the danger variant for the confirm button</>,
          },
        ]}
        onRequestClose={() => setIsOpen(false)}
      />
    </>
  );
};

export const ConfirmationOnClose: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(true);
  const [showConfirmClose, setShowConfirmClose] = useState(false);

  const handleClose = () => {
    if (hasUnsavedChanges) {
      setShowConfirmClose(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleConfirmClose = () => {
    setShowConfirmClose(false);
    setIsOpen(false);
    setHasUnsavedChanges(false);
  };

  const handleCancelClose = () => {
    setShowConfirmClose(false);
  };

  return (
    <>
      <FlexBox flexDirection="column" gap={16}>
        <FlexBox gap={8}>
          <FillButton onClick={() => setIsOpen(true)}>
            Open Modal with Confirmation
          </FillButton>
          <FillButton
            variant="secondary"
            onClick={() => setHasUnsavedChanges(!hasUnsavedChanges)}
          >
            {hasUnsavedChanges ? 'Mark as Saved' : 'Mark as Unsaved'}
          </FillButton>
        </FlexBox>
        <Text color="text-disabled" fontSize={14}>
          Toggle the unsaved state and try closing the modal to see the
          confirmation behavior. <br />
          Current state:{' '}
          {hasUnsavedChanges ? 'Has unsaved changes' : 'All saved'}
        </Text>
      </FlexBox>
      <Modal
        isOpen={isOpen}
        size="medium"
        title="Confirmation on Close Demo"
        onRequestClose={handleClose}
      >
        <FlexBox flexDirection="column" gap={16}>
          <Text>
            This modal shows a confirmation dialog when you try to close it with
            unsaved changes.
          </Text>
          <Text color="text-disabled" fontSize={14}>
            Current state:{' '}
            {hasUnsavedChanges ? 'Has unsaved changes' : 'All saved'}
          </Text>
        </FlexBox>
      </Modal>
      <Modal
        isOpen={showConfirmClose}
        size="small"
        title="Unsaved Changes"
        onRequestClose={handleCancelClose}
      >
        <FlexBox flexDirection="column" gap={16}>
          <Text>You have unsaved changes. Are you sure you want to close?</Text>
          <FlexBox gap={8}>
            <FillButton onClick={handleConfirmClose}>Yes, Close</FillButton>
            <FillButton variant="secondary" onClick={handleCancelClose}>
              Cancel
            </FillButton>
          </FlexBox>
        </FlexBox>
      </Modal>
    </>
  );
};
