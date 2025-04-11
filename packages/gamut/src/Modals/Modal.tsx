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

type ModalNextBackProps = {
  nextCta: DialogButtonProps;
  backCta: DialogButtonProps;
  cancelCta?: never;
  confirmCta?: never;
};

type ModalNextCancelProps = {
  nextCta: DialogButtonProps;
  cancelCta: DialogButtonProps;
  backCta?: never;
  confirmCta?: never;
};

type ModalConfirmCancelProps = {
  confirmCta: DialogButtonProps;
  cancelCta?: DialogButtonProps;
  backCta?: never;
  nextCta?: never;
};

type ModalConfirmBackProps = {
  confirmCta: DialogButtonProps;
  backCta?: DialogButtonProps;
  cancelCta?: never;
  nextCta?: never;
};

type ModalButtonProps =
  | ModalNextBackProps
  | ModalNextCancelProps
  | ModalConfirmCancelProps
  | ModalConfirmBackProps;

// const test: ModalButtonProps = {
//   nextCta: { children: 'Next' },
//   confirmCta: { children: 'Done' },
//   cancelCta: { children: 'Close' },
//   // backCta: { children: 'Back' },
// };

export interface ModalView
  extends Omit<ModalBaseProps, 'headingLevel' | 'onRequestClose'> {
  children: React.ReactNode;
}

type ModalViewProps = ModalView & ModalButtonProps;

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
}

export type ModalProps = SingleViewModalProps | MultiViewModalProps;

export const Modal: React.FC<ModalProps> = ({
  'aria-label': ariaLabel,
  'aria-live': ariaLive = 'polite',
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
  const image = (views?.[currentView].image || rest?.image) ?? null;

  return (
    <Overlay
      shroud
      onRequestClose={onRequestClose}
      data-testid="modal"
      {...rest}
    >
      <ModalContainer
        tabIndex={-1}
        size={size}
        role="dialog"
        layout={views && views?.length > 0 ? 'dialog' : 'standard'}
        data-autofocus
        className={className}
        aria-modal="true"
        aria-live={ariaLive}
        aria-label={ariaLabel}
        aria-hidden="false"
      >
        {(title || views?.[currentView].title) && (
          <Text
            as={headingLevel}
            fontSize={20}
            lineHeight="base"
            gridArea="title"
            aria-live="assertive"
          >
            {title || views?.[currentView].title}
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
          {views?.[currentView].children || children}
        </Box>
        {views?.[currentView].cancelCta && (
          <TextButton
            {...views?.[currentView].cancelCta}
            variant="secondary"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              views?.[currentView].cancelCta?.onClick?.(e);
              onRequestClose();
            }}
            justifySelf="end"
            gridArea="cancel"
          />
        )}
        {views?.[currentView].backCta && (
          <TextButton
            {...views?.[currentView].backCta}
            variant="secondary"
            disabled={currentView === 0}
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              setCurrentView(currentView - 1);
              views?.[currentView].backCta?.onClick?.(e);
            }}
            justifySelf="end"
            gridArea="cancel"
          />
        )}
        {views?.[currentView].nextCta && (
          <FillButton
            {...views?.[currentView].nextCta}
            variant="primary"
            disabled={currentView === views.length - 1}
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              setCurrentView(currentView + 1);
              views?.[currentView].nextCta?.onClick?.(e);
            }}
            gridArea="confirm"
          />
        )}
        {views?.[currentView].confirmCta && (
          <FillButton
            {...views?.[currentView].confirmCta}
            variant="primary"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              views?.[currentView].confirmCta?.onClick?.(e);
            }}
            gridArea="confirm"
          />
        )}
      </ModalContainer>
    </Overlay>
  );
};
