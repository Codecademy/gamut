import { Dialog } from '@codecademy/gamut';
import { ColorMode } from '@codecademy/gamut-styles';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  args: {
    isOpen: true,
    title: 'Depeche Modal',
    children: 'All I ever wanted, all I ever needed is here in my',
    confirmCta: { children: 'Arms!' },
    cancelCta: { children: 'Heart?' },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  args: {},
};

export const Danger: Story = {
  args: {
    variant: 'danger',
  },
};

export const LightMode: Story = {
  args: {},
}

const DarkModeExample = (args: React.ComponentProps<typeof Dialog>) => {
  return (
    <ColorMode mode="dark">
      <Dialog {...args} />
    </ColorMode>
  )
}


export const DarkMode: Story = {
  render: (args) => <DarkModeExample {...args} />
}
