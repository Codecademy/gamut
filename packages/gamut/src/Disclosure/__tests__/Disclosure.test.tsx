import { setupRtl } from '@codecademy/gamut-tests';
import userEvent from '@testing-library/user-event';

import { Disclosure } from '..';

// const defaultProps = {
//   variant: 'default' as const,
//   disabled: false,
//   headingLevel : 'h3' as const,
//   initiallyExpanded: false,
//   header: 'hi there!',
//   overline: 'overline is optional',
//   spacing: 'normal' as const,
//   subheader: 'subheader is optional',
//   body: <div data-testid="contents">This should render when expanded </div>,
//   bodyBg: false,
//   ctaText: 'Click me!',
//   // what's a void function that doesn't do anything meaningful
//   ctaCallback: () => {console.log('got clicked')}
// };

const ctaCallback = jest.fn();

// will need to change once overline and byline are not default props
const defaultProps = {
  header: 'hi there!',
  body: <div data-testid="contents">This should render when expanded </div>,
  withBackground: false,
};

const renderView = setupRtl(Disclosure, defaultProps);

// Test cases:
// Unexpanded:
// 1. the body text should not exist
//   a. when clicked the text should exist
// 2. aria-label should be unexpanded
describe('Disclosure', () => {
  it('renders the DisclosureArea when DisclosureButton is clicked', () => {
    const { view } = renderView({
      initiallyExpanded: false,
    });

    const DisclosureButton = view.getByRole('button');
    let DisclosureBodyText = view.queryByText('This should render when expanded');
    expect(DisclosureBodyText).toBeNull();
    expect(DisclosureButton.getAttribute('aria-expanded')).toBe('false')

    userEvent.click(DisclosureButton);

    DisclosureBodyText = view.queryByText('This should render when expanded');
    expect(DisclosureBodyText).toBeTruthy();
    expect(DisclosureButton.getAttribute('aria-expanded')).toBe('true')
  });

// Expanded:
// 1. aria-label should be unexpanded
// 2. the body's text should exist
// 3. when there's a cta, the text matches?
// 4. when there's a cta, there's a ctaCallback
// 5. when the button is clicked ctaCallback is called
  it('renders the body when `initiallyExpanded` is set to true', () => {
    const { view } = renderView({
      initiallyExpanded: true,
    });

    const DisclosureButton = view.getByRole('button');
    const DisclosureBodyText = view.queryByText('This should render when expanded');

    expect(DisclosureButton.getAttribute('aria-expanded')).toBe('true')
    expect(DisclosureBodyText).toBeTruthy();
  });

  it('renders the DisclosureArea\'s button when supplied a `cta` and `ctaCallback` argument', () => {
    const { view } = renderView({
      initiallyExpanded: true,
      ctaText: 'click here',
      ctaCallback
    });

    const CTAButton = view.getByText('click here');
    userEvent.click(CTAButton)
    expect(ctaCallback).toBeCalled();
  });
});
