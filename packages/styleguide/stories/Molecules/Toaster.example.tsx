import { FillButton, GridBox, Toaster } from '@codecademy/gamut';
import { Target } from '@codecademy/gamut-illustrations';
import { useState } from 'react';
import * as React from 'react';

export const exampleToasts = [
  {
    id: 'toast-1',
    icon:
      'https://static-assets.codecademy.com/assets/achievements/weekly-streak-4.svg',
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

export const ToasterExample: React.FC = () => {
  const [toasts, setToasts] = useState(exampleToasts);

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
        <FillButton onClick={removeToasts} mb={24}>
          Click Me To Remove All Toasts
        </FillButton>
        <FillButton onClick={addToasts}>
          Click Me To Add All Toasts Again
        </FillButton>
      </GridBox>
      <Toaster toasts={toasts} onClose={removeOne} />
    </>
  );
};
