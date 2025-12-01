import { setupRtl } from '@codecademy/gamut-tests';
import { act, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { InfoTip } from '../InfoTip';
import {
  createLinkSetup,
  expectTipToBeClosed,
  expectTipToBeVisible,
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
      const { view } = renderView({
        placement,
      });
      await testShowTipOnClick({ view, info, placement });
    });

    it('closes the tip when Escape key is pressed and returns focus to button', async () => {
      const { view } = renderView({
        placement,
      });
      await testEscapeKeyReturnsFocus({ view, info, placement });
    });

    it('closes the tip when Escape is pressed even when focus is on an outside element', async () => {
      const { view } = renderView({
        placement,
      });
      await testEscapeKeyWithOutsideFocus({ view, info });
    });

    it('does not close the tip when Escape is pressed if a modal is open', async () => {
      const { view } = renderView({
        placement,
      });
      await testModalDoesNotCloseInfoTip({ view, info, placement });
    });

    it('closes the tip when Escape is pressed if the InfoTip is inside a modal', async () => {
      await testInfoTipInsideModalClosesOnEscape({ info, placement });
    });

    it('calls onClick with isTipHidden: false when tip opens', async () => {
      const onClick = jest.fn();
      const { view } = renderView({
        placement,
        onClick,
      });

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
      const { view } = renderView({
        placement,
        onClick,
      });

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
      renderView({
        placement,
        onClick,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 100));
      });

      expect(onClick).not.toHaveBeenCalled();
    });

    it('closes the tip when clicking outside the wrapper', async () => {
      const { view } = renderView({
        placement,
      });
      await testOutsideClick({ view, info, placement });
    });

    it('handles rapid open/close cycles correctly', async () => {
      const onClick = jest.fn();
      const { view } = renderView({
        placement,
        onClick,
      });
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
  });

  describe('floating placement focus management', () => {
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
      const view = render(
        <>
          <InfoTip info="InfoTip A" />
          <InfoTip info="InfoTip B" />
          <InfoTip info="InfoTip C" />
        </>
      );

      await openInfoTipsWithKeyboard({ view, count: 3 });

      // Verify all are visible
      await waitFor(() => {
        expectTipToBeVisible({ view, text: 'InfoTip A' });
        expectTipToBeVisible({ view, text: 'InfoTip B' });
        expectTipToBeVisible({ view, text: 'InfoTip C' });
      });

      // Press Escape - all should close
      await pressKey('{Escape}');

      await waitFor(() => {
        expectTipToBeClosed({ view, text: 'InfoTip A' });
        expectTipToBeClosed({ view, text: 'InfoTip B' });
        expectTipToBeClosed({ view, text: 'InfoTip C' });
      });
    });

    it('closes all InfoTips when clicking outside', async () => {
      const view = render(
        <div>
          <InfoTip info="InfoTip A" />
          <InfoTip info="InfoTip B" />
          <div data-testid="outside">Outside</div>
        </div>
      );

      await openInfoTipsWithKeyboard({ view, count: 2 });

      // Verify both are visible
      await waitFor(() => {
        expectTipToBeVisible({ view, text: 'InfoTip A' });
        expectTipToBeVisible({ view, text: 'InfoTip B' });
      });

      // Click outside - both should close
      await userEvent.click(view.getByTestId('outside'));

      await waitFor(() => {
        expectTipToBeClosed({ view, text: 'InfoTip A' });
        expectTipToBeClosed({ view, text: 'InfoTip B' });
      });
    });

    it('works with both inline and floating placement InfoTips', async () => {
      const view = render(
        <>
          <InfoTip info="Inline InfoTip" placement="inline" />
          <InfoTip info="Floating InfoTip" placement="floating" />
        </>
      );

      await openInfoTipsWithKeyboard({ view, count: 2 });

      // Verify both are visible
      await waitFor(() => {
        expectTipToBeVisible({ view, text: 'Inline InfoTip' });
        expectTipToBeVisible({ view, text: 'Floating InfoTip' });
      });

      // Press Escape - both should close
      await pressKey('{Escape}');

      await waitFor(() => {
        expectTipToBeClosed({ view, text: 'Inline InfoTip' });
        expectTipToBeClosed({ view, text: 'Floating InfoTip' });
      });
    });
  });
});
