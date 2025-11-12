import { setupRtl } from '@codecademy/gamut-tests';
import { act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, RefObject } from 'react';

import { Anchor } from '../../Anchor';
import { Text } from '../../Typography';
import { InfoTip } from '../InfoTip';

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

export const clickButton = async (
  view: ReturnType<ReturnType<typeof setupRtl<typeof InfoTip>>>['view']
) => {
  const button = view.getByLabelText('Show information');
  await act(async () => {
    await userEvent.click(button);
  });
  return button;
};

export const waitForPopoverLink = async (
  view: ReturnType<ReturnType<typeof setupRtl<typeof InfoTip>>>['view'],
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
  view: ReturnType<ReturnType<typeof setupRtl<typeof InfoTip>>>['view'],
  linkText: string
) => {
  await clickButton(view);
  await waitFor(() => {
    expect(view.getByText(linkText)).toBeVisible();
  });
  return view.getByRole('link', { name: linkText });
};

export const testEscapeKeyCloseTip = async (
  view: ReturnType<ReturnType<typeof setupRtl<typeof InfoTip>>>['view'],
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
  view: ReturnType<ReturnType<typeof setupRtl<typeof InfoTip>>>['view'],
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

export const testTabbingBetweenLinks = async (
  view: ReturnType<ReturnType<typeof setupRtl<typeof InfoTip>>>['view'],
  firstLinkText: string,
  secondLinkText: string,
  placement: 'inline' | 'floating'
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
