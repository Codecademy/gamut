import React, { useState } from 'react';
import { Button, Modal } from '@codecademy/gamut/src';
import { decoratedStories, decoratedStory } from '../Templating';

export default decoratedStories('Molecules', Modal);

const ModalStory = decoratedStory(() => {
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
});

const ModalWithoutDefaultCloseButton = decoratedStory(() => {
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
});

ModalWithoutDefaultCloseButton.story = {
  name: 'Modal Without Default Close Button',
};

export const modal = decoratedStory(() => <ModalStory />);
export const modalWithoutDefaultCloseButton = decoratedStory(() => (
  <ModalWithoutDefaultCloseButton />
));
