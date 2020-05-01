import React, { useState } from 'react';
import { Button, Modal } from '@codecademy/gamut/src';
import { decoratedStory } from '../Templating';
import { withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'Gamut|Molecules/Modal',
  component: Modal,
  decorators: [withKnobs],
};

const ModalStory: React.FC = () => {
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

const ModalWithoutDefaultCloseButton: React.FC = () => {
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

export const modal = decoratedStory(() => <ModalStory />, {
  parameters: {
    storyshots: {
      disable: true,
    },
  },
});

export const modalWithoutDefaultCloseButton = decoratedStory(
  () => <ModalWithoutDefaultCloseButton />,
  {
    parameters: {
      storyshots: {
        disable: true,
      },
    },
  }
);
