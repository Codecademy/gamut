import {
  Box,
  FillButton,
  FlexBox,
  FlexBoxProps,
  Popover,
  PopoverProps,
} from '@codecademy/gamut';
import * as patterns from '@codecademy/gamut-patterns';
import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

const meta: Meta<typeof Popover> = {
  component: Popover,
  args: { children: undefined },
  argTypes: {
    pattern: {
      control: 'select',
      options: Object.keys(patterns),
      mapping: patterns,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

type PopoverExampleProps = PopoverProps & Pick<FlexBoxProps, 'p'>;

const PopoverExample = ({ p = 16, ...rest }: PopoverExampleProps) => {
  const [open, setOpen] = useState(false);
  const activeElRef = useRef<HTMLDivElement>(null);
  const toggleOpen = () => setOpen(!open);
  return (
    <>
      <Box ref={activeElRef} width="fit-content">
        <FillButton onClick={toggleOpen}>Open Popover</FillButton>
      </Box>
      <FlexBox>
        <Popover
          {...(rest as any)}
          isOpen={open}
          targetRef={activeElRef}
          onRequestClose={() => setOpen(false)}
        >
          <FlexBox alignItems="flex-start" flexDirection="column" p={p}>
            <Box mb={8}>Hooray!</Box>
            <FillButton size="small" onClick={() => setOpen(false)}>
              Close Popover
            </FillButton>
          </FlexBox>
        </Popover>
      </FlexBox>
    </>
  );
};

export const Default: Story = {
  render: (args) => <PopoverExample {...args} />,
};

export const Beak: Story = {
  render: (args) => <PopoverExample {...args} beak="left" position="below" />,
};

export const BeakCentered: Story = {
  render: (args) => <PopoverExample {...args} beak="center" p={0} />,
};

export const Outline: Story = {
  render: (args) => (
    <PopoverExample {...args} align="right" beak="center" outline />
  ),
};

export const Above: Story = {
  render: (args) => <PopoverExample {...args} beak="center" position="above" />,
};

export const Below: Story = {
  render: (args) => <PopoverExample {...args} beak="center" position="below" />,
};
export const CenterLeft: Story = {
  render: (args) => (
    <PopoverExample
      {...args}
      align="left"
      beak="center"
      pattern={undefined}
      position="center"
    />
  ),
};

export const CenterRight: Story = {
  render: (args) => (
    <PopoverExample
      {...args}
      align="right"
      beak="center"
      pattern={undefined}
      position="center"
    />
  ),
};

export const PopoverCheckerDense: Story = {
  render: (args) => (
    <PopoverExample
      {...args}
      pattern={patterns.CheckerDense}
      position="below"
    />
  ),
};
export const PopoverCheckerLoose: Story = {
  render: (args) => (
    <PopoverExample
      {...args}
      pattern={patterns.CheckerLoose}
      position="below"
    />
  ),
};
export const PopoverCheckerRegular: Story = {
  render: (args) => (
    <PopoverExample
      {...args}
      pattern={patterns.CheckerRegular}
      position="below"
    />
  ),
};
export const PopoverDiagonalADense: Story = {
  render: (args) => (
    <PopoverExample
      {...args}
      pattern={patterns.DiagonalADense}
      position="below"
    />
  ),
};
export const PopoverDiagonalALoose: Story = {
  render: (args) => (
    <PopoverExample
      {...args}
      pattern={patterns.DiagonalALoose}
      position="below"
    />
  ),
};
export const PopoverDiagonalARegular: Story = {
  render: (args) => (
    <PopoverExample
      {...args}
      pattern={patterns.DiagonalARegular}
      position="below"
    />
  ),
};

const PopoverWithoutFocus = (args: PopoverProps) => {
  const [open, setOpen] = useState(false);
  const activeElRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setOpen(!open);

  return (
    <>
      <Box ref={activeElRef}>
        <FillButton onClick={toggleOpen}>Open Popover</FillButton>
      </Box>
      <FlexBox>
        <Popover
          {...(args as any)}
          isOpen={open}
          targetRef={activeElRef}
          onRequestClose={() => setOpen(false)}
        >
          <FlexBox alignItems="flex-start" flexDirection="column" p={16}>
            Nothing clickable here but the container has fallback focus
          </FlexBox>
        </Popover>
      </FlexBox>
    </>
  );
};

export const WithoutFocus: Story = {
  render: (args) => <PopoverWithoutFocus {...args} />,
};

export const Animation: Story = {
  render: (args) => <PopoverWithoutFocus animation="fade" {...args} />,
};

export const Variant: Story = {
  render: (args) => (
    <PopoverExample
      {...args}
      align="center"
      beak="left"
      position="above"
      variant="secondary"
    />
  ),
};
