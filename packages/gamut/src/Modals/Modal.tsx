import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { ComponentProps, useState } from 'react';
import * as React from 'react';

import { Box } from '../Box';
import { ButtonProps, FillButton, IconButton, TextButton } from '../Button';
import { Overlay } from '../Overlay';
import { Text } from '../Typography';
import { ModalContainer } from './elements';
import { ImageContainer } from './ImageContainer';
import { ModalBaseProps } from './types';

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
  extends Omit<ModalBaseProps, 'headingLevel' | 'onRequestClose'> {
  children: React.ReactNode;
}

export type ModalViewProps = ModalView & ModalButtonProps;

export interface SingleViewModalProps extends ModalBaseProps {
  size?: ComponentProps<typeof ModalContainer>['size'];
  /**
   * Whether to hide the default close button and pass your own through children
   */
  hideCloseButton?: boolean;
  /**
   * Whether to show scrollbar on content overflow
   */
  scrollable?: boolean;
  views?: never;
  /**
   * Whether to disable X button at top right of modal
   */
  closeDisabled?: boolean;
}

export interface MultiViewModalProps
  extends Omit<ModalBaseProps, 'children' | 'image'> {
  children?: never;
  image?: never;
  size?: ComponentProps<typeof ModalContainer>['size'];
  /**
   * Whether to hide the default close button and pass your own through children
   */
  hideCloseButton?: boolean;
  /**
   * Whether to show scrollbar on content overflow
   */
  scrollable?: boolean;
  /**
   * Optional array of multiple screens
   */
  views: ModalViewProps[];
  /**
   * Whether to disable X button at top right of modal
   */
  closeDisabled?: boolean;
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
  headingLevel = 'h2',
  hideCloseButton = false,
  onRequestClose,
  scrollable = false,
  size = 'fluid',
  title,
  views,
  closeDisabled,
  ...rest
}) => {
  const [currentView, setCurrentView] = useState(0);
  const view = views?.[currentView];
  const image = (view?.image || rest?.image) ?? null;

  const titleText = title || views?.[currentView].title;
  return (
    <Overlay
      shroud
      onRequestClose={onRequestClose}
      data-testid="modal"
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
        role="dialog"
        size={size}
        tabIndex={-1}
      >
        {titleText && (
          <Text
            as={headingLevel}
            fontSize={20}
            lineHeight="base"
            gridArea="title"
          >
            {titleText}
          </Text>
        )}
        {!hideCloseButton && (
          <Box alignSelf="start" gridArea="close">
            <IconButton
              size="small"
              icon={MiniDeleteIcon}
              onClick={onRequestClose}
              disabled={closeDisabled}
              tip="Close modal"
            />
          </Box>
        )}
        <Box
          overflowY={scrollable ? 'auto' : 'visible'}
          gridArea="content"
          data-testid="modal-content"
        >
          {image && size && <ImageContainer image={image} size={size} />}
          {view?.children || children}
        </Box>
        {view?.secondaryCta && (
          <TextButton
            {...view?.secondaryCta}
            variant="secondary"
            disabled={
              view?.secondaryCta.disabled ||
              (view?.secondaryCta?.actionType === 'back' && currentView === 0)
            }
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              if (view?.secondaryCta?.actionType === 'back') {
                setCurrentView(currentView - 1);
              }
              if (view?.secondaryCta?.actionType === 'cancel') {
                onRequestClose();
              }
              view?.secondaryCta?.onClick?.(e);
            }}
            justifySelf="end"
            gridArea="cancel"
          />
        )}
        {view?.primaryCta && (
          <FillButton
            {...view?.primaryCta}
            variant={
              'variant' in view.primaryCta
                ? view?.primaryCta?.variant
                : 'primary'
            }
            disabled={
              view?.primaryCta.disabled ||
              (view?.primaryCta?.actionType === 'next' &&
                views &&
                currentView === views.length - 1)
            }
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              if (view?.primaryCta?.actionType === 'next') {
                setCurrentView(currentView + 1);
              }
              view?.primaryCta?.onClick?.(e);
            }}
            gridArea="confirm"
          />
        )}
      </ModalContainer>
    </Overlay>
  );
};
