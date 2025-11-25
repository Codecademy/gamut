import { setupRtl } from '@codecademy/gamut-tests';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { InfoTip } from '../InfoTip';
import {
  clickButton,
  createLinkSetup,
  getTipContent,
  openTipTabToLinkAndWaitForFocus,
  pressKey,
  setupLinkTestWithPlacement,
  setupMultiLinkTestWithPlacement,
  testEscapeKeyWithOutsideFocus,
  testFocusWrap,
  testModalDoesNotCloseInfoTip,
  testTabbingBetweenLinks,
  testTabFromPopoverWithNoInteractiveElements,
} from './helpers';

const info = 'I am information';
const renderView = setupRtl(InfoTip, {
  info,
});

describe('InfoTip', () => {
  describe.each<{ placement: 'inline' | 'floating' }>([
    { placement: 'inline' },
    { placement: 'floating' },
  ])('$placement placement', ({ placement }) => {
    it('shows the tip when it is clicked on', async () => {
      const user = userEvent.setup();
      const { view } = renderView({ placement });

      const isInline = placement === 'inline';
      const tip = isInline ? view.getByText(info) : null;

      if (isInline) {
        expect(tip).not.toBeVisible();
      } else {
        expect(view.queryByText(info)).toBeNull();
      }

      await user.click(view.getByRole('button'));

      if (isInline) {
        expect(tip?.parentElement).not.toHaveStyle({
          visibility: 'hidden',
          opacity: 0,
        });
        expect(tip).toBeVisible();
      } else {
        await waitFor(() => {
          expect(view.getByText(info)).toBeVisible();
        });
      }
    });

    it('closes the tip when Escape key is pressed and returns focus to button', async () => {
      const { view } = renderView({ placement });

      const button = await clickButton(view);

      if (placement === 'inline') {
        const tip = getTipContent(view, info);
        expect(tip).toBeVisible();
      } else {
        await waitFor(() => {
          expect(view.getByText(info)).toBeVisible();
        });
      }

      await pressKey('{Escape}');

      await waitFor(() => {
        if (placement === 'inline') {
          expect(getTipContent(view, info)).not.toBeVisible();
        } else {
          expect(view.queryByText(info)).toBeNull();
        }
        expect(button).toHaveFocus();
      });
    });

    it('allows normal tabbing through focusable elements within tip', async () => {
      const firstLinkText = 'first link';
      const secondLinkText = 'second link';
      const { view } = setupMultiLinkTestWithPlacement(
        firstLinkText,
        secondLinkText,
        placement,
        renderView
      );

      await testTabbingBetweenLinks({
        view,
        firstLinkText,
        secondLinkText,
        placement,
      });
    });

    it('allows focus to move to links within the tip', async () => {
      const linkText = 'cool link';
      const { info, onClick } = createLinkSetup({ linkText });
      const { view } = renderView({ placement, info, onClick });

      await openTipTabToLinkAndWaitForFocus(view, linkText);
    });

    it('closes the tip when Escape is pressed even when focus is on a link inside', async () => {
      const linkText = 'cool link';
      const { info, onClick } = createLinkSetup({ linkText });
      const { view } = renderView({ placement, info, onClick });

      const link = await openTipTabToLinkAndWaitForFocus(view, linkText);

      await pressKey('{Escape}');

      await waitFor(() => {
        expect(link).not.toBeVisible();
      });
    });

    it('closes the tip when Escape is pressed even when focus is on an outside element', async () => {
      const { view } = renderView({ placement });
      await testEscapeKeyWithOutsideFocus({ view, info });
    });

    it('does not close the tip when Escape is pressed if a modal is open', async () => {
      const { view } = renderView({ placement });
      await testModalDoesNotCloseInfoTip({ view, info, placement });
    });

    it('calls onClick with isTipHidden: false when tip opens', async () => {
      const onClick = jest.fn();
      const { view } = renderView({ placement, onClick });

      await clickButton(view);

      await waitFor(() => {
        expect(onClick).toHaveBeenCalledWith({ isTipHidden: false });
      });
    });

    it('calls onClick with isTipHidden: true when tip closes', async () => {
      const onClick = jest.fn();
      const { view } = renderView({ placement, onClick });

      await clickButton(view);

      await waitFor(() => {
        expect(onClick).toHaveBeenCalledWith({ isTipHidden: false });
      });

      onClick.mockClear();

      await clickButton(view);

      await waitFor(() => {
        expect(onClick).toHaveBeenCalledWith({ isTipHidden: true });
      });
    });

    it('does not call onClick on initial mount', async () => {
      const onClick = jest.fn();
      renderView({ placement, onClick });

      // Wait a bit to ensure no calls were made
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('floating placement focus management', () => {
    it('closes the tip with links when Escape key is pressed and returns focus to the button', async () => {
      const linkText = 'cool link';
      const { info, onClick } = createLinkSetup({
        linkText,
        href: 'https://giphy.com/search/nichijou',
      });
      const { view } = renderView({
        placement: 'floating',
        info,
        onClick,
      });

      const button = await clickButton(view);

      await waitFor(() => {
        expect(view.getByText(linkText)).toBeVisible();
      });

      await pressKey('{Escape}');

      await waitFor(() => {
        expect(view.queryByText(linkText)).toBeNull();
        expect(button).toHaveFocus();
      });
    });

    it('wraps focus to button when tabbing forward from last focusable element', async () => {
      const linkText = 'cool link';
      const { view, containerRef } = setupLinkTestWithPlacement(
        linkText,
        'floating',
        renderView
      );

      await testFocusWrap({ view, containerRef, direction: 'forward' });
    });

    it('wraps focus to button when shift+tabbing backward from first focusable element', async () => {
      const linkText = 'cool link';
      const { view, containerRef } = setupLinkTestWithPlacement(
        linkText,
        'floating',
        renderView
      );

      await testFocusWrap({ view, containerRef, direction: 'backward' });
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

      await testTabbingBetweenLinks({
        view,
        firstLinkText,
        secondLinkText,
        placement: 'floating',
      });
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
