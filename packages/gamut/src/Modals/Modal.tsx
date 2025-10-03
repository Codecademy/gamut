import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { ComponentProps, useState } from 'react';
import * as React from 'react';

import { Box } from '../Box';
import { ButtonProps, FillButton, IconButton, TextButton } from '../Button';
import { Overlay } from '../Overlay';
import { Text } from '../Typography';
import { ModalContainer } from './elements';
import { ImageContainer } from './ImageContainer';
import { CloseButtonProps, DialogBaseProps } from './types';

interface DialogButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: ButtonProps['onClick'];
  disabled?: boolean;
}

type SecondaryDialogButtonProps = DialogButtonProps & {
  actionType: 'back' | 'cancel';
};

type ModalNextProps = {
  primaryCta: DialogButtonProps & {
    actionType: 'next';
  };
  secondaryCta: SecondaryDialogButtonProps;
};

type ModalConfirmProps = {
  primaryCta: DialogButtonProps & {
    actionType: 'confirm';
    variant?: Extract<
      ComponentProps<typeof FillButton>['variant'],
      'primary' | 'danger'
    >;
  };
  secondaryCta?: SecondaryDialogButtonProps;
};

type ModalButtonProps = ModalNextProps | ModalConfirmProps;

interface ModalView
  extends Omit<DialogBaseProps, 'headingLevel' | 'onRequestClose'> {
  children: React.ReactNode;
}

export type ModalViewProps = ModalView & ModalButtonProps;

export interface SingleViewModalProps
  extends DialogBaseProps,
    CloseButtonProps {
  /**
   * Whether to show scrollbar on content overflow
   */
  scrollable?: boolean;
  views?: never;
}

export interface MultiViewModalProps
  extends Omit<DialogBaseProps, 'children' | 'image'>,
    CloseButtonProps {
  children?: never;
  image?: never;
  size?: ComponentProps<typeof ModalContainer>['size'];
  /**
   * Whether to show scrollbar on content overflow
   */
  scrollable?: boolean;
  /**
   * Optional array of multiple screens
   */
  views: ModalViewProps[];
  /**
   * TEMPORARY: a stopgap solution to avoid zIndex conflicts -
   * will be reworked with: GM-624
   */
  zIndex?: number;
}

export type ModalProps = SingleViewModalProps | MultiViewModalProps;

export const Modal: React.FC<ModalProps> = ({
  'aria-label': ariaLabel,
  children,
  className,
  closeButtonProps: {
    disabled: disableCloseButton,
    hidden: hideCloseButton,
    ref: closeButtonRef,
    tip: closeButtonTip = 'Close modal',
    tipAlignment = 'top-center' as const,
  } = {},
  headingLevel = 'h2',
  onRequestClose,
  scrollable = false,
  size = 'fluid',
  containerFocusRef,
  title,
  views,
  ...rest
}) => {
  const [currentView, setCurrentView] = useState(0);
  const view = views?.[currentView];
  const image = (view?.image || rest?.image) ?? null;

  const titleText = title || views?.[currentView].title;
  return (
    <Overlay
      data-testid="modal"
      shroud
      onRequestClose={onRequestClose}
      {...rest}
    >
      <ModalContainer
        aria-hidden="false"
        aria-label={ariaLabel}
        aria-labelledby={titleText ? String(titleText) : undefined}
        aria-modal="true"
        className={className}
        data-autofocus
        layout={views && views?.length > 0 ? 'dialog' : 'standard'}
        ref={containerFocusRef}
        role="dialog"
        size={size}
        tabIndex={-1}
      >
        {titleText && (
          <Text
            as={headingLevel}
            fontSize={20}
            gridArea="title"
            lineHeight="base"
          >
            {titleText}
          </Text>
        )}
        {!hideCloseButton && (
          <Box alignSelf="start" gridArea="close">
            <IconButton
              disabled={disableCloseButton}
              icon={MiniDeleteIcon}
              ref={closeButtonRef}
              size="small"
              tip={closeButtonTip}
              tipProps={{ alignment: tipAlignment }}
              onClick={onRequestClose}
            />
          </Box>
        )}
        <Box
          data-testid="modal-content"
          gridArea="content"
          overflowY={scrollable ? 'auto' : 'visible'}
        >
          {image && size && <ImageContainer image={image} size={size} />}
          {view?.children || children}
        </Box>
        {view?.secondaryCta && (
          <TextButton
            {...view?.secondaryCta}
            disabled={
              view?.secondaryCta.disabled ||
              (view?.secondaryCta?.actionType === 'back' && currentView === 0)
            }
            gridArea="cancel"
            justifySelf="end"
            variant="secondary"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              if (view?.secondaryCta?.actionType === 'back') {
                setCurrentView(currentView - 1);
              }
              if (view?.secondaryCta?.actionType === 'cancel') {
                onRequestClose();
              }
              view?.secondaryCta?.onClick?.(e);
            }}
          />
        )}
        {view?.primaryCta && (
          <FillButton
            {...view?.primaryCta}
            disabled={
              view?.primaryCta.disabled ||
              (view?.primaryCta?.actionType === 'next' &&
                views &&
                currentView === views.length - 1)
            }
            gridArea="confirm"
            variant={
              'variant' in view.primaryCta
                ? view?.primaryCta?.variant
                : 'primary'
            }
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              if (view?.primaryCta?.actionType === 'next') {
                setCurrentView(currentView + 1);
              }
              view?.primaryCta?.onClick?.(e);
            }}
          />
        )}
      </ModalContainer>
    </Overlay>
  );
};
