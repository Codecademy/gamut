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
import { useCallback, useEffect, useRef, useState } from 'react';

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

const POPOVER_HEIGHT_ESTIMATE = 200; // Estimate for flip calculation
const VIEWPORT_PADDING = 16; // Padding from viewport edge

const PopoverExample = ({
  p = 16,
  position: preferredPosition = 'below',
  ...rest
}: PopoverExampleProps) => {
  const [open, setOpen] = useState(false);
  const [computedPosition, setComputedPosition] = useState<
    'above' | 'below' | 'center'
  >(preferredPosition === 'center' ? 'center' : preferredPosition);
  const [availableHeight, setAvailableHeight] = useState<number | undefined>(
    undefined
  );
  const activeElRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [popoverHeight, setPopoverHeight] = useState(POPOVER_HEIGHT_ESTIMATE);

  const calculatePosition = useCallback(() => {
    const target = activeElRef.current;
    if (!target || preferredPosition === 'center') return;

    const targetRect = target.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const spaceBelow = viewportHeight - targetRect.bottom - VIEWPORT_PADDING;
    const spaceAbove = targetRect.top - VIEWPORT_PADDING;

    // Use measured height if available, otherwise estimate
    const heightToFit = popoverHeight;

    let newPosition: 'above' | 'below' =
      preferredPosition === 'above' ? 'above' : 'below';

    if (preferredPosition === 'below') {
      // Prefer below, but flip to above if not enough space below and more space above
      if (spaceBelow < heightToFit && spaceAbove > spaceBelow) {
        newPosition = 'above';
      } else {
        newPosition = 'below';
      }
    } else if (preferredPosition === 'above') {
      // Prefer above, but flip to below if not enough space above and more space below
      if (spaceAbove < heightToFit && spaceBelow > spaceAbove) {
        newPosition = 'below';
      } else {
        newPosition = 'above';
      }
    }

    setComputedPosition(newPosition);

    // Set max height based on the available space in the computed direction
    const maxAvailableHeight = newPosition === 'below' ? spaceBelow : spaceAbove;
    setAvailableHeight(Math.max(maxAvailableHeight, 100)); // Minimum 100px
  }, [preferredPosition, popoverHeight]);

  // Measure popover height when it opens
  useEffect(() => {
    if (open && popoverRef.current) {
      const { height } = popoverRef.current.getBoundingClientRect();
      if (height > 0) {
        setPopoverHeight(height);
      }
    }
  }, [open]);

  // Recalculate position on open, scroll, or resize
  useEffect(() => {
    if (!open) return;

    calculatePosition();

    window.addEventListener('scroll', calculatePosition, true);
    window.addEventListener('resize', calculatePosition);

    return () => {
      window.removeEventListener('scroll', calculatePosition, true);
      window.removeEventListener('resize', calculatePosition);
    };
  }, [open, calculatePosition]);

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
          popoverContainerRef={popoverRef}
          position={computedPosition}
          targetRef={activeElRef}
          onRequestClose={() => setOpen(false)}
        >
          {/*
            Apply maxHeight and overflow to the content wrapper.
            This makes the popover contents scrollable when they exceed
            the available viewport space.
          */}
          <FlexBox
            alignItems="flex-start"
            flexDirection="column"
            p={p}
            maxHeight={availableHeight ? `${availableHeight}px` as any : undefined}
            overflowY="auto"
          >
            <Box mb={8}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Box>
            <Box mb={8}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Box>
            <Box mb={8}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Box>
            <Box mb={8}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Box>
            <Box mb={8} opacity={0.7}>
              Position: {computedPosition}
              {computedPosition !== preferredPosition && ' (flipped!)'}
              {' | '}
              Max height: {availableHeight ? `${Math.round(availableHeight)}px` : 'auto'}
            </Box>
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
