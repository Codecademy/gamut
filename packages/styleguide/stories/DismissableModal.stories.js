import React from 'react';
import { DismissableModal } from '../../gamut-templates';

export default {
  component: DismissableModal,
  title: 'Templates/DismissableModal',
};

export const dismissableModal = () => (
  <>
    <DismissableModal>Dismiss me!</DismissableModal>
  </>
);

dismissableModal.story = {
  name: 'DismissableModal',
};
