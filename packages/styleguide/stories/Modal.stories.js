import React from 'react';
import { Modal } from '../../gamut-templates';
import { Button } from '../../gamut/src';

export default {
  component: Modal,
  title: 'Templates/Modal',
};

export const modal = () => (
  <>
    <Modal
      modalOpener={
        <Button link href="#">
          Click this to open the modal!
        </Button>
      }
    >
      Close the modal!
    </Modal>
  </>
);

Modal.story = {
  name: 'Modal',
};
