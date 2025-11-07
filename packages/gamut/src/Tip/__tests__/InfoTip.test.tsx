import { setupRtl } from '@codecademy/gamut-tests';
import { act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, RefObject } from 'react';

import { Anchor } from '../../Anchor';
import { Text } from '../../Typography';
import { InfoTip } from '../InfoTip';

const info = 'I am information';
const renderView = setupRtl(InfoTip, {
  info,
});

const createFocusOnClick = (ref: RefObject<HTMLAnchorElement>) => {
  return ({ isTipHidden }: { isTipHidden: boolean }) => {
    if (!isTipHidden) {
      ref.current?.focus();
    }
  };
};

const createLinkSetup = (linkText: string, href = 'https://example.com') => {
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

const createMultiLinkSetup = (
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

const clickButton = async (view: ReturnType<typeof renderView>['view']) => {
  const button = view.getByLabelText('Show information');
  await act(async () => {
    await userEvent.click(button);
  });
  return button;
};

const waitForPopoverLink = async (
  view: ReturnType<typeof renderView>['view'],
  linkText: string
) => {
  return await waitFor(() => {
    const links = view.getAllByRole('link', { name: linkText });
    expect(links.length).toBe(1);
    return links[0];
  });
};

const waitForLinkFocus = async (
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

describe('InfoTip', () => {
  describe('inline placement', () => {
    it('shows the tip when it is clicked on', async () => {
      const { view } = renderView({});

      const tip = view.getByText(info);

      expect(tip).not.toBeVisible();

      await act(async () => {
        await userEvent.click(view.getByRole('button'));
      });

      expect(tip.parentElement).not.toHaveStyle({
        visibility: 'hidden',
        opacity: 0,
      });

      expect(tip).toBeVisible();
    });

    it('closes the tip when Escape key is pressed', async () => {
      const { view } = renderView({});

      const button = view.getByLabelText('Show information');
      await act(async () => {
        await userEvent.click(button);
      });

      // For inline placement, get the tip body (not the screenreader text)
      const tip =
        view
          .getAllByText(info)
          .find((el) => el.getAttribute('aria-live') !== 'assertive') ||
        view.getAllByText(info)[0];
      expect(tip).toBeVisible();

      await act(async () => {
        await userEvent.keyboard('{Escape}');
      });

      await waitFor(() => {
        expect(tip).not.toBeVisible();
      });
    });

    it('allows normal tabbing through focusable elements within tip', async () => {
      const firstLinkText = 'first link';
      const secondLinkText = 'second link';
      const { info, onClick } = createMultiLinkSetup(
        firstLinkText,
        secondLinkText
      );
      const { view } = renderView({ info, onClick });

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
    });

    it('allows focus to move to links within the tip', async () => {
      const linkText = 'cool link';
      const { info, onClick } = createLinkSetup(linkText);
      const { view } = renderView({ info, onClick });

      await clickButton(view);

      await waitFor(() => {
        expect(view.getByText(linkText)).toBeVisible();
      });

      const link = view.getByRole('link', { name: linkText });
      await waitFor(() => {
        expect(link).toHaveFocus();
      });
    });
  });

  describe('floating placement', () => {
    it('shows the tip when it is clicked on', async () => {
      const { view } = renderView({
        placement: 'floating',
      });

      expect(view.queryByText(info)).toBeNull();

      await act(async () => {
        await userEvent.click(view.getByRole('button'));
      });

      // The first get by text result is the a11y text, the second is the actual tip text
      expect(view.queryAllByText(info).length).toBe(2);
    });

    it('closes the tip when Escape key is pressed and returns focus to the button', async () => {
      const { view } = renderView({
        placement: 'floating',
      });

      const button = await clickButton(view);

      expect(view.queryAllByText(info).length).toBe(2);

      await act(async () => {
        await userEvent.keyboard('{Escape}');
      });

      await waitFor(() => {
        expect(view.queryByText(info)).toBeNull();
      });
      await waitFor(() => {
        expect(button).toHaveFocus();
      });
    });

    it('closes the tip with links when Escape key is pressed and returns focus to the button', async () => {
      const linkText = 'cool link';
      const { info, onClick } = createLinkSetup(
        linkText,
        'https://giphy.com/search/nichijou'
      );
      const { view } = renderView({
        placement: 'floating',
        info,
        onClick,
      });

      const button = await clickButton(view);

      await waitFor(() => {
        const links = view.getAllByRole('link', { name: linkText });
        expect(links.length).toBe(1);
      });

      await act(async () => {
        await userEvent.keyboard('{Escape}');
      });

      await waitFor(() => {
        expect(view.queryByText(linkText)).toBeNull();
      });
      await waitFor(() => {
        expect(button).toHaveFocus();
      });
    });

    it('wraps focus to button when tabbing forward from last focusable element', async () => {
      const linkText = 'cool link';
      const { linkRef, info, onClick } = createLinkSetup(linkText);
      const { view } = renderView({
        placement: 'floating',
        info,
        onClick,
      });

      const button = await clickButton(view);

      const link = await waitForPopoverLink(view, linkText);
      await waitForLinkFocus(linkRef, link);

      await act(async () => {
        await userEvent.keyboard('{Tab}');
      });

      await waitFor(() => {
        expect(button).toHaveFocus();
      });
    });

    it('wraps focus to button when shift+tabbing backward from first focusable element', async () => {
      const linkText = 'cool link';
      const { linkRef, info, onClick } = createLinkSetup(linkText);
      const { view } = renderView({
        placement: 'floating',
        info,
        onClick,
      });

      const button = await clickButton(view);

      const link = await waitForPopoverLink(view, linkText);
      await waitForLinkFocus(linkRef, link);

      await act(async () => {
        await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
      });

      await waitFor(() => {
        expect(button).toHaveFocus();
      });
    });

    it('allows normal tabbing between focusable elements within popover', async () => {
      const firstLinkText = 'first link';
      const secondLinkText = 'second link';
      const { firstLinkRef, info, onClick } = createMultiLinkSetup(
        firstLinkText,
        secondLinkText
      );
      const { view } = renderView({
        placement: 'floating',
        info,
        onClick,
      });

      await clickButton(view);

      const firstLink = await waitForPopoverLink(view, firstLinkText);

      await waitFor(
        () => {
          expect(firstLinkRef.current).toBeTruthy();
          expect(firstLinkRef.current).toBe(firstLink);
          expect(firstLink).toHaveFocus();
        },
        { timeout: 2000 }
      );

      await act(async () => {
        await userEvent.keyboard('{Tab}');
      });

      const secondLink = view.getByRole('link', { name: secondLinkText });
      await waitFor(() => {
        expect(secondLink).toHaveFocus();
      });
      expect(view.getByLabelText('Show information')).not.toHaveFocus();
    });
  });
});
