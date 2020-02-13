import React from 'react';
import { Toaster } from '../../gamut-templates/src';
import { AlertIcon } from '@codecademy/gamut/src';

export default {
  component: Toaster,
  title: 'Templates/Toaster',
};

const Toasts = [
  {
    id: 'blah',
    icon: <AlertIcon />,
    onClick: () => {},
    onClose: () => {},
    message: 'Hello world',
  },
  {
    id: 'blah2',
    icon: <AlertIcon />,
    onClick: () => {},
    onClose: () => {},
    message: 'Hello world',
  },
  {
    id: 'blah3',
    icon: <AlertIcon />,
    onClick: () => {},
    onClose: () => {},
    message: 'Hello world',
  },
];

export const genericToaster = () => <Toaster toasts={Toasts} />;

genericToaster.story = {
  name: 'Generic Toast',
  description: `Here's to us`,
};
