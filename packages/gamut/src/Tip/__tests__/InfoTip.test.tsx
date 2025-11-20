import { setupRtl } from '@codecademy/gamut-tests';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { InfoTip } from '../InfoTip';
import {
  clickButton,
  createLinkSetup,
  getTipContent,
  openTipAndWaitForLink,
  pressKey,
  setupLinkTestWithPlacement,
  setupMultiLinkTestWithPlacement,
  testEscapeKeyCloseTip,
  testEscapeKeyWithOutsideFocus,
  testFocusWrap,
  testTabbingBetweenLinks,
  testTabFromPopoverWithNoInteractiveElements,
} from './helpers';

const info = 'I am information';
const renderView = setupRtl(InfoTip, {
  info,
});

const openTipTabToLinkAndWaitForFocus = async (
  view: ReturnType<typeof renderView>['view'],
  linkText: string
) => {
  const user = userEvent.setup();
  const link = await openTipAndWaitForLink(view, linkText);
  await user.tab();
  await waitFor(() => {
    expect(link).toHaveFocus();
  });
  return link;
};

const testModalDoesNotCloseInfoTip = async (
  view: ReturnType<typeof renderView>['view'],
  info: string,
  useModalButton = false
) => {
  const button = await clickButton(view);

  await waitFor(() => {
    expect(button).toHaveAttribute('aria-expanded', 'true');
    const tip = getTipContent(view, info);
    expect(tip).toBeVisible();
  });

  const mockModal = document.createElement('div');
  mockModal.setAttribute('role', 'dialog');

  if (useModalButton) {
    const modalButton = document.createElement('button');
    modalButton.textContent = 'Modal button';
    mockModal.appendChild(modalButton);
    view.container.appendChild(mockModal);
    modalButton.focus();
  } else {
    document.body.appendChild(mockModal);
  }

  try {
    await pressKey('{Escape}');

    await waitFor(() => {
      const tip = getTipContent(view, info);
      expect(tip).toBeVisible();
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });
  } finally {
    if (useModalButton) {
      view.container.removeChild(mockModal);
    } else {
      document.body.removeChild(mockModal);
    }
  }
};

describe('InfoTip', () => {
  describe('inline placement', () => {
    it('shows the tip when it is clicked on', async () => {
      const user = userEvent.setup();
      const { view } = renderView({});

      const tip = view.getByText(info);

      expect(tip).not.toBeVisible();

      await user.click(view.getByRole('button'));

      expect(tip.parentElement).not.toHaveStyle({
        visibility: 'hidden',
        opacity: 0,
      });

      expect(tip).toBeVisible();
    });

    it('closes the tip when Escape key is pressed and returns focus to button', async () => {
      const { view } = renderView({});

      const button = await clickButton(view);

      const tip = getTipContent(view, info);
      expect(tip).toBeVisible();

      await pressKey('{Escape}');

      await waitFor(() => {
        expect(tip).not.toBeVisible();
        expect(button).toHaveFocus();
      });
    });

    it('allows normal tabbing through focusable elements within tip', async () => {
      const firstLinkText = 'first link';
      const secondLinkText = 'second link';
      const { view } = setupMultiLinkTestWithPlacement(
        firstLinkText,
        secondLinkText,
        'inline',
        renderView
      );

      await testTabbingBetweenLinks(
        view,
        firstLinkText,
        secondLinkText,
        'inline'
      );
    });

    it('allows focus to move to links within the tip', async () => {
      const linkText = 'cool link';
      const { info } = createLinkSetup(linkText);
      const { view } = renderView({ info });

      await openTipTabToLinkAndWaitForFocus(view, linkText);
    });

    it('closes the tip when Escape is pressed even when focus is on a link inside', async () => {
      const linkText = 'cool link';
      const { info } = createLinkSetup(linkText);
      const { view } = renderView({ info });

      const link = await openTipTabToLinkAndWaitForFocus(view, linkText);

      await pressKey('{Escape}');

      await waitFor(() => {
        expect(link).not.toBeVisible();
      });
    });

    it('closes the tip when Escape is pressed even when focus is on an outside element', async () => {
      const { view } = renderView({});
      await testEscapeKeyWithOutsideFocus(view, info, false);
    });

    it('does not close the tip when Escape is pressed if a modal is open', async () => {
      const { view } = renderView({});
      await testModalDoesNotCloseInfoTip(view, info);
    });
  });

  describe('floating placement', () => {
    it('shows the tip when it is clicked on', async () => {
      const user = userEvent.setup();
      const { view } = renderView({
        placement: 'floating',
      });

      expect(view.queryByText(info)).toBeNull();

      await user.click(view.getByRole('button'));

      await waitFor(() => {
        expect(view.getByText(info)).toBeVisible();
      });
    });

    it('closes the tip when Escape key is pressed and returns focus to the button', async () => {
      const { view } = renderView({
        placement: 'floating',
      });

      await testEscapeKeyCloseTip(view, info, true);
    });

    it('closes the tip with links when Escape key is pressed and returns focus to the button', async () => {
      const linkText = 'cool link';
      const { info } = createLinkSetup(
        linkText,
        'https://giphy.com/search/nichijou'
      );
      const { view } = renderView({
        placement: 'floating',
        info,
      });

      await testEscapeKeyCloseTip(view, linkText, true);
    });

    it('wraps focus to button when tabbing forward from last focusable element', async () => {
      const linkText = 'cool link';
      const { view, containerRef } = setupLinkTestWithPlacement(
        linkText,
        'floating',
        renderView
      );

      await testFocusWrap(view, containerRef, 'forward');
    });

    it('wraps focus to button when shift+tabbing backward from first focusable element', async () => {
      const linkText = 'cool link';
      const { view, containerRef } = setupLinkTestWithPlacement(
        linkText,
        'floating',
        renderView
      );

      await testFocusWrap(view, containerRef, 'backward');
    });

    it('allows normal tabbing between focusable elements within popover', async () => {
      const firstLinkText = 'first link';
      const secondLinkText = 'second link';
      const { view } = setupMultiLinkTestWithPlacement(
        firstLinkText,
        secondLinkText,
        'floating',
        renderView
      );

      await testTabbingBetweenLinks(
        view,
        firstLinkText,
        secondLinkText,
        'floating'
      );
    });

    it('closes the tip when Escape is pressed even when focus is on an outside element', async () => {
      const { view } = renderView({ placement: 'floating' });
      await testEscapeKeyWithOutsideFocus(view, info, true);
    });

    it('does not close the tip when Escape is pressed if a modal is open', async () => {
      const { view } = renderView({ placement: 'floating' });
      await testModalDoesNotCloseInfoTip(view, info, true);
    });

    it('wraps focus to button when tabbing from popover with no interactive elements', async () => {
      const { view } = renderView({ placement: 'floating' });
      await testTabFromPopoverWithNoInteractiveElements(view);
    });
  });

  describe('ariaLabel', () => {
    it('applies default aria-label when ariaLabel is not provided', () => {
      const { view } = renderView({});
      view.getByLabelText('Show information');
    });

    it('applies custom aria-label when provided', () => {
      const { view } = renderView({
        ariaLabel: 'Additional details',
      });
      view.getByLabelText('Additional details');
    });

    it('works with floating placement', () => {
      const { view } = renderView({
        placement: 'floating',
        ariaLabel: 'Help text',
      });
      view.getByLabelText('Help text');
    });
  });
});
