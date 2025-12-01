import { ComponentProps, useState } from 'react';

import { FillButton } from '../../Button';
import { Modal } from '../../Modals';
import { InfoTip, InfoTipProps } from '../InfoTip';
import { ToolTip, ToolTipProps } from '../ToolTip';

export const ToolTipMock: React.FC<
  ToolTipProps & ComponentProps<typeof FillButton>
> = ({ info, placement, onClick }) => {
  return (
    <ToolTip id="tip-id" info={info} placement={placement}>
      <FillButton aria-describedby="tip-id" onClick={onClick}>
        Click me
      </FillButton>
    </ToolTip>
  );
};

export const InfoTipInsideModalMock: React.FC<
  Pick<InfoTipProps, 'info' | 'placement'>
> = ({ info, placement }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Modal</FillButton>
      <Modal
        isOpen={isOpen}
        title="Test Modal"
        onRequestClose={() => setIsOpen(false)}
      >
        <InfoTip info={info} placement={placement} />
      </Modal>
    </>
  );
};
