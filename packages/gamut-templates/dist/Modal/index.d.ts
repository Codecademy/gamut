import React from 'react';
export declare type ModalProps = {
    children?: React.ReactNode;
    className?: string;
    /**
     * Whether the modal is open or closed
     */
    isOpen: boolean;
    /**
     * A function that, at minimum, sets the state to close the modal
     */
    closeModal?: () => void;
    /**
     * Whether to hide the default close button and pass your own through children
     */
    hideDefaultCloseButton?: boolean;
};
export declare const Modal: React.FC<ModalProps>;
export default Modal;
