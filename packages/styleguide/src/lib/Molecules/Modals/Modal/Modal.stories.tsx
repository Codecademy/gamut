import {
  Box,
  Checkbox,
  FillButton,
  FlexBox,
  Modal,
  Text,
} from '@codecademy/gamut';
import { CodeCelebration } from '@codecademy/gamut-illustrations';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

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

export const CustomClose: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Modal</FillButton>
      <Modal
        {...defaultProps}
        hideCloseButton
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        Close the Modal!
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
        hideCloseButton
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
        mb={12}
        width="100%"
        height="2rem"
        justifyContent="space-between"
      >
        <Box bg="beige" width="85%" height="inherit" />
        <Box bg="beige" width="10%" height="inherit" />
      </FlexBox>
      <Box height={height} width={width} bg="beige" />
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
        size="fluid"
        isOpen={isOpen}
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
        size="large"
        isOpen={isOpen}
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
        size="medium"
        isOpen={isOpen}
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
        size="small"
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <GridContentPlaceholder height="240px" width="auto" />
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
        title={undefined}
        hideCloseButton
        size="medium"
        isOpen={isOpen}
        scrollable
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
        <Text smooth fontSize={14} my={12}>
          Optional 1-2 lines of explanation that provides relevant details.
          Lorem ipsum cras nulla massa odio ligula.
        </Text>
      </Modal>
    </>
  );
};

const multipleViewsArgs = {
  views: [
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
      primaryCta: { actionType: 'done', children: 'Done' },
      secondaryCta: { actionType: 'back', children: 'Back' },
      children: <>Last one</>,
    },
  ],
};

export const MultipleViews: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Modal</FillButton>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        {...multipleViewsArgs}
      />
    </>
  );
};
