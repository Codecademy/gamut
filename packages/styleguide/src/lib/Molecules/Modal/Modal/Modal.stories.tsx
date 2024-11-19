import { Box, FillButton, FlexBox, Modal, Text } from '@codecademy/gamut';
import { CodeCelebration } from '@codecademy/gamut-illustrations';
import type { Meta, StoryObj } from '@storybook/react';
import { ReactNode, useState } from 'react';

const meta: Meta<typeof Modal> = {
  component: Modal,
  args: {
    title: 'Modal Modality',
    size: 'small',
    children: 'Waffles a la modal',
  },
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
      <Modal
        isOpen={isOpen}
        {...args}
        onRequestClose={() => setIsOpen(false)}
      >
         Close the Modal!
      </Modal>
    </>
  )
}

export const Default: Story = {
  render: (args) => <ModalExample {...args} />,
};


export const CustomClose: Story = {
  args: {
    hideCloseButton: true
  },
  render: (args) => <ModalExample {...args} />,
}

const ClickOutsideExample = (args: WithoutViews) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Modal</FillButton>
      <Modal {...args} isOpen={isOpen} onRequestClose={() => setIsOpen(false)} hideCloseButton>
        <FlexBox center fit>
          <FillButton onClick={() => setIsOpen(false)}>You can also control the state with this button</FillButton>
        </FlexBox>
      </Modal>
    </>
  );
};

export const ClickOutside: Story = {
  render: (args) => <ClickOutsideExample {...args} />,
};

type StringOrNumber = string | number;

const GridContentPlaceholder = ({height = 'auto', width = 'auto'}: {height: StringOrNumber, width: StringOrNumber}) => {
  return(
    <FlexBox flexDirection='column'>
      <FlexBox mb={12} width='100%' height="2rem" justifyContent='space-between'>
        <Box bg="beige" width="85%" height='inherit' />
        <Box bg="beige" width="10%" height='inherit' />
      </FlexBox>
      <Box height={height} width={width} bg="beige" />
    </FlexBox>
  )
}

const FluidExample = (args: WithoutViews) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Modal</FillButton>
      <Modal
        isOpen={isOpen}
        {...args}
        onRequestClose={() => setIsOpen(false)}
      >
        <GridContentPlaceholder height="350px" width="540px" />
      </Modal>
    </>
  )
}

export const Fluid: Story = {
  args: {size: "fluid"},
  render: (args) => <FluidExample {...args} />,
}

const LargeExample = (args: WithoutViews) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Modal</FillButton>
      <Modal
        isOpen={isOpen}
        {...args}
        onRequestClose={() => setIsOpen(false)}
      >
        <GridContentPlaceholder height="300px" width="auto" />
      </Modal>
    </>
  )
}

export const Large: Story = {
  args: {size: "large"},
  render: (args) => ( <LargeExample {...args} />
  )
}

const MediumExample = (args: WithoutViews) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Modal</FillButton>
      <Modal
        isOpen={isOpen}
        {...args}
        onRequestClose={() => setIsOpen(false)}
      >
        <GridContentPlaceholder height="240px" width="auto" />
      </Modal>
    </>
  )
}

export const Medium: Story = {
  args: {size: "medium"},
  render: (args) => ( <MediumExample {...args} />
  )
}

const SmallExample = (args: WithoutViews) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Modal</FillButton>
      <Modal
        isOpen={isOpen}
        {...args}
        onRequestClose={() => setIsOpen(false)}
      >
        <GridContentPlaceholder height="240px" width="auto" />
      </Modal>
    </>
  )
}

export const Small: Story = {
  args: {size: "small"},
  render: (args) => ( <SmallExample {...args} />
  )
}

const ScrollableExample = (args: WithoutViews) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Modal</FillButton>
      <Modal {...args} title={undefined} hideCloseButton size='medium' isOpen={isOpen} scrollable onRequestClose={() => setIsOpen(false)} >
        <FlexBox flexDirection="column">
          <Box height="600px">
            Hello, I&apos;m a very large box... Try zooming in and you&apos;ll be able to
            scroll down to the button!
          </Box>
          <FillButton>Better remember to put me in!</FillButton>
        </FlexBox>
      </Modal>
    </>
  )
}

export const Scrollable: Story = {
  render: (args) => <ScrollableExample {...args} />
}

const multipleViewsArgs = {
    title: undefined,
    hideCloseButton: false,
    size: 'medium' as const,
    scrollable: true,
    views: [
      {
        title: 'First view',
        nextCta: { children: 'Next' },
        cancelCta: { children: 'Close' },
        children: <>Hey for the first time</>,
      },
      {
        title: 'Second view',
        nextCta: { children: 'Next' },
        cancelCta: { children: 'Close' },
        children: <>Hey for the second time</>,
      },
      {
        title: 'Third view',
        confirmCta: { children: 'Done' },
        cancelCta: { children: 'Close' },
        children: <>Last one</>,
      },
    ],
  }


const MultipleViewsExample = (args: React.ComponentProps<typeof Modal>) => {
  const [isOpen, setIsOpen] = useState(false);
  return(
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Modal</FillButton>
      <Modal
        isOpen={isOpen}
        {...args}
        onRequestClose={() => setIsOpen(false)}
      />
    </>
  )
}

export const MultipleViews: Story = {
  args: multipleViewsArgs,
  render: (args) => <MultipleViewsExample {...args} />
}

const ImageComponent = () => {
  return (
    <FlexBox
      bg="background-primary"
      center
      height="100%"
      p={4}
      width="100%"
    >
      <CodeCelebration height="100%" />
    </FlexBox>
  )
}

const WithImageExample = (args: WithoutViews) => {
  const [isOpen, setIsOpen] = useState(false);
  return(
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Modal</FillButton>
      <Modal
        isOpen={isOpen}
        {...args}
        onRequestClose={() => setIsOpen(false)}
      >
        <Text smooth fontSize={14} my={12}>
          Optional 1-2 lines of explanation that provides relevant details.
          Lorem ipsum cras nulla massa odio ligula.
        </Text>
      </Modal>
    </>
  )
}

export const WithImage: Story = {
  render: (args) => <WithImageExample {...args} image={<ImageComponent />} />
}
