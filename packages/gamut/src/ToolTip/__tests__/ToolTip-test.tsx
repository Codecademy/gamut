import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';

import { ToolTip } from '..';

const children = 'Hello';

const renderView = setupRtl(ToolTip, {
  children,
  id: 'test-id',
  target: 'Target',
});

describe('ToolTip', () => {
  describe('inline placement', () => {
    it('does not give its container a tabIndex when it is not focusable', () => {
      const { view } = renderView({});

      expect(view.getByLabelText(children)).not.toHaveAttribute('tabIndex');
    });

    it('gives the container a tabIndex when it is focusable', () => {
      const children = 'Hello';
      const { view } = renderView({ focusable: true });

      expect(view.getByLabelText(children)).toHaveAttribute('tabIndex', '0');
    });

    it('does not give its container a role=button when it is not focusable', () => {
      const { view } = renderView({});

      expect(view.getByLabelText(children)).not.toHaveAttribute('role');
    });

    it('does give its container a role=button when it is focusable', () => {
      const { view } = renderView({ focusable: true });

      expect(view.getByRole('button'));
    });
  });

  describe('floating placement', () => {
    it('renders a ToolTip target and not the ToolTip until mouseover', () => {
      const { view } = renderView({
        placement: 'floating',
      });

      expect(view.getByText('Target'));
      expect(view.queryByText('Hello')).toBeNull();
    });

    it('renders the children on mouseover', () => {
      const { view } = renderView({
        placement: 'floating',
      });

      const target = view.getByText('Target');

      fireEvent.mouseOver(target);

      expect(view.getByText('Hello'));
    });

    it('does not give its container a tabIndex when it is not focusable', () => {
      const { view } = renderView({
        placement: 'floating',
      });

      expect(view.getByText('Target')).not.toHaveAttribute('tabIndex');
    });

    it('gives the container a tabIndex when it is focusable', () => {
      const { view } = renderView({
        focusable: true,
        placement: 'floating',
      });

      expect(view.getByText('Target')).toHaveAttribute('tabIndex', '0');
    });

    it('does not give its container a role=button when it is not focusable', () => {
      const { view } = renderView({
        placement: 'floating',
      });

      expect(view.getByText('Target')).not.toHaveAttribute('role');
    });

    it('does give its container a role=button when it is focusable', () => {
      const { view } = renderView({
        focusable: true,
        placement: 'floating',
      });

      const container = view.getByRole('button');

      expect(container).toBeDefined();
    });
  });
});
