import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { system } from '@codecademy/gamut-styles';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { Box, FlexBox } from '../Box';
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
    'children children children'
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
  const {
    colorModes: { active },
  } = useTheme();

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
          <Box gridArea="title">
            <Text as="h2" fontSize={20} lineHeight="base">
              {title}
            </Text>
          </Box>
          <Box gridArea="close">
            <IconButton
              aria-label="Close Dialog"
              mode={active}
              size="small"
              icon={MiniDeleteIcon}
              onClick={onCancel}
            />
          </Box>
          <Box gridArea="content">
            <Text as="p">{children}</Text>
          </Box>
          {cancelCta && (
            <FlexBox justifyContent="flex-end" gridArea="cancel">
              <TextButton mode={active} {...cancelCta} onClick={onCancel} />
            </FlexBox>
          )}
          <Box gridArea="confirm">
            <FillButton mode={active} {...confirmCta} onClick={onConfirm} />
          </Box>
        </ModalBody>
      </ModalWrapper>
    </ShroudedOverlay>
  );
};
