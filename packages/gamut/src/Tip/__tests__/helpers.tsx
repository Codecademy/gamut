import { setupRtl } from '@codecademy/gamut-tests';
import { act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, RefObject } from 'react';

import { Anchor } from '../../Anchor';
import { Text } from '../../Typography';
import { InfoTip, InfoTipProps } from '../InfoTip';
import { TipPlacements } from '../shared/types';

type InfoTipView = ReturnType<
  ReturnType<typeof setupRtl<typeof InfoTip>>
>['view'];

type Placement = NonNullable<InfoTipProps['placement']>;

type ViewParam = { view: InfoTipView };
type LinkTextParam = { linkText: string };
type InfoParam = { info: string };
type PlacementParam = { placement: Placement };

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
  const info = (
    <Text ref={containerRef} tabIndex={-1}>
      Hey! Here is a <Anchor href={href}>{linkText}</Anchor> that is super
      important.
    </Text>
  );
  return { containerRef, info, onClick: createFocusOnClick(containerRef) };
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
  const info = (
    <Text ref={containerRef} tabIndex={-1}>
      <Anchor href={firstHref}>{firstLinkText}</Anchor> and{' '}
      <Anchor href={secondHref}>{secondLinkText}</Anchor>
    </Text>
  );
  return { containerRef, info, onClick: createFocusOnClick(containerRef) };
};

export const clickButton = async (view: InfoTipView) => {
  const button = view.getByLabelText('Show information');
  await act(async () => {
    await userEvent.click(button);
  });
  return button;
};

export const pressKey = async (key: string) => {
  await act(async () => {
    await userEvent.keyboard(key);
  });
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
  await act(async () => {
    await userEvent.tab();
  });
  await waitFor(() => {
    expect(link).toHaveFocus();
  });
  return link;
};

export const testShowTipOnClick = async ({
  view,
  info,
  placement,
}: ViewParam & InfoParam & PlacementParam) => {
  const isInline = placement === 'inline';
  const tip = isInline ? view.getByText(info) : null;

  if (isInline) {
    expect(tip).not.toBeVisible();
  } else {
    expect(view.queryByText(info)).toBeNull();
  }

  await act(async () => {
    await userEvent.click(view.getByRole('button'));
  });

  if (isInline) {
    expect(tip?.parentElement).not.toHaveStyle({
      visibility: 'hidden',
      opacity: 0,
    });
    expect(tip).toBeVisible();
  } else {
    // The first get by text result is the a11y text, the second is the actual tip text
    expect(view.queryAllByText(info).length).toBe(2);
  }
};

export const testEscapeKeyReturnsFocus = async ({
  view,
  info,
  placement,
}: ViewParam & InfoParam & PlacementParam) => {
  const button = view.getByLabelText('Show information');
  await act(async () => {
    await userEvent.click(button);
  });

  const isInline = placement === 'inline';

  if (isInline) {
    const tip = getTipContent(view, info);
    expect(tip).toBeVisible();
  } else {
    await waitFor(() => {
      expect(view.getAllByText(info).length).toBeGreaterThan(0);
    });
  }

  await pressKey('{Escape}');

  await waitFor(() => {
    if (isInline) {
      expect(getTipContent(view, info)).not.toBeVisible();
    } else {
      expect(view.queryByText(info)).toBeNull();
    }
    expect(button).toHaveFocus();
  });
};

