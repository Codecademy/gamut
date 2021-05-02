import { system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { Overlay, OverlayProps } from '../Overlay';
import { Dialog, DialogProps } from './Dialog';

const ShroudedOverlay = styled(Overlay)(system.css({ bg: 'shadow' }));

export interface DialogOverlayProps
  extends DialogProps,
    Pick<
      OverlayProps,
      'isOpen' | 'onRequestClose' | 'clickOutsideCloses' | 'escapeCloses'
    > {}

export const DialogOverlay: React.FC<DialogOverlayProps> = ({
  title,
  children,
  confirmCta,
  cancelCta,
  onRequestClose,
  size = 'small',
  ...rest
}) => {
  const onConfirm = () => {
    onRequestClose();
    confirmCta.onClick?.();
  };

  const onCancel = () => {
    onRequestClose();
    cancelCta?.onClick?.();
  };

  return (
    <ShroudedOverlay onRequestClose={onCancel} {...rest}>
      <Dialog
        title={title}
        size={size}
        confirmCta={{ ...confirmCta, onClick: onConfirm }}
        cancelCta={{ ...cancelCta, onClick: onCancel } as any}
      >
        {children}
      </Dialog>
    </ShroudedOverlay>
  );
};
