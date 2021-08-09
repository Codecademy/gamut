import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import React from 'react';

import { Box } from '../Box';
import { FillButton, IconButton, TextButton } from '../Button';
import { Overlay, OverlayProps } from '../Overlay';
import { Text } from '../Typography';
import { ModalContainer, ModalContainerProps } from './elements';

export interface DialogProps
  extends Pick<
      OverlayProps,
      'isOpen' | 'onRequestClose' | 'clickOutsideCloses' | 'escapeCloses'
    >,
    Pick<ModalContainerProps, 'size'> {
  title: React.ReactNode;
  children: React.ReactNode;
  confirmCta: {
    children: React.ReactNode;
    onClick?: () => void;
  };
  cancelCta?: {
    children: React.ReactNode;
    onClick?: () => void;
  };
}

export const Dialog: React.FC<DialogProps> = ({
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
    <Overlay shroud onRequestClose={onCancel} {...rest}>
      <ModalContainer
        size={size}
        aria-hidden="false"
        aria-modal="true"
        role="dialog"
        layout="dialog"
      >
        <Text as="h2" fontSize={20} lineHeight="base" gridArea="title">
          {title}
        </Text>
        <IconButton
          aria-label="Close Dialog"
          size="small"
          alignSelf="start"
          variant="secondary"
          icon={MiniDeleteIcon}
          onClick={onCancel}
          gridArea="close"
        />
        <Box as="div" gridArea="content" data-testid="dialog-content">
          {children}
        </Box>
        {cancelCta && (
          <TextButton
            {...cancelCta}
            onClick={onCancel}
            justifySelf="end"
            gridArea="cancel"
          />
        )}
        <FillButton {...confirmCta} onClick={onConfirm} gridArea="confirm" />
      </ModalContainer>
    </Overlay>
  );
};
