import { Dialog, FillButton } from '@codecademy/gamut';
import { ColorMode } from '@codecademy/gamut-styles';
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps, useEffect, useState } from 'react';

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  args: {
    title: 'Depeche Modal',
    children: 'All I ever wanted, all I ever needed is here in my',
    confirmCta: { children: 'Arms!' },
    cancelCta: { children: 'Heart?' },
    variant: 'primary',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'danger'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: React.FC<ComponentProps<typeof Dialog>> = (args) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  useEffect(() => {
    setIsOpen(args.isOpen);
  }, [args.isOpen]);

  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Dialog</FillButton>
      <Dialog
        {...args}
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      />
    </>
  );
};

export const Danger: Story = {
  args: {
    variant: 'danger',
  },
  render: (args) => <Default {...args} />,
};

export const LightMode: Story = {
  render: (args) => <Default {...args} />,
};

export const DarkMode: Story = {
  render: (args) => (
    <ColorMode mode="dark">
      <Default {...args} />
    </ColorMode>
  ),
};
