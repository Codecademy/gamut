import { Box, FillButton, FlexBox, Modal, Text } from '@codecademy/gamut';
import { CodeCelebration } from '@codecademy/gamut-illustrations';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Modal> = {
  component: Modal,
  args: {
    title: 'Modal Modality',
    size: 'small',
    isOpen: true,
    children: 'Waffles a la modal',
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {},
};


export const CustomClose: Story = {
  args: {
    hideCloseButton: true
  }
}

// Views are optional why does TS complain about this?
type WithoutViews = Omit<React.ComponentProps<typeof Modal>, 'views'>;

const ClickOutsideExample = (args: WithoutViews) => {
  return (
    <Modal {...args}>
      <FlexBox center fit>
        <FillButton>Better remember to put me in!</FillButton>
      </FlexBox>
    </Modal>
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

export const Fluid: Story = {
  render: (args: WithoutViews) => (
    <Modal {...args} size="fluid">
      <GridContentPlaceholder height="350px" width="540px" />
    </Modal>
  )
}

export const Large: Story = {
  render: (args: WithoutViews) => (
    <Modal {...args} size="large">
      <GridContentPlaceholder height="300px" width="auto" />
    </Modal>
  )
}

export const Medium: Story = {
  render: (args: WithoutViews) => (
    <Modal {...args} size="medium">
      <GridContentPlaceholder height="240px" width="auto" />
    </Modal>
  )
}

export const Small: Story = {
  render: (args: WithoutViews) => (
    <Modal {...args}>
      <GridContentPlaceholder height="170px" width="auto" />
    </Modal>
  )
}

const ScrollableExample = (args: WithoutViews) => {
  return (
    <Modal {...args} title={undefined} hideCloseButton size='medium' scrollable >
        <FlexBox flexDirection="column">
          <Box height="600px">
            Hello, I&apos;m a very large box... Try zooming in and you&apos;ll be able to
            scroll down to the button!
          </Box>
          <FillButton>Better remember to put me in!</FillButton>
        </FlexBox>
      </Modal>
  )
}

export const Scrollable: Story = {
  render: (args) => <ScrollableExample {...args} />
}

export const MultipleViews: Story = {
  args: {
    title: undefined,
    hideCloseButton: false,
    size: 'medium',
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
  return (
    <Modal {...args}>
      <Text smooth fontSize={14} my={12}>
        Optional 1-2 lines of explanation that provides relevant details.
        Lorem ipsum cras nulla massa odio ligula.
      </Text>
    </Modal>
  )
}

export const WithImage: Story = {
  render: (args) => <WithImageExample {...args} image={<ImageComponent />} />
}
