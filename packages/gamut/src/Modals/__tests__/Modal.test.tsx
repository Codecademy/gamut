import { theme } from '@codecademy/gamut-styles';
import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/react';
import * as React from 'react';

import { Modal } from '..';

const mockRequestClose = jest.fn();
const renderView = setupRtl(Modal, {
  title: 'Title',
  children: 'Hello world',
  isOpen: true,
  onRequestClose: mockRequestClose,
});

describe('Modal', () => {
  it('renders children and title when isOpen is true', () => {
    const { view } = renderView();
    view.getByText('Hello world');
    view.getByText('Title');
  });

  it('does not render children and title when isOpen is false', () => {
    const { view } = renderView({ isOpen: false });

    expect(view.queryByText('Hello world')).toBe(null);
    expect(view.queryByText('Title')).toBe(null);
  });

  it('does not render its close button if closeButtonProps.hidden is true', () => {
    const { view } = renderView({ closeButtonProps: { hidden: true } });

    expect(view.queryAllByRole('button').length).toBe(0);
  });

  it('renders its close button if closeButtonProps.hidden is false', () => {
    const { view } = renderView({ closeButtonProps: { hidden: false } });
    view.getByRole('button');
  });

  it('triggers onRequestClose callback when escape key is triggered', () => {
    const { view } = renderView();
    const modal = view.getByTestId('overlay-content-container');
    fireEvent.keyDown(modal, { key: 'Escape', code: 'Escape' });

    expect(mockRequestClose).toHaveBeenCalledTimes(1);
  });

  it('triggers onRequestClose callback when clicking outside when clickOutsideCloses is true', () => {
    const { view } = renderView();
    // focus-trap listens to mouseDown, not click
    fireEvent.mouseDown(view.getByTestId('overlay-content-container'));

    expect(mockRequestClose).toHaveBeenCalledTimes(1);
  });

  it('does not trigger onRequestClose callback when clicking inside', () => {
    const { view } = renderView();
    fireEvent.mouseDown(view.getByTestId('modal-content'));

    expect(mockRequestClose).not.toHaveBeenCalled();
  });

  it('renders an image if passed in', () => {
    const { view } = renderView({
      image: <img alt="test" src="./myimg.svg" />,
    });
    view.getByAltText('test');
  });

  describe('closeButtonProps functionality', () => {
    it('applies a ref to the close button when closeButtonProps.ref is provided', () => {
      const closeButtonRef = React.createRef<HTMLButtonElement>();
      const { view } = renderView({
        closeButtonProps: { ref: closeButtonRef },
      });
      const closeButton = view.getByRole('button');

      expect(closeButtonRef.current).toBe(closeButton);
    });

    it('uses custom tooltip text when closeButtonProps.tip is provided', () => {
      const customTip = 'Custom close tooltip';
      const { view } = renderView({
        closeButtonProps: { tip: customTip },
      });
      const closeButton = view.getByRole('button');

      expect(closeButton).toHaveAttribute('aria-label', customTip);
    });

    it('uses default tooltip text when closeButtonProps.tip is not provided', () => {
      const { view } = renderView();
      const closeButton = view.getByRole('button');

      expect(closeButton).toHaveAttribute('aria-label', 'Close modal');
    });

    it('disables the close button when closeButtonProps.disabled is true', () => {
      const { view } = renderView({
        closeButtonProps: { disabled: true },
      });
      const closeButton = view.getByRole('button');

      expect(closeButton).toBeDisabled();
    });

    it('enables the close button when closeButtonProps.disabled is false', () => {
      const { view } = renderView({
        closeButtonProps: { disabled: false },
      });
      const closeButton = view.getByRole('button');

      expect(closeButton).not.toBeDisabled();
    });

    it('enables the close button by default when closeButtonProps.disabled is not provided', () => {
      const { view } = renderView();
      const closeButton = view.getByRole('button');

      expect(closeButton).not.toBeDisabled();
    });
  });

  describe('containerFocusRef functionality', () => {
    it('applies a ref to the modal container when containerFocusRef is provided', () => {
      const containerFocusRef = React.createRef<HTMLDivElement>();
      const { view } = renderView({
        containerFocusRef,
      });
      const modalContainer = view.getByRole('dialog');

      expect(containerFocusRef.current).toBe(modalContainer);
    });
  });

  describe('Multi view', () => {
    it('renders modal title and view children when modal title is provided', () => {
      const { view } = renderView({
        views: [
          {
            title: 'Multi view',
            children: <>View 1</>,
            primaryCta: { actionType: 'confirm', children: 'Confirm' },
          },
        ],
      });
      view.getByText('View 1');
      view.getByText('Title');

      expect(view.queryByText('Multi view')).toBe(null);
    });

    it('renders view title and children when modal title is not provided', () => {
      const { view } = renderView({
        title: undefined,
        views: [
          {
            title: 'Multi view',
            children: <>View 1</>,
            primaryCta: { actionType: 'confirm', children: 'Confirm' },
          },
        ],
      });
      view.getByText('View 1');
      view.getByText('Multi view');

      expect(view.queryByText('Title')).toBe(null);
    });

    it('moves to the next view when next is clicked', () => {
      const mockOnClick = jest.fn();
      const { view } = renderView({
        views: [
          {
            title: 'Multi view',
            children: <>View 1</>,
            primaryCta: {
              actionType: 'next',
              children: 'Next',
              onClick: mockOnClick,
            },
            secondaryCta: { actionType: 'cancel', children: 'Cancel' },
          },
          {
            title: 'Multi view',
            children: <>View 2</>,
            primaryCta: { actionType: 'next', children: 'Next' },
            secondaryCta: { actionType: 'back', children: 'Back' },
          },
        ],
      });
      view.getByText('View 1');

      expect(view.queryByText('View 2')).toBe(null);

      fireEvent.click(view.getByText('Next'));
      view.getByText('View 2');

      expect(view.queryByText('View 1')).toBe(null);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('moves to the previous view when back is clicked', () => {
      const mockOnClick = jest.fn();
      const { view } = renderView({
        views: [
          {
            title: 'Multi view',
            children: <>View 1</>,
            primaryCta: { actionType: 'next', children: 'Next' },
            secondaryCta: { actionType: 'cancel', children: 'Cancel' },
          },
          {
            title: 'Multi view',
            children: <>View 2</>,
            primaryCta: { actionType: 'next', children: 'Next' },
            secondaryCta: {
              actionType: 'back',
              children: 'Back',
              onClick: mockOnClick,
            },
          },
        ],
      });
      fireEvent.click(view.getByText('Next'));
      view.getByText('View 2');

      expect(view.queryByText('View 1')).toBe(null);

      fireEvent.click(view.getByText('Back'));
      view.getByText('View 1');

      expect(view.queryByText('View 2')).toBe(null);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('renders back button as disabled if it is the first view', () => {
      const { view } = renderView({
        views: [
          {
            title: 'Multi view',
            children: <>View 1</>,
            primaryCta: { actionType: 'next', children: 'Next' },
            secondaryCta: { actionType: 'back', children: 'Back' },
          },
        ],
      });
      const backButton = view.getByRole('button', {
        name: 'Back',
      });

      expect(backButton).toBeDisabled();
    });

    it('renders next button as disabled if it is the last view', () => {
      const { view } = renderView({
        views: [
          {
            title: 'Multi view',
            children: <>View 1</>,
            primaryCta: { actionType: 'next', children: 'Next' },
            secondaryCta: { actionType: 'cancel', children: 'Cancel' },
          },
        ],
      });
      const nextButton = view.getByRole('button', {
        name: 'Next',
      });

      expect(nextButton).toBeDisabled();
    });

    it('renders button as disabled if passed in', () => {
      const { view } = renderView({
        views: [
          {
            title: 'Multi view',
            children: <>View 1</>,
            primaryCta: { actionType: 'next', children: 'Next' },
            secondaryCta: {
              actionType: 'cancel',
              children: 'Cancel',
              disabled: true,
            },
          },
          {
            title: 'Multi view',
            children: <>View 2</>,
            primaryCta: {
              actionType: 'confirm',
              children: 'Done',
              disabled: true,
            },
            secondaryCta: {
              actionType: 'back',
              children: 'Back',
            },
          },
        ],
      });
      const cancelButton = view.getByRole('button', {
        name: 'Cancel',
      });

      expect(cancelButton).toBeDisabled();

      fireEvent.click(view.getByText('Next'));
      const doneButton = view.getByRole('button', {
        name: 'Done',
      });

      expect(doneButton).toBeDisabled();
    });

    it('renders primary confirm button as primary variant by default', () => {
      const { view } = renderView({
        views: [
          {
            title: 'Multi view',
            children: <>View 1</>,
            primaryCta: { actionType: 'confirm', children: 'Confirm' },
            secondaryCta: {
              actionType: 'cancel',
              children: 'Cancel',
            },
          },
        ],
      });
      const primaryButton = view.getByRole('button', {
        name: 'Confirm',
      });

      expect(primaryButton).toHaveStyle(
        `background-color: ${theme.colors.primary}`
      );
    });

    it('renders primary confirm button as primary variant when passed in', () => {
      const { view } = renderView({
        views: [
          {
            title: 'Multi view',
            children: <>View 1</>,
            primaryCta: {
              actionType: 'confirm',
              children: 'Confirm',
              variant: 'primary',
            },
            secondaryCta: {
              actionType: 'cancel',
              children: 'Cancel',
            },
          },
        ],
      });
      const primaryButton = view.getByRole('button', {
        name: 'Confirm',
      });

      expect(primaryButton).toHaveStyle(
        `background-color: ${theme.colors.primary}`
      );
    });

    it('renders primary next button as primary variant by default', () => {
      const { view } = renderView({
        views: [
          {
            title: 'Multi view',
            children: <>View 1</>,
            primaryCta: { actionType: 'next', children: 'Next' },
            secondaryCta: {
              actionType: 'cancel',
              children: 'Cancel',
            },
          },
        ],
      });
      const primaryButton = view.getByRole('button', {
        name: 'Next',
      });

      expect(primaryButton).toHaveStyle(
        `background-color: ${theme.colors.primary}`
      );
    });

    it('renders primary confirm button as danger variant when passed in', () => {
      const { view } = renderView({
        views: [
          {
            title: 'Multi view',
            children: <>View 1</>,
            primaryCta: {
              actionType: 'confirm',
              children: 'Confirm',
              variant: 'danger',
            },
            secondaryCta: {
              actionType: 'cancel',
              children: 'Cancel',
            },
          },
        ],
      });
      const primaryButton = view.getByRole('button', {
        name: 'Confirm',
      });

      expect(primaryButton).toHaveStyle(
        `background-color: ${theme.colors.danger}`
      );
    });

    it('calls onRequestClose and onClick when cancel is clicked', () => {
      const mockOnClick = jest.fn();
      const { view } = renderView({
        views: [
          {
            title: 'Multi view',
            children: <>View 1</>,
            primaryCta: { actionType: 'next', children: 'Next' },
            secondaryCta: {
              actionType: 'cancel',
              children: 'Cancel',
              onClick: mockOnClick,
            },
          },
        ],
      });
      fireEvent.click(view.getByText('Cancel'));

      expect(mockRequestClose).toHaveBeenCalledTimes(1);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick when confirm is clicked', () => {
      const mockOnClick = jest.fn();
      const { view } = renderView({
        views: [
          {
            title: 'Multi view',
            children: <>View 1</>,
            primaryCta: {
              actionType: 'confirm',
              children: 'Confirm',
              onClick: mockOnClick,
            },
            secondaryCta: {
              actionType: 'cancel',
              children: 'Cancel',
              onClick: mockOnClick,
            },
          },
        ],
      });
      fireEvent.click(view.getByText('Confirm'));

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('renders an image if passed in', () => {
      const mockOnClick = jest.fn();
      const { view } = renderView({
        views: [
          {
            title: 'Multi view',
            image: <img alt="test" src="./myimg.svg" />,
            children: <>View 1</>,
            primaryCta: {
              actionType: 'confirm',
              children: 'Confirm',
              onClick: mockOnClick,
            },
            secondaryCta: {
              actionType: 'cancel',
              children: 'Cancel',
              onClick: mockOnClick,
            },
          },
        ],
      });
      view.getByAltText('test');
    });
  });
});
