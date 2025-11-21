import { setupRtl } from '@codecademy/gamut-tests';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, RefObject } from 'react';

import { Anchor } from '../../Anchor';
import { Text } from '../../Typography';
import { InfoTip } from '../InfoTip';
import { TipPlacements } from '../shared/types';

type InfoTipView = ReturnType<
  ReturnType<typeof setupRtl<typeof InfoTip>>
>['view'];

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
  return { containerRef, info };
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
  return { containerRef, info };
};

export const clickButton = async (view: InfoTipView) => {
  const user = userEvent.setup();
  const button = view.getByRole('button');
  await user.click(button);
  return button;
};

export const pressKey = async (key: string) => {
  const user = userEvent.setup();
  await user.keyboard(key);
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
    expect(view.getByText(contentToCheck)).toBeVisible();
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  await pressKey('{Escape}');

  await waitFor(() => {
    expect(view.queryByText(contentToCheck)).toBeNull();
    expect(button).toHaveAttribute('aria-expanded', 'false');
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

  // Wait for the popover container to have focus (automatic focus behavior)
  await waitFor(
    () => {
      const popover = view.getByTestId('popover-content-container');
      expect(popover).toHaveFocus();
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

export const testTabFromPopoverWithNoInteractiveElements = async (
  view: InfoTipView
) => {
  const button = await clickButton(view);

  await waitFor(
    () => {
      const popover = view.getByTestId('popover-content-container');
      expect(popover).toHaveFocus();
    },
    { timeout: 2000 }
  );

  await pressKey('{Tab}');

  await waitFor(() => {
    expect(button).toHaveFocus();
  });
};

export const getTipContent = (
  view: InfoTipView,
  text: string,
  useQuery = false
) => {
  const getMethod = useQuery ? 'queryByText' : 'getByText';
  return view[getMethod](text);
};

export const testTabbingBetweenLinks = async (
  view: InfoTipView,
  firstLinkText: string,
  secondLinkText: string,
  placement: TipPlacements
) => {
  const button = await clickButton(view);

  await waitFor(() => {
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  await pressKey('{Tab}');
  const firstLink = await waitForLinkToHaveFocus(view, firstLinkText);

  await pressKey('{Tab}');
  await waitForLinkToHaveFocus(view, secondLinkText);

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
  const { containerRef, info } = createLinkSetup(linkText);
  const { view } = renderView({ placement, info });
  return { view, containerRef, info };
};

export const setupMultiLinkTestWithPlacement = (
  firstLinkText: string,
  secondLinkText: string,
  placement: TipPlacements,
  renderView: ReturnType<typeof setupRtl<typeof InfoTip>>
) => {
  const { info } = createMultiLinkSetup(firstLinkText, secondLinkText);
  const { view } = renderView({ placement, info });
  return { view, info };
};

export const testEscapeKeyWithOutsideFocus = async (
  view: InfoTipView,
  contentToCheck: string,
  isFloating: boolean
) => {
  const button = view.getByRole('button');

  const outsideButton = document.createElement('button');
  outsideButton.textContent = 'Outside Button';
  document.body.appendChild(outsideButton);

  try {
    const user = userEvent.setup();
    await user.click(button);

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
      // For floating tips, check popover is gone; for inline tips, check tip body is not visible
      if (isFloating) {
        expect(view.queryByTestId('popover-content-container')).toBeNull();
      } else {
        const tip = getTipContent(view, contentToCheck, true);
        expect(tip).not.toBeVisible();
      }
    });
  } finally {
    document.body.removeChild(outsideButton);
  }
};
