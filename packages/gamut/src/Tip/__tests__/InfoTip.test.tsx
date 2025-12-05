import { setupRtl } from '@codecademy/gamut-tests';
import { act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { InfoTip } from '../InfoTip';
import {
  clickButton,
  createLinkSetup,
  expectTipsClosed,
  expectTipsVisible,
  openInfoTipsWithKeyboard,
  openTipTabToLinkAndWaitForFocus,
  pressKey,
  setupLinkTestWithPlacement,
  setupMultiLinkTestWithPlacement,
  testEscapeKeyWithOutsideFocus,
  testFocusWrap,
  testInfoTipInsideModalClosesOnEscape,
  testModalDoesNotCloseInfoTip,
  testOutsideClick,
  testRapidToggle,
  testTabbingBetweenLinks,
  testTabFromPopoverWithNoInteractiveElements,
} from './helpers';
import { MultipleInfoTipsMock } from './mocks';

const info = 'I am information';
const linkText = 'cool link';
const renderView = setupRtl(InfoTip, {
  ariaLabel: 'Show information',
  info,
});

describe('InfoTip', () => {
  describe.each<{ placement: 'inline' | 'floating' }>([
    { placement: 'inline' },
    { placement: 'floating' },
  ])('$placement placement', ({ placement }) => {
    it('shows the tip when it is clicked on', async () => {
      const { view } = renderView({ placement });

      const isInline = placement === 'inline';

      if (isInline) {
        const tip = view.getByText(info);
        expect(tip).not.toBeVisible();
      } else {
        expect(view.queryByText(info)).toBeNull();
      }

      await userEvent.click(view.getByRole('button'));

      if (isInline) {
        const tip = view.getByText(info);
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

      await waitFor(() => {
        expect(view.getByText(info)).toBeVisible();
      });

      await pressKey('{Escape}');

      await waitFor(() => {
        const tip = view.queryByText(info);
        if (placement === 'inline') {
          expect(tip).not.toBeVisible();
        } else {
          expect(tip).toBeNull();
        }
        expect(button).toHaveFocus();
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

    it('closes the tip when Escape is pressed if the InfoTip is inside a modal', async () => {
      await testInfoTipInsideModalClosesOnEscape({ info, placement });
    });

    it('closes the tip when clicking outside the wrapper', async () => {
      const { view } = renderView({ placement });
      await testOutsideClick({ view, info, placement });
    });

    it('handles rapid open/close cycles correctly', async () => {
      const onClick = jest.fn();
      const { view } = renderView({ placement, onClick });
      await testRapidToggle({ view, onClick });
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

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 100));
      });

      expect(onClick).not.toHaveBeenCalled();
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
      const { info, onClick } = createLinkSetup({ linkText });
      const { view } = renderView({ placement, info, onClick });

      await openTipTabToLinkAndWaitForFocus(view, linkText);
    });

    it('closes the tip when Escape is pressed even when focus is on a link inside', async () => {
      const { info, onClick } = createLinkSetup({ linkText });
      const { view } = renderView({ placement, info, onClick });

      const link = await openTipTabToLinkAndWaitForFocus(view, linkText);

      await pressKey('{Escape}');

      await waitFor(() => {
        expect(link).not.toBeVisible();
      });
    });
  });

  describe('floating placement focus management', () => {
    const linkText = 'cool link';

    describe.each<{ direction: 'forward' | 'backward' }>([
      { direction: 'forward' },
      { direction: 'backward' },
    ])('$direction tabbing', ({ direction }) => {
      it(`wraps focus to button when ${
        direction === 'forward'
          ? 'tabbing forward from last'
          : 'shift+tabbing backward from first'
      } focusable element`, async () => {
        const { view } = setupLinkTestWithPlacement(
          linkText,
          'floating',
          renderView
        );

        await testFocusWrap({ view, direction });
      });
    });

    it('wraps focus to button when tabbing from popover with no interactive elements', async () => {
      const { view } = renderView({ placement: 'floating' });
      await testTabFromPopoverWithNoInteractiveElements(view);
    });
  });

  describe('ariaLabel', () => {
    it('applies aria-label when provided', () => {
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

  describe('Multiple InfoTips', () => {
    it('closes all InfoTips when Escape is pressed', async () => {
      const tips = [
        { id: 'tip-a', info: 'InfoTip A' },
        { id: 'tip-b', info: 'InfoTip B' },
        { id: 'tip-c', info: 'InfoTip C' },
      ];
      const { view } = setupRtl(MultipleInfoTipsMock, { tips })();

      await openInfoTipsWithKeyboard({ view, count: tips.length });

      await waitFor(() => {
        expectTipsVisible(tips.map(({ info }) => ({ text: info })));
      });

      await pressKey('{Escape}');

      await waitFor(() => {
        expectTipsClosed();
      });
    });

    it('closes all InfoTips when clicking outside', async () => {
      const tips = [
        { id: 'tip-a', info: 'InfoTip A' },
        { id: 'tip-b', info: 'InfoTip B' },
      ];
      const { view } = setupRtl(MultipleInfoTipsMock, {
        tips,
        includeOutsideElement: true,
      })();

      await openInfoTipsWithKeyboard({ view, count: tips.length });

      await waitFor(() => {
        expectTipsVisible(tips.map(({ info }) => ({ text: info })));
      });

      await userEvent.click(view.getByTestId('outside'));

      await waitFor(() => {
        expectTipsClosed();
      });
    });

    it('closes multiple InfoTips with different placements', async () => {
      const tips = [
        { id: 'tip-1', info: 'First Tip', placement: 'inline' as const },
        { id: 'tip-2', info: 'Second Tip', placement: 'floating' as const },
        { id: 'tip-3', info: 'Third Tip', placement: 'inline' as const },
      ];
      const { view } = setupRtl(MultipleInfoTipsMock, { tips })();

      await openInfoTipsWithKeyboard({ view, count: tips.length });

      await waitFor(() => {
        expectTipsVisible(tips.map(({ info }) => ({ text: info })));
      });

      await pressKey('{Escape}');

      await waitFor(() => {
        expectTipsClosed();
      });
    });
  });
});
