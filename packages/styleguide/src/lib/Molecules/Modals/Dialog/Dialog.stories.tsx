import { Dialog, FillButton } from '@codecademy/gamut';
import { ColorMode } from '@codecademy/gamut-styles';
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps, useEffect, useState } from 'react';

export const DialogExample: React.FC<ComponentProps<typeof Dialog>> = (
  args
) => {
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

const meta: Meta<typeof DialogExample> = {
  component: DialogExample,
  args: {
    title: 'Depeche Modal',
    children: 'All I ever wanted, all I ever needed is here in my',
    confirmCta: { children: 'Arms!' },
    cancelCta: { children: 'Heart?' },
    variant: 'primary',
  },
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['primary', 'danger'],
      },
      description: 'The visual style variant for the confirm button',
      table: {
        type: { summary: "'primary' | 'danger'" },
        defaultValue: { summary: 'primary' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DialogExample>;

export const Danger: Story = {
  args: {
    variant: 'danger',
  },
};

export const LightMode: Story = {
  args: {},
};

export const DarkMode: Story = {
  args: {},
  render: (args) => (
    <ColorMode mode="dark">
      <DialogExample {...args} />
    </ColorMode>
  ),
};
