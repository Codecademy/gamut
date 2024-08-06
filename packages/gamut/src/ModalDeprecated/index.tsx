import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { css, theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import cx from 'classnames';
import * as React from 'react';

import { FlexBox } from '../Box';
import { IconButton } from '../Button';
import { Overlay, OverlayProps } from '../Overlay';
// eslint-disable-next-line gamut/no-css-standalone
import styles from './styles.module.scss';

export type ModalDeprecatedOverlayProps = Partial<
  Pick<OverlayProps, 'clickOutsideCloses' | 'escapeCloses' | 'className'>
>;

// this should be deleted with the removal of ModalDeprecated
const CardShell = styled.div(
  css({
    background: 'white',
    borderRadius: 'small',
    boxShadow: `0 2px 8px 0  ${theme.colors['shadow-black-slight']}`,
    position: 'relative',
    transition: 'box-shadow 250ms ease-in',
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
          <FlexBox justifyContent="flex-end" mt={-8 as any} mr={-8 as any}>
            <IconButton
              size="small"
              icon={MiniDeleteIcon}
              onClick={onRequestClose}
              tip="Close modal"
            />
          </FlexBox>
        )}
        {children}
      </CardShell>
    </Overlay>
  );
};
