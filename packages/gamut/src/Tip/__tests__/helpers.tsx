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

export const createFocusOnClick = (ref: RefObject<HTMLAnchorElement>) => {
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
  const linkRef = createRef<HTMLAnchorElement>();
  const info = (
    <Text>
      Hey! Here is a{' '}
      <Anchor href={href} ref={linkRef}>
        {linkText}
      </Anchor>{' '}
      that is super important.
    </Text>
  );
  return { linkRef, info, onClick: createFocusOnClick(linkRef) };
};

export const createMultiLinkSetup = (
  firstLinkText: string,
  secondLinkText: string,
  firstHref = 'https://example.com/1',
  secondHref = 'https://example.com/2'
) => {
  const firstLinkRef = createRef<HTMLAnchorElement>();
  const info = (
    <Text>
      <Anchor href={firstHref} ref={firstLinkRef}>
        {firstLinkText}
      </Anchor>{' '}
      and <Anchor href={secondHref}>{secondLinkText}</Anchor>
    </Text>
  );
  return { firstLinkRef, info, onClick: createFocusOnClick(firstLinkRef) };
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

export const waitForLinkFocus = async (
  linkRef: RefObject<HTMLAnchorElement>,
  link: HTMLElement
) => {
  await waitFor(
    () => {
      expect(linkRef.current).toBeTruthy();
      expect(linkRef.current).toBe(link);
    },
    { timeout: 2000 }
  );

  await waitFor(
    () => {
      expect(link).toHaveFocus();
    },
    { timeout: 2000 }
  );
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

  await act(async () => {
    await userEvent.keyboard('{Escape}');
  });

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
  linkText: string,
  linkRef: RefObject<HTMLAnchorElement>,
  direction: 'forward' | 'backward'
) => {
  const button = await clickButton(view);
  const link = await waitForPopoverLink(view, linkText);
  await waitForLinkFocus(linkRef, link);

  await act(async () => {
    const key = direction === 'forward' ? '{Tab}' : '{Shift>}{Tab}{/Shift}';
    await userEvent.keyboard(key);
  });

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

  const firstLink = view.getByRole('link', { name: firstLinkText });
  await waitFor(() => {
    expect(firstLink).toHaveFocus();
  });

  await act(async () => {
    await userEvent.keyboard('{Tab}');
  });

  const secondLink = view.getByRole('link', { name: secondLinkText });
  await waitFor(() => {
    expect(secondLink).toHaveFocus();
  });

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
  const { linkRef, info, onClick } = createLinkSetup(linkText);
  const { view } = renderView({ placement, info, onClick });
  return { view, linkRef, info, onClick };
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

    await act(async () => {
      await userEvent.keyboard('{Escape}');
    });

    await waitFor(() => {
      expect(button).toHaveAttribute('aria-expanded', 'false');
      const tip = getTipContent(view, contentToCheck, true);
      expect(tip).not.toBeVisible();
    });
  } finally {
    document.body.removeChild(outsideButton);
  }
};
