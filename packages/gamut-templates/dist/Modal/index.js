import React from 'react';
import cx from 'classnames';
import { Overlay, Button, CardShell } from '@codecademy/gamut';
import { CloseIcon } from '@codecademy/gamut-icons';
import styles from './styles.module.scss';
export var Modal = function Modal(_ref) {
  var children = _ref.children,
      className = _ref.className,
      closeModal = _ref.closeModal,
      isOpen = _ref.isOpen,
      hideDefaultCloseButton = _ref.hideDefaultCloseButton;
  return React.createElement(Overlay, {
    isOpen: isOpen,
    className: cx(styles.modal, className),
    "data-testid": "modal"
  }, React.createElement("div", {
    className: styles.modalContainer
  }, React.createElement(CardShell, {
    className: styles.modalBody
  }, !hideDefaultCloseButton && React.createElement("div", {
    className: styles.closeButtonContainer,
    "data-testid": "modal-default-close-button"
  }, React.createElement(Button, {
    flat: true,
    theme: "brand-dark-blue",
    fitText: true,
    onClick: closeModal && closeModal,
    className: styles.closeButton
  }, React.createElement(CloseIcon, {
    width: 22,
    height: 22,
    className: styles.closeIcon
  }))), children)));
};
export default Modal;