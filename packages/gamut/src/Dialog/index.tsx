import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { Box } from '../Box';
import { FillButton, IconButton, TextButton } from '../Button';
import { Overlay, OverlayProps } from '../Overlay';
import { Pattern } from '../Pattern';
import { Text } from '../Typography';

const ShroudedOverlay = styled(Overlay)(system.css({ bg: 'shadow' }));

const ModalWrapper = styled.div(
  system.css({
    position: 'relative',
    zIndex: 1,
    maxWidth: 'calc(100vw - 2rem)',
    borderRadius: '2px',
  })
);

/** This will need to be consolidated with Card / CoachMark / Toast  */
const ModalShadow = styled(Pattern)(
  system.css({
    textColor: 'text',
    width: 1,
    height: 1,
    position: 'absolute',
    top: '.5rem',
    left: '-.5rem',
  })
);

const ModalBody = styled.div(
  system.css({
    border: 1,
    position: 'relative',
    bg: 'background',
    textColor: 'text',
    display: 'grid',
    p: 24,
    rowGap: 12,
    columnGap: 16,
    gridTemplateColumns: '1fr min-content 2rem',
    gridTemplateRows: 'repeact(3, auto)',
    gridTemplateAreas: `'title title close'
    'content content content'
    'cancel confirm confirm'`,
  })
);

export interface DialogProps
  extends Pick<OverlayProps, 'clickOutsideCloses' | 'escapeCloses'> {
  isOpen: boolean;
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
  onRequestClose: () => void;
}

export const Dialog: React.FC<DialogProps> = ({
  title,
  children,
  confirmCta,
  cancelCta,
  onRequestClose,
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
      <ModalWrapper aria-hidden="false" aria-modal="true" role="dialog">
        <ModalShadow name="checkerDense" />
        <ModalBody>
          <Text as="h2" fontSize={20} lineHeight="base" gridArea="title">
            {title}
          </Text>
          <IconButton
            aria-label="Close Dialog"
            size="small"
            icon={MiniDeleteIcon}
            onClick={onCancel}
            gridArea="close"
          />
          <Text as="p" gridArea="content">
            {children}
          </Text>
          {cancelCta && (
            <TextButton {...cancelCta} onClick={onCancel} justifySelf="end" />
          )}
          <Box gridArea="confirm">
            <FillButton {...confirmCta} onClick={onConfirm} />
          </Box>
        </ModalBody>
      </ModalWrapper>
    </ShroudedOverlay>
  );
};
