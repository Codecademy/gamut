import { ProgressBar } from '@codecademy/gamut';
import * as patterns from '@codecademy/gamut-patterns';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
  args: {
    percent: 50,
  },
  argTypes: {
    pattern: {
      control: {
        type: 'select',
      },
      options: Object.keys(patterns),
      mapping: patterns,
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
};

export const Blue: Story = {
  args: {
    variant: 'blue',
  },
};

export const Yellow: Story = {
  args: {
    variant: 'yellow',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    percent: 25,
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    percent: 50,
    variant: 'yellow',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    percent: 75,
    variant: 'blue',
  },
};

export const XL: Story = {
  args: {
    size: 'xl',
    percent: 100,
    variant: 'yellow',
  },
};

export const MinimumPercent: Story = {
  args: {
    percent: 1,
    minimumPercent: 10,
  },
};

export const PatternBackgroundStripesRegular: Story = {
  args: {
    size: 'large',
    variant: 'yellow',
    pattern: patterns.DiagonalARegular,
    percent: 50,
  },
};

export const PatternBackgroundStripesDense: Story = {
  args: {
    size: 'medium',
    variant: 'blue',
    pattern: patterns.DiagonalADense,
    percent: 33,
  },
};

export const FlatTop: Story = {
  args: {
    flat: 'flat-top',
    variant: 'yellow',
    size: 'xl',
    pattern: patterns.DiagonalADense,
    percent: 33,
  },
};

export const FlatBottom: Story = {
  args: {
    flat: 'flat-bottom',
    variant: 'yellow',
    size: 'xl',
    pattern: patterns.DiagonalADense,
    percent: 33,
  },
};
