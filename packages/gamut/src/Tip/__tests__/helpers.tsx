import { setupRtl } from '@codecademy/gamut-tests';
import { act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, RefObject } from 'react';

import { Anchor } from '../../Anchor';
import { Text } from '../../Typography';
import { InfoTip } from '../InfoTip';
import { TipPlacements } from '../shared/types';

type InfoTipView = ReturnType<
  ReturnType<typeof setupRtl<typeof InfoTip>>
>['view'];

export const createFocusOnClick = (ref: RefObject<HTMLDivElement>) => {
  return ({ isTipHidden }: { isTipHidden: boolean }) => {
    if (!isTipHidden) {
      ref.current?.focus();
    }
  };
};

export const createLinkSetup = (
  linkText: string,
  href = 'https://example.com'
) => {
  const containerRef = createRef<HTMLDivElement>();
  const info = (
    <Text ref={containerRef} tabIndex={-1}>
      Hey! Here is a <Anchor href={href}>{linkText}</Anchor> that is super
      important.
    </Text>
  );
  return { containerRef, info, onClick: createFocusOnClick(containerRef) };
};

export const createMultiLinkSetup = (
  firstLinkText: string,
  secondLinkText: string,
  firstHref = 'https://example.com/1',
  secondHref = 'https://example.com/2'
) => {
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

export const waitForPopoverLink = async (
  view: InfoTipView,
  linkText: string
) => {
  return await waitFor(() => {
    const links = view.getAllByRole('link', { name: linkText });
    expect(links.length).toBe(1);
    return links[0];
  });
};

export const pressKey = async (key: string) => {
  await act(async () => {
    await userEvent.keyboard(key);
  });
};

export const waitForContainerFocus = async (
  containerRef: RefObject<HTMLDivElement>,
  container: HTMLElement
) => {
  await waitFor(
    () => {
      expect(containerRef.current).toBeTruthy();
      expect(containerRef.current).toBe(container);
      expect(container).toHaveFocus();
    },
    { timeout: 2000 }
  );
};

export const waitForLinkToHaveFocus = async (
  view: InfoTipView,
  linkText: string
) => {
  const link = view.getByRole('link', { name: linkText });
  await waitFor(() => {
    expect(link).toHaveFocus();
  });
  return link;
};

export const openTipAndWaitForLink = async (
  view: InfoTipView,
  linkText: string
) => {
  await clickButton(view);
  await waitFor(() => {
    expect(view.getByText(linkText)).toBeVisible();
  });
  return view.getByRole('link', { name: linkText });
};

export const testEscapeKeyCloseTip = async (
  view: InfoTipView,
  contentToCheck: string,
  shouldReturnFocus = false
) => {
  const button = await clickButton(view);

  await waitFor(() => {
    const elements = view.getAllByText(contentToCheck);
    expect(elements.length).toBeGreaterThan(0);
  });

  await pressKey('{Escape}');

  await waitFor(() => {
    expect(view.queryByText(contentToCheck)).toBeNull();
  });

  if (shouldReturnFocus) {
    await waitFor(() => {
      expect(button).toHaveFocus();
    });
  }
};

export const testFocusWrap = async (
  view: InfoTipView,
  containerRef: RefObject<HTMLDivElement>,
  direction: 'forward' | 'backward'
) => {
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
  const getAllMethod = useQuery ? 'queryAllByText' : 'getAllByText';
  const elements = view[getAllMethod](text);
  // Find the tip body (not the screenreader text with aria-live="assertive")
  return (
    elements.find((el) => el.getAttribute('aria-live') !== 'assertive') ||
    elements[0]
  );
};

export const testTabbingBetweenLinks = async (
  view: InfoTipView,
  firstLinkText: string,
  secondLinkText: string,
  placement: TipPlacements
) => {
  await clickButton(view);

  await waitFor(() => {
    expect(view.getByText(firstLinkText)).toBeVisible();
  });

  await pressKey('{Tab}');
  const firstLink = await waitForLinkToHaveFocus(view, firstLinkText);

  await pressKey('{Tab}');
  await waitForLinkToHaveFocus(view, secondLinkText);

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
  const { containerRef, info, onClick } = createLinkSetup(linkText);
  const { view } = renderView({ placement, info, onClick });
  return { view, containerRef, info, onClick };
};

export const setupMultiLinkTestWithPlacement = (
  firstLinkText: string,
  secondLinkText: string,
  placement: TipPlacements,
  renderView: ReturnType<typeof setupRtl<typeof InfoTip>>
) => {
  const { info, onClick } = createMultiLinkSetup(firstLinkText, secondLinkText);
  const { view } = renderView({ placement, info, onClick });
  return { view, info, onClick };
};

export const testEscapeKeyWithOutsideFocus = async (
  view: InfoTipView,
  contentToCheck: string
) => {
  const outsideButton = document.createElement('button');
  outsideButton.textContent = 'Outside Button';
  document.body.appendChild(outsideButton);

  try {
    const button = await clickButton(view);

    await waitFor(() => {
      expect(button).toHaveAttribute('aria-expanded', 'true');
      const tip = getTipContent(view, contentToCheck);
      expect(tip).toBeVisible();
    });

    outsideButton.focus();
    expect(outsideButton).toHaveFocus();

    await pressKey('{Escape}');

    await waitFor(() => {
      expect(button).toHaveAttribute('aria-expanded', 'false');
      const tip = getTipContent(view, contentToCheck, true);
      expect(tip).not.toBeVisible();
    });
  } finally {
    document.body.removeChild(outsideButton);
  }
};
