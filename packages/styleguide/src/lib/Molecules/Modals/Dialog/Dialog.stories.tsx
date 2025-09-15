import { Dialog, FillButton } from '@codecademy/gamut';
import { ColorMode } from '@codecademy/gamut-styles';
import type { Meta } from '@storybook/react';
import { ComponentProps, useEffect, useState } from 'react';

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  args: {
    title: 'Depeche Modal',
    children: 'All I ever wanted, all I ever needed is here in my',
    confirmCta: { children: 'Arms!' },
    cancelCta: { children: 'Heart?' },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'danger'],
    },
  },
};

export default meta;

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

export const Danger: React.FC<ComponentProps<typeof Dialog>> = (args) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  useEffect(() => {
    setIsOpen(args.isOpen);
  }, [args.isOpen]);

  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Dialog</FillButton>
      <Dialog
        variant="danger"
        {...args}
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      />
    </>
  );
};

export const DarkMode: React.FC<ComponentProps<typeof Dialog>> = (args) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  useEffect(() => {
    setIsOpen(args.isOpen);
  }, [args.isOpen]);

  return (
    <ColorMode mode="dark">
      <FillButton onClick={() => setIsOpen(true)}>Open Dialog</FillButton>
      <Dialog
        {...args}
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      />
    </ColorMode>
  );
};
