import {
  Box,
  FillButton,
  FlexBox,
  GridBox,
  IconButton,
  StrokeButton,
  TextButton,
} from '@codecademy/gamut';
import {
  MiniArrowLeftIcon,
  MiniArrowRightIcon,
  MiniDeleteIcon,
  MiniRibbonIcon,
  SearchIcon,
} from '@codecademy/gamut-icons';
import type { Meta, StoryObj } from '@storybook/react';

// Using FillButton here to show the difference between primary and secondary variants
// however, this could be any Button
const meta: Meta<typeof FillButton> = {
  component: FillButton,
  args: {},
};

export default meta;
type Story = StoryObj<typeof FillButton>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Submit',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Cancel',
  },
};

export const InlineIcons: Story = {
  render: () => (
    <FlexBox gap={16} row>
      <FillButton icon={MiniArrowLeftIcon} maxWidth="fit-content">
        FillButton
      </FillButton>
      <StrokeButton icon={MiniRibbonIcon} maxWidth="fit-content">
        Leading icon
      </StrokeButton>
      <TextButton
        icon={MiniArrowRightIcon}
        iconPosition="right"
        maxWidth="fit-content"
      >
        TextButton
      </TextButton>
    </FlexBox>
  ),
};

const buttons = [FillButton, IconButton, StrokeButton, TextButton] as const;
const variants = ['primary', 'secondary'] as const;
const sizes = ['normal', 'small', 'large'] as const;

const ButtonScale = ({ mode }: { mode: 'dark' | 'light' }) => {
  const grid = buttons.map(({ displayName }) => (
    <Box key={`${displayName}-key`}>{displayName}</Box>
  ));
  variants.forEach((variant: (typeof variants)[number]) => {
    sizes.forEach((size) => {
      buttons.forEach((Component) => {
        const props = {
          key: `${Component.displayName}-${mode}-${variant}-${size}`,
          mode,
          variant,
          size,
          icon: MiniDeleteIcon,
          tip: 'n/a',
        };
        if (Component.displayName === 'IconButton') {
          return grid.push(
            <IconButton
              {...props}
              icon={size === 'small' ? MiniDeleteIcon : SearchIcon}
              tip="Here's a tip!"
            />
          );
        }
        grid.push(<Component {...props}>{mode}</Component>);
      });
    });
  });

  return (
    <GridBox
      alignItems="center"
      bg={mode === 'dark' ? 'navy' : 'white'}
      columnGap={32}
      gridAutoRows="3rem"
      gridTemplateColumns="repeat(4, minmax(50px, max-content))"
      justifyItems="start"
      p={32}
      rowGap={16}
      textColor={mode === 'dark' ? 'white' : 'navy'}
    >
      {grid}
    </GridBox>
  );
};

export const ButtonsLightMode: Story = {
  render: () => <ButtonScale mode="light" />,
};

export const ButtonsDarkMode: Story = {
  render: () => <ButtonScale mode="dark" />,
};
