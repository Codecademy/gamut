import { setupRtl } from '@codecademy/gamut-tests';
import { act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';

import { Anchor } from '../../Anchor';
import { Text } from '../../Typography';
import { InfoTip } from '../InfoTip';

const info = 'I am information';
const renderView = setupRtl(InfoTip, {
  info,
});

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

      const button = view.getByLabelText('Show information');
      await act(async () => {
        await userEvent.click(button);
      });

      expect(view.queryAllByText(info).length).toBe(2);

      await act(async () => {
        await userEvent.keyboard('{Escape}');
      });

      await waitFor(() => {
        expect(view.queryByText(info)).toBeNull();
      });
      expect(button).toHaveFocus();
    });

    it('closes the tip with links when Escape key is pressed and returns focus to the button', async () => {
      const linkText = 'cool link';
      const linkRef = createRef<HTMLAnchorElement>();
      const { view } = renderView({
        placement: 'floating',
        info: (
          <Text>
            Hey! Here is a{' '}
            <Anchor href="https://giphy.com/search/nichijou" ref={linkRef}>
              {linkText}
            </Anchor>{' '}
            that is super important.
          </Text>
        ),
        onClick: ({ isTipHidden }: { isTipHidden: boolean }) => {
          if (!isTipHidden) {
            linkRef.current?.focus();
          }
        },
      });

      const button = view.getByLabelText('Show information');
      await act(async () => {
        await userEvent.click(button);
      });

      expect(view.queryAllByText(linkText).length).toBe(2);

      await act(async () => {
        await userEvent.keyboard('{Escape}');
      });

      await waitFor(() => {
        expect(view.queryByText(linkText)).toBeNull();
      });
      expect(button).toHaveFocus();
    });
  });
});
