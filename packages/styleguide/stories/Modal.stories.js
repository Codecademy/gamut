import React from 'react';
import { Modal } from '../../gamut-templates';
import { Button } from '../../gamut/src';

export default {
  component: Modal,
  title: 'Templates/Modal',
};

export const modal = () => <Modal open={true}>Close the modal!</Modal>;

Modal.story = {
  name: 'Modal',
};
