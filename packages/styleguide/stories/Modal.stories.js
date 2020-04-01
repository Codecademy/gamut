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
    <>
      <Button link href="#" onClick={setIsOpen(true)}>
        Click to open the modal!
      </Button>
      <Modal open={isOpen} setIsOpen={closeModal}>
        Close the modal!
      </Modal>
    </>
  );
};

Modal.story = {
  name: 'Modal',
};

export const modal = () => <Modal />;
