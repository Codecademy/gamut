import { setupRtl } from '@codecademy/gamut-tests';
import userEvent from '@testing-library/user-event';

import { Accordion } from '..';

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
  ctaText: 'testing',
  ctaCallback,
};

const renderView = setupRtl(Accordion, defaultProps);

// Test cases:
// Unexpanded:
// 1. the body text should not exist
//   a. when clicked the text should exist
// 2. aria-label should be unexpanded
// Expanded:
// 1. aria-label should be unexpanded
// 2. the body's text should exist
// 3. when there's a cta, the text matches?
// 4. when there's a cta, there's a ctaCallback
// 5. when the button is clicked ctaCallback is called
describe('Accordion', () => {
  it('displays the body when clicked', () => {
    const { view } = renderView({
      initiallyExpanded: false,
      headingLevel: 'h3',
      withBackground: false,
    });

    const AccButton = view.getByRole('button');
    let AccBodyText = view.queryByText('This should render when expanded');
    expect(AccBodyText).toBeNull();

    userEvent.click(AccButton);

    AccBodyText = view.queryByText('This should render when expanded');
    expect(AccBodyText).toBeTruthy();
  });
});
