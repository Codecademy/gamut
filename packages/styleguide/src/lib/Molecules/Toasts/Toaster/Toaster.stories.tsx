import { FillButton, GridBox, Toast, Toaster } from '@codecademy/gamut';
import { AddIcon, TrashIcon } from '@codecademy/gamut-icons';
import { Target } from '@codecademy/gamut-illustrations';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof Toaster> = {
  component: Toaster,
  // This is a known issue with SB 8, see: https://github.com/storybookjs/storybook/issues/23170
  // Will fix this casting when the issue is resolved
  subcomponents: { Toast: Toast as React.ComponentType<unknown> },
  args: {},
};

export default meta;
type Story = StoryObj<typeof Toaster>;

const exampleToasts = [
  {
    id: 'toast-1',
    icon: 'https://static-assets.codecademy.com/assets/achievements/weekly-streak-4.svg',
    title: 'I have a toast!',
    children: "Here's to us :)",
  },
  {
    id: 'toast-2',
    icon: <Target width="100%" />,
    children:
      'This message can be longer than most as we do not have to worry about a title taking all the space.',
  },
  { id: 'toast-3', title: 'I have a toast!', children: "Here's to us :)" },
  {
    id: 'toast-4',
    children:
      'This message can be longer than most as we do not have to worry about a title or icon taking all the space.',
  },
];

const ToasterExample: React.FC = () => {
  const [toasts, setToasts] = useState<typeof exampleToasts>([]);

  const removeToasts = () => {
    setToasts([]);
  };

  const addToasts = () => {
    if (!toasts.length) {
      setTimeout(() => setToasts(exampleToasts), 1000);
    }
  };

  const removeOne = (id: string) => {
    const filteredToasts = toasts.filter((toast) => toast.id !== id);

    setToasts(filteredToasts);
  };

  return (
    <>
      <GridBox width={300}>
        <FillButton onClick={removeToasts} mb={24} icon={TrashIcon}>
          Click me to remove all the Toasts
        </FillButton>
        <FillButton onClick={addToasts} icon={AddIcon}>
          Click me to reveal all the Toasts
        </FillButton>
      </GridBox>
      <Toaster toasts={toasts} onClose={removeOne} />
    </>
  );
};

export const Default: Story = {
  render: () => <ToasterExample />,
};
