import React, { useState } from 'react';
import { Button, Modal } from '@codecademy/gamut/src';
import { decoratedStory } from '../Templating';

export default decoratedStory('Molecules', Modal);

const ModalStory = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button link onClick={() => setIsOpen(true)}>
        Click to open the modal!
      </Button>
      <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
        Close the modal!
      </Modal>
    </div>
  );
};

const ModalWithoutDefaultCloseButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button link onClick={() => setIsOpen(true)}>
        Click to open the modal!
      </Button>
      <Modal isOpen={isOpen} hideDefaultCloseButton>
        Close the modal...
        <button type="button" onClick={() => setIsOpen(false)}>
          with this button instead
        </button>
      </Modal>
    </div>
  );
};

ModalWithoutDefaultCloseButton.story = {
  name: 'Modal Without Default Close Button',
};

export const modal = () => <ModalStory />;
export const modalWithoutDefaultCloseButton = () => (
  <ModalWithoutDefaultCloseButton />
);
