import { setupRtl } from '@codecademy/gamut-tests';
import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Disclosure } from '..';

const ctaCallback = jest.fn();

const defaultProps = {
  heading: 'hi there!',
  body: <div>This should render when expanded </div>,
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

  it('forwards data-* and aria-* attributes to the wrapper', () => {
    const { view } = renderView({
      'data-marker': 'probe',
      'aria-keyshortcuts': 'probeAria',
    } as any);

    const wrapper = view.container.firstChild;
    expect(wrapper).toHaveAttribute('data-marker', 'probe');
    expect(wrapper).toHaveAttribute('aria-keyshortcuts', 'probeAria');
  });

  it('forwards data-* and aria-* attributes from buttonProps to the toggle button', () => {
    const { view } = renderView({
      buttonProps: {
        'data-marker': 'probe',
        'aria-keyshortcuts': 'probeAria',
      },
    });

    const button = view.getByRole('button');
    expect(button).toHaveAttribute('data-marker', 'probe');
    expect(button).toHaveAttribute('aria-keyshortcuts', 'probeAria');
  });
});
