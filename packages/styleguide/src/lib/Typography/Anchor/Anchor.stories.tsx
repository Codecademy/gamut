import { Anchor, Box, GridBox, Text, ToolTip } from '@codecademy/gamut';
import {
  MiniArrowRightIcon,
  MiniInfoOutlineIcon,
} from '@codecademy/gamut-icons';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useRef, useState } from 'react';

import { PolymorphicAnchors, VariantsExample } from './Anchor.examples';

const meta: Meta<typeof Anchor> = {
  component: Anchor,
  args: {
    children: 'Click me',
    href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    icon: MiniInfoOutlineIcon,
    iconPosition: 'left',
    target: '_blank',
    variant: 'inline',
  },
};

export default meta;
type Story = StoryObj<typeof Anchor>;

export const Default: Story = {
  args: {},
};

export const IconAnchor: Story = {
  render: (args) => (
    <GridBox gap={4}>
      <Anchor {...args} href="/" icon={MiniInfoOutlineIcon} iconPosition="left">
        Left-aligned icon anchor
      </Anchor>
      <Anchor
        {...args}
        href="/"
        icon={MiniArrowRightIcon}
        iconPosition="right"
        variant="inline"
      >
        Right-aligned icon anchor
      </Anchor>
    </GridBox>
  ),
};

export const IconAnchorExample: Story = {
  render: (args) => (
    <Text fontSize={14}>
      I started painting as a hobby when I was little. I didn&apos;t know I had
      any talent. I believe talent is just a pursued interest.e{' '}
      <Anchor
        {...args}
        href="/"
        icon={MiniInfoOutlineIcon}
        iconPosition="left"
        variant="inline"
      >
        Anybody can do what I do.
      </Anchor>{' '}
      Just go back and put one little more happy tree in there. Everybody&apos;s
      different.{' '}
      <Anchor
        {...args}
        href="/"
        icon={MiniArrowRightIcon}
        iconPosition="right"
        variant="inline"
      >
        Learn more
      </Anchor>
    </Text>
  ),
};

export const Modes: Story = {
  render: () => <VariantsExample useIcon={false} />,
};

export const IconModes: Story = {
  render: () => <VariantsExample useIcon />,
};

export const PolymorphicAnchor: Story = {
  render: () => <PolymorphicAnchors />,
};

export const TruncateWithTooltip: React.FC<{
  text: string;
  toolTipString: string;
}> = ({ text, toolTipString }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [adjustedText, setAdjustedText] = useState(text);

  const calculateMaxText = (containerWidth: number) => {
    // Assuming an average character width of 8px, adjust as necessary
    const averageCharWidth = 8;
    const maxChars = Math.floor(containerWidth / averageCharWidth);
    return maxChars;
  };

  const [shouldTruncate, setShouldTruncate] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        const maxTextLength = calculateMaxText(width);
        const isTruncated = maxTextLength < text.length;
        if (isTruncated) {
          // Adjust the text to fit within the max length
          const truncatedText = text.slice(0, maxTextLength) + '...';
          setAdjustedText(truncatedText);
        } else {
          setAdjustedText(text);
        }
        setShouldTruncate(isTruncated);
      }
    };
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const anchor = (
    <Anchor href="/" variant="inline">
      {adjustedText}
    </Anchor>
  );

  return (
    <Box ref={containerRef} width={{ _: 300, xs: 450, sm: 600, md: 800 }}>
      {shouldTruncate ? (
        <ToolTip info={toolTipString} placement="floating">
          {anchor}
        </ToolTip>
      ) : (
        anchor
      )}
    </Box>
  );
};

export const TruncateWithToolTipExample: Story = {
  render: () => (
    <TruncateWithTooltip
      text="This is a looooooong text that will be truncated after one line. Hover to see the tooltip. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      toolTipString="Example tooltip"
    />
  ),
};

export const TruncateWithNoToolTipExample: Story = {
  render: () => (
    <TruncateWithTooltip
      text="Maybe a toolTip depending on the screen size. Just a chance? maybe?"
      toolTipString="In case this truncates"
    />
  ),
};
