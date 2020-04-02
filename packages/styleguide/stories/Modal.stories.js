import React, { useState } from 'react';
import { Modal } from '../../gamut-templates';
import { Button } from '../../gamut/src';

export default {
  component: Modal,
  title: 'Templates/Modal',
};

const ModalStory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Button link onClick={() => setIsOpen(true)}>
        Click to open the modal!
      </Button>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        Close the modal!
      </Modal>
    </div>
  );
};

export const modal = () => <ModalStory />;
