import { DelayedRenderWrapper } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof DelayedRenderWrapper> = {
 component: DelayedRenderWrapper,
 args: {},
};

export default meta;
type Story = StoryObj<typeof DelayedRenderWrapper>;

export const Default: Story = {
 args: {
   children: 'Test'
 },
};

export const Secondary: Story = {
 args: {
   children: 'Test again',
   variant: 'secondary'
 }
};
