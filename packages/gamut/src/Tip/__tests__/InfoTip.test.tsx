import { setupRtl } from '@codecademy/gamut-tests';
import { act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { InfoTip } from '../InfoTip';
import {
  createLinkSetup,
  expectTipsClosed,
  expectTipsVisible,
  openInfoTipsWithKeyboard,
  openTipTabToLinkAndWaitForFocus,
  pressKey,
  setupLinkTestWithPlacement,
  setupMultiLinkTestWithPlacement,
  testEscapeKeyReturnsFocus,
  testEscapeKeyWithOutsideFocus,
  testFocusWrap,
  testInfoTipInsideModalClosesOnEscape,
  testModalDoesNotCloseInfoTip,
  testOutsideClick,
  testRapidToggle,
  testShowTipOnClick,
  testTabbingBetweenLinks,
} from './helpers';
import { MultipleInfoTipsMock } from './mocks';

const infoText = 'I am information';
const linkText = 'cool link';
const renderView = setupRtl(InfoTip, {
  info: infoText,
});

describe('InfoTip', () => {
  describe.each<{ placement: 'inline' | 'floating' }>([
    { placement: 'inline' },
    { placement: 'floating' },
  ])('$placement placement', ({ placement }) => {
    it('shows the tip when it is clicked on', async () => {
      const { view } = renderView({ placement });
      await testShowTipOnClick({ view, info: infoText, placement });
    });

    it('closes the tip when Escape key is pressed and returns focus to button', async () => {
      const { view } = renderView({ placement });
      await testEscapeKeyReturnsFocus({ view, info: infoText, placement });
    });

    it('closes the tip when Escape is pressed even when focus is on an outside element', async () => {
      const { view } = renderView({ placement });
      await testEscapeKeyWithOutsideFocus({ view, info: infoText });
    });

    it('does not close the tip when Escape is pressed if a modal is open', async () => {
      const { view } = renderView({ placement });
      await testModalDoesNotCloseInfoTip({ view, info: infoText, placement });
    });

    it('closes the tip when Escape is pressed if the InfoTip is inside a modal', async () => {
      await testInfoTipInsideModalClosesOnEscape({
        info: infoText,
        placement,
      });
    });

    it('calls onClick with isTipHidden: false when tip opens', async () => {
      const onClick = jest.fn();
      const { view } = renderView({ placement, onClick });
      const button = view.getByLabelText('Show information');

      await act(async () => {
        await userEvent.click(button);
      });

      await waitFor(() => {
        expect(onClick).toHaveBeenCalledWith({ isTipHidden: false });
      });
    });

    it('calls onClick with isTipHidden: true when tip closes', async () => {
      const onClick = jest.fn();
      const { view } = renderView({ placement, onClick });
      const button = view.getByLabelText('Show information');

      await act(async () => {
        await userEvent.click(button);
      });

      await waitFor(() => {
        expect(onClick).toHaveBeenCalledWith({ isTipHidden: false });
      });

      onClick.mockClear();

      await act(async () => {
        await userEvent.click(button);
      });

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

    it('closes the tip when clicking outside the wrapper', async () => {
      const { view } = renderView({ placement });
      await testOutsideClick({ view, info: infoText, placement });
    });

    it('handles rapid open/close cycles correctly', async () => {
      const onClick = jest.fn();
      const { view } = renderView({ placement, onClick });
      await testRapidToggle({ view, onClick });
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
    describe.each<{ direction: 'forward' | 'backward' }>([
      { direction: 'forward' },
      { direction: 'backward' },
    ])('$direction tabbing', ({ direction }) => {
      it(`wraps focus to button when ${
        direction === 'forward'
          ? 'tabbing forward from last'
          : 'shift+tabbing backward from first'
      } focusable element`, async () => {
        const { view, containerRef } = setupLinkTestWithPlacement(
          linkText,
          'floating',
          renderView
        );

        await testFocusWrap({ view, containerRef, direction });
      });
    });

    it('does not wrap focus when tabbing from non-last focusable element', async () => {
      const firstLinkText = 'first link';
      const secondLinkText = 'second link';
      const { view } = setupMultiLinkTestWithPlacement(
        firstLinkText,
        secondLinkText,
        'floating',
        renderView
      );

      const button = view.getByLabelText('Show information');
      await act(async () => {
        await userEvent.click(button);
      });

      await waitFor(() => {
        expect(view.getByText(firstLinkText)).toBeVisible();
      });

      await act(async () => {
        await userEvent.tab();
      });

      const firstLink = await waitFor(() => {
        const link = view.getByRole('link', { name: firstLinkText });
        expect(link).toHaveFocus();
        return link;
      });

      await act(async () => {
        await userEvent.tab();
      });

      await waitFor(() => {
        const secondLink = view.getByRole('link', { name: secondLinkText });
        expect(secondLink).toHaveFocus();
        expect(button).not.toHaveFocus();
        expect(firstLink).not.toHaveFocus();
      });
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
        expectTipsClosed(tips.map(({ info }) => ({ text: info })));
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
        expectTipsClosed(tips.map(({ info }) => ({ text: info })));
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
        expectTipsVisible(
          tips.map(({ info, placement }) => ({ text: info, placement }))
        );
      });

      await pressKey('{Escape}');

      await waitFor(() => {
        expectTipsClosed(
          tips.map(({ info, placement }) => ({ text: info, placement }))
        );
      });
    });
  });
});
