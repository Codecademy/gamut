import { FloatingCard } from '@codecademy/gamut';
import { DotDense } from '@codecademy/gamut-patterns';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof FloatingCard> = {
  component: FloatingCard,
  args: {
    children: "Yakety Yak don't don't talk back!",
  },
};

export default meta;
type Story = StoryObj<typeof FloatingCard>;

export const Default: Story = {
  args: {},
};

export const BeakBottomLeft: Story = {
  args: {
    beak: 'bottom-left',
    children: 'Beak Bottom Left',
  },
};

export const BeakBottomRight: Story = {
  args: {
    beak: 'bottom-right',
    children: 'Beak Bottom Right',
  },
};

export const BeakTopLeft: Story = {
  args: {
    beak: 'top-left',
    children: 'Beak Top Left',
  },
};

export const BeakTopRight: Story = {
  args: {
    beak: 'top-right',
    children: 'Beak Top Right',
  },
};

export const ShadowBottomLeft: Story = {
  args: {
    shadow: 'bottomLeft',
    children: 'Shadow Bottom Left',
  },
};

export const ShadowBottomRight: Story = {
  args: {
    shadow: 'bottomRight',
    children: 'Shadow Bottom Right',
  },
};

export const ShadowPattern: Story = {
  args: {
    pattern: DotDense,
  },
};
