import {
  Box,
  FillButton,
  FlexBox,
  FlexBoxProps,
  Popover,
  PopoverProps,
} from '@codecademy/gamut';
import {
  CheckerDense,
  CheckerLoose,
  CheckerRegular,
  DiagonalADense,
  DiagonalALoose,
  DiagonalARegular,
} from '@codecademy/gamut-patterns';
import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

const meta: Meta<typeof Popover> = {
  component: Popover,
  args: { children: undefined },
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
      <Box ref={activeElRef}>
        <FillButton onClick={toggleOpen}>Open Popover</FillButton>
      </Box>
      <FlexBox>
        <Popover
          {...(rest as any)}
          isOpen={open}
          targetRef={activeElRef}
          onRequestClose={() => setOpen(false)}
        >
          <FlexBox flexDirection="column" p={p} alignItems="flex-start">
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
  render: (args) => <PopoverExample {...args} beak="left" />,
};

export const BeakCentered: Story = {
  render: (args) => <PopoverExample {...args} beak="center" p={0} />,
};

export const Outline: Story = {
  render: (args) => <PopoverExample {...args} outline />,
};

export const Above: Story = {
  render: (args) => (
    <PopoverExample
      {...args}
      position="above"
      align="right"
      horizontalOffset={0}
    />
  ),
};

export const Below: Story = {
  render: (args) => (
    <PopoverExample {...args} align="left" horizontalOffset={0} />
  ),
};
export const Left: Story = {
  render: (args) => (
    <PopoverExample
      {...args}
      align="left"
      position="center"
      horizontalOffset={0}
    />
  ),
};

export const Right: Story = {
  render: (args) => (
    <PopoverExample
      {...args}
      align="right"
      position="center"
      horizontalOffset={40}
    />
  ),
};

export const PopoverCheckerDense: Story = {
  render: (args) => <PopoverExample {...args} pattern={CheckerDense} />,
};
export const PopoverCheckerLoose: Story = {
  render: (args) => <PopoverExample {...args} pattern={CheckerLoose} />,
};
export const PopoverCheckerRegular: Story = {
  render: (args) => <PopoverExample {...args} pattern={CheckerRegular} />,
};
export const PopoverDiagonalADense: Story = {
  render: (args) => <PopoverExample {...args} pattern={DiagonalADense} />,
};
export const PopoverDiagonalALoose: Story = {
  render: (args) => <PopoverExample {...args} pattern={DiagonalALoose} />,
};
export const PopoverDiagonalARegular: Story = {
  render: (args) => <PopoverExample {...args} pattern={DiagonalARegular} />,
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
          <FlexBox flexDirection="column" p={16} alignItems="flex-start">
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
    <PopoverExample align="right" variant="secondary" beak="left" {...args} />
  ),
};
