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
  view: ReturnType<ReturnType<typeof setupRtl<typeof InfoTip>>['view']>
) => {
  const button = view.getByLabelText('Show information');
  await act(async () => {
    await userEvent.click(button);
  });
  return button;
};

export const waitForPopoverLink = async (
  view: ReturnType<ReturnType<typeof setupRtl<typeof InfoTip>>['view']>,
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

