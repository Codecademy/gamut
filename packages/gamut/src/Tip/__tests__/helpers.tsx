import { setupRtl } from '@codecademy/gamut-tests';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, RefObject } from 'react';

import { Anchor } from '../../Anchor';
import { Text } from '../../Typography';
import { InfoTip } from '../InfoTip';
import { TipPlacements } from '../shared/types';

type InfoTipView = ReturnType<
  ReturnType<typeof setupRtl<typeof InfoTip>>
>['view'];

type ViewParam = { view: InfoTipView };
type LinkTextParam = { linkText: string };
type InfoParam = { info: string };
type PlacementParam = { placement: TipPlacements };

export const createFocusOnClick = (ref: RefObject<HTMLDivElement>) => {
  return ({ isTipHidden }: { isTipHidden: boolean }) => {
    if (!isTipHidden) ref.current?.focus();
  };
};

export const createLinkSetup = ({
  linkText,
  href = 'https://example.com',
}: {
  linkText: string;
  href?: string;
}) => {
  const containerRef = createRef<HTMLDivElement>();
  const onClick = createFocusOnClick(containerRef);
  const info = (
    <Text ref={containerRef} tabIndex={-1}>
      Hey! Here is a <Anchor href={href}>{linkText}</Anchor> that is super
      important.
    </Text>
  );
  return { containerRef, info, onClick };
};

export const createMultiLinkSetup = ({
  firstLinkText,
  secondLinkText,
  firstHref = 'https://example.com/1',
  secondHref = 'https://example.com/2',
}: {
  firstLinkText: string;
  secondLinkText: string;
  firstHref?: string;
  secondHref?: string;
}) => {
  const containerRef = createRef<HTMLDivElement>();
  const onClick = createFocusOnClick(containerRef);
  const info = (
    <Text ref={containerRef} tabIndex={-1}>
      <Anchor href={firstHref}>{firstLinkText}</Anchor> and{' '}
      <Anchor href={secondHref}>{secondLinkText}</Anchor>
    </Text>
  );
  return { containerRef, info, onClick };
};

export const clickButton = async (view: InfoTipView) => {
  const button = view.getByRole('button');
  await userEvent.click(button);
  return button;
};

export const pressKey = async (key: string) => {
  await userEvent.keyboard(key);
};

export const waitForLinkToHaveFocus = async ({
  view,
  linkText,
}: ViewParam & LinkTextParam) => {
  const link = view.getByRole('link', { name: linkText });
  await waitFor(() => {
    expect(link).toHaveFocus();
  });
  return link;
};

export const openTipAndWaitForLink = async ({
  view,
  linkText,
}: ViewParam & LinkTextParam) => {
  await clickButton(view);
  await waitFor(() => {
    expect(view.getByText(linkText)).toBeVisible();
  });
  return view.getByRole('link', { name: linkText });
};

export const openTipTabToLinkAndWaitForFocus = async (
  view: InfoTipView,
  linkText: string
) => {
  const link = await openTipAndWaitForLink({ view, linkText });
  await userEvent.tab();
  await waitFor(() => {
    expect(link).toHaveFocus();
  });
  return link;
};

const waitForPopoverFocus = async (view: InfoTipView) => {
  await waitFor(
    () => {
      const popover = view.getByTestId('popover-content-container');
      expect(popover).toHaveFocus();
    },
    { timeout: 2000 }
  );
};

export const testFocusWrap = async ({
  view,
  direction,
}: ViewParam & {
  direction: 'forward' | 'backward';
}) => {
  const button = await clickButton(view);

  await waitForPopoverFocus(view);

  if (direction === 'forward') {
    await pressKey('{Tab}');
    await pressKey('{Tab}');
  } else {
    await pressKey('{Shift>}{Tab}{/Shift}');
  }

  await waitFor(() => {
    expect(button).toHaveFocus();
  });
};

export const testTabFromPopoverWithNoInteractiveElements = async (
  view: InfoTipView
) => {
  const button = await clickButton(view);

  await waitForPopoverFocus(view);

  await pressKey('{Tab}');

  await waitFor(() => {
    expect(button).toHaveFocus();
  });
};

