import { setupRtl } from '@codecademy/gamut-tests';
import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Disclosure } from '..';

const ctaCallback = jest.fn();
const defaultProps = {
  header: 'hi there!',
  body: <div>This should render when expanded </div>,
  withBackground: false,
};
const renderView = setupRtl(Disclosure, defaultProps);

describe('Disclosure', () => {
  it('renders the DisclosureBody when DisclosureButton is clicked', async () => {
    const { view } = renderView({
      initiallyExpanded: false,
    });
    const DisclosureButton = view.getByRole('button');
    let DisclosureBodyText = view.queryByText(
      'This should render when expanded'
    );

    expect(DisclosureBodyText).toBeNull();
    expect(DisclosureButton.getAttribute('aria-expanded')).toBe('false');

    await act(async () => {
      await userEvent.click(DisclosureButton);
    });
    DisclosureBodyText = view.getByText('This should render when expanded');

    expect(DisclosureButton.getAttribute('aria-expanded')).toBe('true');
  });

  it('renders the body when `initiallyExpanded` is set to true', () => {
    const { view } = renderView({
      initiallyExpanded: true,
    });
    const DisclosureButton = view.getByRole('button');
    view.getByText('This should render when expanded');

    expect(DisclosureButton.getAttribute('aria-expanded')).toBe('true');
  });

  it("renders the DisclosureBody's button when supplied a `cta` and `ctaCallback` argument", async () => {
    const { view } = renderView({
      initiallyExpanded: true,
      ctaText: 'click here',
      ctaCallback,
    });
    const CTAButton = view.getByText('click here');
    await act(async () => {
      await userEvent.click(CTAButton);
    });

    expect(ctaCallback).toHaveBeenCalled();
  });
});