export const testFocusWrap = async ({
  view,
  containerRef,
  direction,
}: ViewParam & {
  containerRef: RefObject<HTMLDivElement>;
  direction: 'forward' | 'backward';
}) => {
  const button = await clickButton(view);

  await waitFor(
    () => {
      expect(containerRef.current).toBeTruthy();
      expect(containerRef.current).toHaveFocus();
    },
    { timeout: 2000 }
  );

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

export const getTipContent = (
  view: InfoTipView,
  text: string,
  useQuery = false
) => {
  const elements = view[useQuery ? 'queryAllByText' : 'getAllByText'](text);
  // Find the tip body (not the screenreader text with aria-live="assertive")
  return (
    elements.find((el) => el.getAttribute('aria-live') !== 'assertive') ??
    elements[0]
  );
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
  await clickButton(view);

  await waitFor(() => {
    expect(view.getByText(firstLinkText)).toBeVisible();
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
    expect(view.getByLabelText('Show information')).not.toHaveFocus();
  }
};

export const setupLinkTestWithPlacement = (
  linkText: string,
  placement: TipPlacements,
  renderView: ReturnType<typeof setupRtl<typeof InfoTip>>
) => {
  const { containerRef, info, onClick } = createLinkSetup({ linkText });
  const { view } = renderView({ placement, info, onClick });
  return { view, containerRef, info, onClick };
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
    const button = await clickButton(view);

    await waitFor(() => {
      expect(button).toHaveAttribute('aria-expanded', 'true');
      const tip = getTipContent(view, info);
      expect(tip).toBeVisible();
    });

    outsideButton.focus();
    expect(outsideButton).toHaveFocus();

    await pressKey('{Escape}');

    await waitFor(() => {
      expect(button).toHaveAttribute('aria-expanded', 'false');
      const tip = getTipContent(view, info, true);
      expect(tip).not.toBeVisible();
    });
  });
};

const assertTipOpen = async ({
  view,
  button,
  info,
  placement,
}: ViewParam & InfoParam & PlacementParam & { button: HTMLElement }) => {
  const isFloating = placement === 'floating';

  if (isFloating) {
    await waitFor(() => {
      expect(view.queryAllByText(info).length).toBe(2);
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });
  } else {
    expect(getTipContent(view, info)).toBeVisible();
    expect(button).toHaveAttribute('aria-expanded', 'true');
  }
};

const assertTipClosed = async ({
  view,
  button,
  info,
  placement,
}: ViewParam & InfoParam & PlacementParam & { button: HTMLElement }) => {
  const isFloating = placement === 'floating';

  await waitFor(() => {
    if (isFloating) {
      expect(view.queryByText(info)).toBeNull();
    } else {
      expect(getTipContent(view, info)).not.toBeVisible();
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

  await assertTipOpen({ view, button, info, placement });

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

  await assertTipOpen({ view, button, info, placement });

  const mockModal = document.createElement('div');
  mockModal.setAttribute('role', 'dialog');

  const isFloating = placement === 'floating';
  const parent = isFloating ? view.container : document.body;

  if (isFloating) {
    const modalButton = document.createElement('button');
    modalButton.textContent = 'Modal button';
    mockModal.appendChild(modalButton);
    await withTemporaryElement(mockModal, parent, async () => {
      modalButton.focus();
      await pressKey('{Escape}');
      await assertTipOpen({ view, button, info, placement });
    });
  } else {
    await withTemporaryElement(mockModal, parent, async () => {
      await pressKey('{Escape}');
      await assertTipOpen({ view, button, info, placement });
    });
  }
};

export const testRapidToggle = async ({
  view,
  onClick,
}: ViewParam & { onClick: jest.Mock }) => {
  const button = view.getByLabelText('Show information');

  await act(async () => {
    await userEvent.click(button);
  });
  await waitFor(() => expect(onClick).toHaveBeenCalledTimes(1));

  await act(async () => {
    await userEvent.click(button);
  });
  await waitFor(() => expect(onClick).toHaveBeenCalledTimes(2));

  await act(async () => {
    await userEvent.click(button);
  });
  await waitFor(() => expect(onClick).toHaveBeenCalledTimes(3));

  expect(onClick).toHaveBeenCalledTimes(3);
  expect(onClick).toHaveBeenNthCalledWith(1, { isTipHidden: false });
  expect(onClick).toHaveBeenNthCalledWith(2, { isTipHidden: true });
  expect(onClick).toHaveBeenNthCalledWith(3, { isTipHidden: false });
};
