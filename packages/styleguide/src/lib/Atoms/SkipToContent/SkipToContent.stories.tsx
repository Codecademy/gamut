import { SkipToContent } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SkipToContent> = {
  component: SkipToContent,
  args: {},
};

export default meta;
type Story = StoryObj<typeof SkipToContent>;

export const Default: Story = {
  args: { contentId: 'main-content' },
};
