import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { ComponentProps } from 'react';
import * as React from 'react';

import { Box } from '../Box';
import { FillButton, IconButton, TextButton } from '../Button';
import { Overlay } from '../Overlay';
import { Text } from '../Typography';
import { ModalContainer, ModalContainerProps } from './elements';
import { ImageContainer } from './ImageContainer';
import { CloseButtonProps, ModalBaseProps } from './types';

interface DialogButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: ComponentProps<typeof FillButton>['onClick'];
}

export interface DialogProps extends ModalBaseProps, CloseButtonProps {
  title: ModalBaseProps['title'];
  size?: Exclude<ModalContainerProps['size'], 'fluid' | false>;
  variant?: Extract<
    ComponentProps<typeof FillButton>['variant'],
    'primary' | 'danger'
  >;
  confirmCta: DialogButtonProps;
  cancelCta?: DialogButtonProps;
  /**
   * TEMPORARY: a stopgap solution to avoid zIndex conflicts -
   * will be reworked with: GM-624
   */
  zIndex?: number;
}

export const Dialog: React.FC<DialogProps> = ({
  title,
  variant,
  children,
  confirmCta,
  cancelCta,
  closeButtonProps: {
    disabled: disableCloseButton,
    hidden: hideCloseButton,
    ref: closeButtonRef,
    tip: closeButtonTip = 'Close dialog',
    tipAlignment = 'top-center' as const,
  } = {},
  onRequestClose,
  image,
  containerFocusRef,
  size = 'small',
  ...rest
}) => {
  const onConfirm: DialogButtonProps['onClick'] = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onRequestClose();
    confirmCta.onClick?.(e);
  };

  const onCancel: DialogButtonProps['onClick'] = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onRequestClose();
    cancelCta?.onClick?.(e);
  };

  return (
    <Overlay shroud onRequestClose={onCancel as () => void} {...rest}>
      <ModalContainer
        aria-hidden="false"
        aria-label="dialog"
        aria-labelledby={String(title)}
        aria-modal="true"
        data-autofocus
        layout="dialog"
        ref={containerFocusRef}
        role="dialog"
        size={size}
        tabIndex={-1}
      >
        <Text as="h2" fontSize={20} gridArea="title" lineHeight="base">
          {title}
        </Text>
        {!hideCloseButton && (
          <Box gridArea="close">
            <IconButton
              alignSelf="start"
              disabled={disableCloseButton}
              icon={MiniDeleteIcon}
              ref={closeButtonRef}
              size="small"
              tip={closeButtonTip}
              tipProps={{ alignment: tipAlignment }}
              onClick={onCancel}
            />
          </Box>
        )}
        <Box as="div" data-testid="dialog-content" gridArea="content">
          {image && <ImageContainer image={image} size={size} />}
          {children}
        </Box>
        {cancelCta && (
          <TextButton
            {...cancelCta}
            gridArea="cancel"
            justifySelf="end"
            variant="secondary"
            onClick={onCancel}
          />
        )}
        <FillButton
          {...confirmCta}
          gridArea="confirm"
          variant={variant}
          onClick={onConfirm}
        />
      </ModalContainer>
    </Overlay>
  );
};
