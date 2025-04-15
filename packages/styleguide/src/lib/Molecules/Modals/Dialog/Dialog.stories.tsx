import { Dialog, FillButton } from '@codecademy/gamut';
import { ColorMode } from '@codecademy/gamut-styles';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  args: {
    title: 'Depeche Modal',
    children: 'All I ever wanted, all I ever needed is here in my',
    confirmCta: { children: 'Arms!' },
    cancelCta: { children: 'Heart?' },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

const DialogExample = (args: React.ComponentProps<typeof Dialog>) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Dialog</FillButton>
      <Dialog isOpen={isOpen} {...args} onRequestClose={() => setIsOpen(false)}>
        Close the Dialog!
      </Dialog>
    </>
  );
};

export const Default: Story = {
  render: (args) => <DialogExample {...args} />,
};

export const Danger: Story = {
  args: {
    variant: 'danger',
  },
  render: (args) => <DialogExample {...args} />,
};

export const LightMode: Story = {
  render: (args) => <DialogExample {...args} />,
};

const DarkModeExample = (args: React.ComponentProps<typeof Dialog>) => {
  return (
    <ColorMode mode="dark">
      <DialogExample {...args} />
    </ColorMode>
  );
};

export const DarkMode: Story = {
  render: (args) => <DarkModeExample {...args} />,
};
