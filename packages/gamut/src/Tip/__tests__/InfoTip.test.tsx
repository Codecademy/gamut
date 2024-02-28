import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';

import { InfoTip } from '../InfoTip';

const info = 'I am information';
const renderView = setupRtl(InfoTip, {
  info: 'I am information',
});

describe('InfoTip', () => {
  describe('inline placement', () => {
    it('shows the tip when it is clicked on', () => {
      const { view } = renderView({});

      const tip = view.getByText(info);

      expect(tip).not.toBeVisible();

      fireEvent.click(view.getByRole('button'));

      expect(tip.parentElement).not.toHaveStyle({
        visibility: 'hidden',
        opacity: 0,
      });

      expect(tip).toBeVisible();
    });
  });

  describe('floating placement', () => {
    it('shows the tip when it is clicked on', () => {
      const { view } = renderView({
        placement: 'floating',
      });

      expect(view.queryByText(info)).toBeNull();

      fireEvent.click(view.getByRole('button'));

      // The first get by text result is the a11y text, the second is the actual tip text
      expect(view.queryAllByText(info).length).toBe(3);
    });
  });
});
