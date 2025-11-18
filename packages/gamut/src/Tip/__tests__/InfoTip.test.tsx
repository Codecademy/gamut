import { setupRtl } from '@codecademy/gamut-tests';
import { act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { InfoTip } from '../InfoTip';
import {
  createLinkSetup,
  getTipContent,
  openTipAndWaitForLink,
  setupLinkTestWithPlacement,
  setupMultiLinkTestWithPlacement,
  testEscapeKeyCloseTip,
  testEscapeKeyWithOutsideFocus,
  testFocusWrap,
  testTabbingBetweenLinks,
} from './helpers';

const info = 'I am information';
const renderView = setupRtl(InfoTip, {
  info,
});

describe('InfoTip', () => {
  describe('inline placement', () => {
    it('shows the tip when it is clicked on', async () => {
      const { view } = renderView({});

      const tip = view.getByText(info);

      expect(tip).not.toBeVisible();

      await act(async () => {
        await userEvent.click(view.getByRole('button'));
      });

      expect(tip.parentElement).not.toHaveStyle({
        visibility: 'hidden',
        opacity: 0,
      });

      expect(tip).toBeVisible();
    });

    it('closes the tip when Escape key is pressed and returns focus to button', async () => {
      const { view } = renderView({});

      const button = view.getByLabelText('Show information');
      await act(async () => {
        await userEvent.click(button);
      });

      const tip = getTipContent(view, info);
      expect(tip).toBeVisible();

      await act(async () => {
        await userEvent.keyboard('{Escape}');
      });

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
      const { info, onClick } = createLinkSetup(linkText);
      const { view } = renderView({ info, onClick });

      const link = await openTipAndWaitForLink(view, linkText);

      await waitFor(() => {
        expect(link).toHaveFocus();
      });
    });

    it('closes the tip when Escape is pressed even when focus is on a link inside', async () => {
      const linkText = 'cool link';
      const { info, onClick } = createLinkSetup(linkText);
      const { view } = renderView({ info, onClick });

      const link = await openTipAndWaitForLink(view, linkText);

      await waitFor(() => {
        expect(link).toHaveFocus();
      });

      await act(async () => {
        await userEvent.keyboard('{Escape}');
      });

      await waitFor(() => {
        expect(link).not.toBeVisible();
      });
    });

    it('closes the tip when Escape is pressed even when focus is on an outside element', async () => {
      const { view } = renderView({});
      await testEscapeKeyWithOutsideFocus(view, info);
    });

    it('does not close the tip when Escape is pressed if a modal is open', async () => {
      const { view } = renderView({});

      const button = view.getByLabelText('Show information');
      await act(async () => {
        await userEvent.click(button);
      });

      const tip = getTipContent(view, info);
      expect(tip).toBeVisible();

      // Simulate a modal being present in the DOM
      const mockModal = document.createElement('div');
      mockModal.setAttribute('role', 'dialog');
      document.body.appendChild(mockModal);

      try {
        await act(async () => {
          await userEvent.keyboard('{Escape}');
        });

        // Tip should still be visible because modal is present
        await waitFor(() => {
          expect(tip).toBeVisible();
          expect(button).toHaveAttribute('aria-expanded', 'true');
        });
      } finally {
        document.body.removeChild(mockModal);
      }
    });
  });

  describe('floating placement', () => {
    it('shows the tip when it is clicked on', async () => {
      const { view } = renderView({
        placement: 'floating',
      });

      expect(view.queryByText(info)).toBeNull();

      await act(async () => {
        await userEvent.click(view.getByRole('button'));
      });

      // The first get by text result is the a11y text, the second is the actual tip text
      expect(view.queryAllByText(info).length).toBe(2);
    });

    it('closes the tip when Escape key is pressed and returns focus to the button', async () => {
      const { view } = renderView({
        placement: 'floating',
      });

      await testEscapeKeyCloseTip(view, info, true);
    });

    it('closes the tip with links when Escape key is pressed and returns focus to the button', async () => {
      const linkText = 'cool link';
      const { info, onClick } = createLinkSetup(
        linkText,
        'https://giphy.com/search/nichijou'
      );
      const { view } = renderView({
        placement: 'floating',
        info,
        onClick,
      });

      await testEscapeKeyCloseTip(view, linkText, true);
    });

    it('wraps focus to button when tabbing forward from last focusable element', async () => {
      const linkText = 'cool link';
      const { view, linkRef } = setupLinkTestWithPlacement(
        linkText,
        'floating',
        renderView
      );

      await testFocusWrap(view, linkText, linkRef, 'forward');
    });

    it('wraps focus to button when shift+tabbing backward from first focusable element', async () => {
      const linkText = 'cool link';
      const { view, linkRef } = setupLinkTestWithPlacement(
        linkText,
        'floating',
        renderView
      );

      await testFocusWrap(view, linkText, linkRef, 'backward');
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
      await testEscapeKeyWithOutsideFocus(view, info);
    });

    it('does not close the tip when Escape is pressed if a modal is open', async () => {
      const { view } = renderView({ placement: 'floating' });

      const button = view.getByLabelText('Show information');
      await act(async () => {
        await userEvent.click(button);
      });

      await waitFor(() => {
        expect(button).toHaveAttribute('aria-expanded', 'true');
        const tip = getTipContent(view, info);
        expect(tip).toBeVisible();
      });

      // Simulate a modal being present in the DOM
      const mockModal = document.createElement('div');
      mockModal.setAttribute('role', 'dialog');
      document.body.appendChild(mockModal);

      try {
        await act(async () => {
          await userEvent.keyboard('{Escape}');
        });

        // Tip should still be visible because modal is present
        await waitFor(() => {
          const tip = getTipContent(view, info);
          expect(tip).toBeVisible();
          expect(button).toHaveAttribute('aria-expanded', 'true');
        });
      } finally {
        document.body.removeChild(mockModal);
      }
    });
  });
});
