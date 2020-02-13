import React from 'react';
import { Toast } from '../../gamut-templates/src';
import { AlertIcon } from '../../gamut/src';

export default {
  component: Toast,
  title: 'Templates/Toast',
};

export const genericToast = () => (
  <Toast icon={<AlertIcon />}>Hello World</Toast>
);

genericToast.story = {
  name: 'Generic Toast',
  description: `Here's to us`,
};
