import { CloseIcon } from '@codecademy/gamut-icons';
import { theme, variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import cx from 'classnames';
import * as React from 'react';

import { ButtonDeprecated } from '../ButtonDeprecated';
import { Overlay, OverlayProps } from '../Overlay';
// eslint-disable-next-line gamut/no-css-standalone
import styles from './styles.module.scss';

export type ModalDeprecatedOverlayProps = Partial<
  Pick<OverlayProps, 'clickOutsideCloses' | 'escapeCloses' | 'className'>
>;

// this should be deleted with the removal of ModalDeprecated
const CardShell = styled.div(
  variant({
    defaultVariant: 'shadowed',
    base: {
      background: 'white',
      borderRadius: '2px',
      boxShadow: `0 2px 8px 0  ${theme.colors['shadow-black-slight']}`,
      position: 'relative',
      transition: 'box-shadow 250ms ease-in',
    },
    variants: {
      shadowed: {},
      flat: {
        boxShadow: 'none',
      },
      hoverable: {
        '&:hover': {
          boxShadow: `-2px 8px 22px 0 ${theme.colors['shadow-black-slight']}`,
        },
      },
    },
  })
);

export type ModalDeprecatedProps = {
  children?: React.ReactNode;
  className?: string;
  /**
   * Whether the ModalDeprecated is open or closed
   */
  isOpen: boolean;

  /**
   * A function that is called when the ModalDeprecated expects to be closed
   * Triggered automatically by the Overlay component in certain situations
   */
  onRequestClose: () => void;

  /**
   * See Overlay component for prop definitions
   * @description ModalDeprecatedOverlayProps
   */
  overlayProps?: ModalDeprecatedOverlayProps;

  /**
   * Whether to hide the default close button and pass your own through children
   */
  hideDefaultCloseButton?: boolean;

  ariaLabel?: string;
};

/**
 * @deprecated  This component is deprecated and will be updated soon.
 *
 * Please check the gamut board for updates on the new version of ModalDeprecated
 */

export const ModalDeprecated: React.FC<ModalDeprecatedProps> = ({
  children,
  className,
  onRequestClose,
  overlayProps,
  isOpen,
  hideDefaultCloseButton,
  ariaLabel,
}) => {
  return (
    <Overlay
      isOpen={isOpen}
      {...overlayProps}
      className={cx(styles.modal, overlayProps?.className)}
      onRequestClose={onRequestClose}
      data-testid="modal"
    >
      <CardShell
        className={cx(styles.modalBody, className)}
        aria-hidden="false"
        aria-modal="true"
        role="dialog"
        aria-label={ariaLabel}
      >
        {!hideDefaultCloseButton && (
          <div
            className={styles.closeButtonContainer}
            data-testid="modal-default-close-button"
          >
            <ButtonDeprecated
              flat
              theme="brand-dark-blue"
              fitText
              onClick={onRequestClose}
              className={styles.closeButton}
            >
              <CloseIcon
                width={22}
                height={22}
                className={styles.closeIcon}
                aria-hidden
              />
            </ButtonDeprecated>
          </div>
        )}
        {children}
      </CardShell>
    </Overlay>
  );
};
