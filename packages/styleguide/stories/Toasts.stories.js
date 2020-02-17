import React, { useState, useMemo } from 'react';
import { withKnobs, select, number, boolean } from '@storybook/addon-knobs';
import { Toaster, Toast } from '../../gamut-templates/src';
import { AlertIcon } from '@codecademy/gamut/src';

export default {
  component: Toaster,
  title: 'Templates/Toaster',
  decorators: [withKnobs],
};

const TOASTS = {
  blah: {
    id: 'blah',
    icon: <AlertIcon />,
    message: 'Hello world',
  },
  blah2: {
    id: 'blah2',
    icon: <AlertIcon />,
    message: 'Hello world',
  },
  blah3: {
    id: 'blah3',
    icon: <AlertIcon />,
    message: 'Hello world',
  },
};
const ToastWrapper = () => {
  const [toasts, setToasts] = useState(Object.keys(TOASTS));
  const renderedToasts = useMemo(
    () =>
      toasts.map(toast => {
        return {
          ...TOASTS[toast],
          onClose: () => {
            const nextToasts = toasts.filter(id => id !== toast);
            setToasts(nextToasts);
          },
        };
      }),
    [toasts]
  );
  return <Toaster toasts={renderedToasts} />;
};

export const genericToaster = ToastWrapper;

genericToaster.story = {
  name: 'Toaster',
  description: `Here's to us`,
};

export const genericToast = () => <Toast {...TOASTS[0]}>Hello world</Toast>;

genericToast.story = {
  name: 'Toast Standalone',
  description: 'A toast on the ocean',
};