export const testTabbingBetweenLinks = async ({
  view,
  firstLinkText,
  secondLinkText,
  placement,
}: ViewParam & {
  firstLinkText: string;
  secondLinkText: string;
  placement: TipPlacements;
}) => {
  const button = await clickButton(view);

  await waitFor(() => {
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  await pressKey('{Tab}');
  const firstLink = await waitForLinkToHaveFocus({
    view,
    linkText: firstLinkText,
  });

  await pressKey('{Tab}');
  await waitForLinkToHaveFocus({ view, linkText: secondLinkText });

  expect(firstLink).not.toHaveFocus();

  if (placement === 'floating') {
    expect(button).not.toHaveFocus();
  }
};

export const setupLinkTestWithPlacement = (
  linkText: string,
  placement: TipPlacements,
  renderView: ReturnType<typeof setupRtl<typeof InfoTip>>
) => {
  const { info, onClick } = createLinkSetup({ linkText });
  const { view } = renderView({ placement, info, onClick });
  return { view, info, onClick };
};

export const setupMultiLinkTestWithPlacement = (
  firstLinkText: string,
  secondLinkText: string,
  placement: TipPlacements,
  renderView: ReturnType<typeof setupRtl<typeof InfoTip>>
) => {
  const { info, onClick } = createMultiLinkSetup({
    firstLinkText,
    secondLinkText,
  });
  const { view } = renderView({ placement, info, onClick });
  return { view, info, onClick };
};

export const testEscapeKeyWithOutsideFocus = async ({
  view,
  info,
}: ViewParam & InfoParam) => {
  const outsideButton = document.createElement('button');
  outsideButton.textContent = 'Outside Button';

  await withTemporaryElement(outsideButton, document.body, async () => {
    const button = view.getByLabelText('Show information');
    await userEvent.click(button);

    await waitFor(() => {
      expect(button).toHaveAttribute('aria-expanded', 'true');
      expect(view.getByText(info)).toBeVisible();
    });

    outsideButton.focus();
    expect(outsideButton).toHaveFocus();

    await pressKey('{Escape}');

    await waitFor(() => {
      expect(button).toHaveAttribute('aria-expanded', 'false');
      const tip = view.queryByText(info);
      expect(tip).not.toBeVisible();
    });
  });
};

const assertTipOpen = async ({
  view,
  button,
  info,
}: ViewParam & InfoParam & { button: HTMLElement }) => {
  await waitFor(() => {
    expect(view.getByText(info)).toBeVisible();
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });
};

const assertTipClosed = async ({
  view,
  button,
  info,
  placement,
}: ViewParam & InfoParam & PlacementParam & { button: HTMLElement }) => {
  const isFloating = placement === 'floating';

  await waitFor(() => {
    const tip = view.queryByText(info);
    if (isFloating) {
      expect(tip).toBeNull();
    } else {
      expect(tip).not.toBeVisible();
    }
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });
};

const withTemporaryElement = async <T,>(
  element: HTMLElement,
  parent: HTMLElement,
  callback: () => Promise<T>
): Promise<T> => {
  parent.appendChild(element);
  try {
    return await callback();
  } finally {
    parent.removeChild(element);
  }
};

export const testOutsideClick = async ({
  view,
  info,
  placement,
}: ViewParam & InfoParam & PlacementParam) => {
  const button = await clickButton(view);

  await assertTipOpen({ view, button, info });

  const outsideElement = document.createElement('div');

  await withTemporaryElement(outsideElement, document.body, async () => {
    await userEvent.click(outsideElement);
    await assertTipClosed({ view, button, info, placement });
  });
};

export const testModalDoesNotCloseInfoTip = async ({
  view,
  info,
  placement,
}: ViewParam & InfoParam & PlacementParam) => {
  const button = await clickButton(view);

  await assertTipOpen({ view, button, info });

  const mockModal = document.createElement('div');
  mockModal.setAttribute('role', 'dialog');
  mockModal.setAttribute('aria-modal', 'true');

  const isFloating = placement === 'floating';
  const parent = isFloating ? view.container : document.body;

  if (isFloating) {
    const modalButton = document.createElement('button');
    modalButton.textContent = 'Modal button';
    mockModal.appendChild(modalButton);
    await withTemporaryElement(mockModal, parent, async () => {
      modalButton.focus();
      await pressKey('{Escape}');
      await assertTipOpen({ view, button, info });
    });
  } else {
    await withTemporaryElement(mockModal, parent, async () => {
      await pressKey('{Escape}');
      await assertTipOpen({ view, button, info });
    });
  }
};

export const testNonBlockingDialogAllowsEscapeToCloseTip = async ({
  view,
  info,
  placement,
}: ViewParam & InfoParam & PlacementParam) => {
  const button = await clickButton(view);

  await assertTipOpen({ view, button, info });

  const mockDialog = document.createElement('div');
  mockDialog.setAttribute('role', 'dialog');
  // No aria-modal="true" so it matches MODAL_SELECTOR but isFloatingElementOpen returns false

  const isFloating = placement === 'floating';
  const parent = isFloating ? view.container : document.body;

  await withTemporaryElement(mockDialog, parent, async () => {
    await pressKey('{Escape}');
    await assertTipClosed({ view, button, info, placement });
  });
};

export const testRapidToggle = async ({
  view,
  onClick,
}: ViewParam & { onClick: jest.Mock }) => {
  const button = view.getByLabelText('Show information');

  await userEvent.click(button);
  await waitFor(() => expect(onClick).toHaveBeenCalledTimes(1));

  await userEvent.click(button);
  await waitFor(() => expect(onClick).toHaveBeenCalledTimes(2));

  await userEvent.click(button);
  await waitFor(() => expect(onClick).toHaveBeenCalledTimes(3));

  expect(onClick).toHaveBeenCalledTimes(3);
  expect(onClick).toHaveBeenNthCalledWith(1, { isTipHidden: false });
  expect(onClick).toHaveBeenNthCalledWith(2, { isTipHidden: true });
  expect(onClick).toHaveBeenNthCalledWith(3, { isTipHidden: false });
};

export const testInfoTipInsideModalClosesOnEscape = async ({
  info,
  placement,
}: InfoParam & PlacementParam) => {
  const { InfoTipInsideModalMock } = await import('./mocks');
  const renderView = setupRtl(InfoTipInsideModalMock, { info, placement });
  const { view } = renderView();

  const openModalButton = view.getByRole('button', { name: 'Open Modal' });
  await userEvent.click(openModalButton);

  await waitFor(() => {
    expect(view.getByRole('dialog')).toBeInTheDocument();
  });

  const infoTipButton = view.getByLabelText('Show information');
  await userEvent.click(infoTipButton);

  await waitFor(() => {
    expect(view.getByText(info)).toBeVisible();
  });

  await pressKey('{Escape}');

  await waitFor(() => {
    expect(view.queryByText(info)).not.toBeVisible();
  });

  expect(view.getByRole('dialog')).toBeInTheDocument();
};

type ViewWithQueries = {
  getAllByText: (text: string) => HTMLElement[];
  getAllByLabelText: (text: string) => HTMLElement[];
};

export const openInfoTipsWithKeyboard = async ({
  view,
  count,
}: {
  view: ViewWithQueries;
  count: number;
}) => {
  const buttons = view.getAllByLabelText('Show information');

  await act(async () => {
    buttons[0].focus();
    await userEvent.keyboard('{Enter}');

    for (let i = 1; i < count; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await userEvent.tab();
      // eslint-disable-next-line no-await-in-loop
      await userEvent.keyboard('{Enter}');
    }
  });

  // Wait for all tips to finish opening
  await waitFor(() => {
    buttons.forEach((button) => {
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });
  });
};

export const expectTipsVisible = (tips: { text: string }[]) => {
  tips.forEach(({ text }) => {
    const element = screen.queryByText(text);
    expect(element).toBeInTheDocument();
  });
};

export const expectTipsClosed = () => {
  const buttons = screen.getAllByLabelText('Show information');
  buttons.forEach((button) => {
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });
};
