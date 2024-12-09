import * as patterns from '@codecademy/gamut-patterns';
import type { Meta, StoryObj } from '@storybook/react';

const Pattern = patterns.DotLoose;

const meta: Meta<typeof Pattern> = {
  component: Pattern,
  args: {},
};

export default meta;
type Story = StoryObj<typeof Pattern>;

export const Default: Story = {
  args: {
    height: 200,
  },
};
