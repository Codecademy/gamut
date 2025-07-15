import {
  Anchor,
  BaseTextProps,
  Box,
  GridBox,
  Text,
  ToolTip,
} from '@codecademy/gamut';
import {
  MiniArrowRightIcon,
  MiniInfoOutlineIcon,
} from '@codecademy/gamut-icons';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';

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

type AnchorAndTextProps = {
  isTruncated: boolean;
  truncateLines?: BaseTextProps['truncateLines'] | undefined;
  children: React.ReactNode;
};

export const AnchorAndText = React.forwardRef<
  HTMLDivElement,
  AnchorAndTextProps
>(({ children, isTruncated, truncateLines }, ref) => {
  return (
    <Anchor href="/" variant="inline">
      {isTruncated && truncateLines ? (
        <Text ref={ref} truncate="ellipsis" truncateLines={truncateLines}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Anchor>
  );
});

export const TruncateWithTooltip: React.FC<{ text: string, toolTipString: string }> = ({ text, toolTipString }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const shouldTruncate = useCallback(() => text.length > 150, [text]);

  const [isTruncated, setIsTruncated] = useState(shouldTruncate());

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      const style = window.getComputedStyle(el);
      const textOverStyle = style.getPropertyValue('text-overflow');
      setIsTruncated(textOverStyle === 'ellipsis');
    }
  }, [shouldTruncate]);

  return (
    <Box width="500px">
      {isTruncated ? (
        <ToolTip info="Example tooltip" placement="floating">
          <AnchorAndText
            isTruncated={isTruncated}
            ref={textRef}
            truncateLines={2}
          >
            {text}
          </AnchorAndText>
        </ToolTip>
      ) : (
        <AnchorAndText isTruncated={false}>{text}</AnchorAndText>
      )}
    </Box>
  );
};

export const TruncateWithToolTipExample: Story = {
  render: () => (
    <TruncateWithTooltip text="This is a looooooong text that will be truncated after two lines. Hover to see the tooltip. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." toolTipString="Example tooltip" />
  ),
};

export const TruncateWithNoToolTipExample: Story = {
  render: () => <TruncateWithTooltip text="No truncation, no tooltip" toolTipString="In case this truncates" />,
};
