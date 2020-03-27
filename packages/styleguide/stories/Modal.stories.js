import { Modal } from '../../gamut-elements/src';
import React, { useState } from 'react';

export default {
  component: Modal,
  title: 'Component/Modal',
};

const ModalStory = () => {
  const [open, setOpen] = useState(false);

  return (
    <p>
      Modal primitives are controlled components that are told whether
      they&apos;re open by their parent. They&apos;re very basic and don&apos;t
      (yet!) have animations defined.
      <br />
      <br />
      <button onClick={() => setOpen(true)} type="button">
        Open modal
      </button>
      <Modal onOutsideClick={() => alert('Outside clicked.')} isOpen={open}>
        <div style={{ background: 'white', padding: '1rem' }}>
          <h1>Hooray!</h1>
          <button type="button" onClick={() => setOpen(false)}>
            Close modal
          </button>
        </div>
      </Modal>
      <br />
      <br />
      Unlike the existing, legacy Modal implementations in the monolith, this:
      <ul>
        <li>
          always assumes viewport is locked, by making content{' '}
          <code>position: fixed</code>
        </li>
        <li>cannot override contentProps, animation, or shouldFocusOnMount</li>
      </ul>
      <br />
      <br />
      Use this modal only for actual &apos;modal&apos; content that takes up the
      full screen. Do not use it for dropdowns or other small interactive items.
    </p>
  );
};

export const modal = () => <ModalStory />;
