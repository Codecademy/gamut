import { setupRtl } from '@codecademy/gamut-tests';
import userEvent from '@testing-library/user-event';

import { Accordion } from "..";

const defaultProps = {
  variant: 'default' as const,
  disabled: false,
  headingLevel : 'h3' as const,
  header: 'hi there!',
  overline: 'overline is optional',
  spacing: 'normal' as const,
  subheader: 'subheader is optional',
  body: <div data-testid="contents">This should render when expanded </div>,
  bodyBg: false,
  ctaText: 'Click me!',
  // what's a void function that doesn't do anything meaningful
  ctaCallback: () => {console.log('got clicked')}
};

const renderView = setupRtl(Accordion,  {});

// Test cases:
// Unexpanded:
// 1. the body text should not exist
//   a. when clicked the text should exist
// Expanded:
// 1. the body's text should exist
// 2. when there's a cta, the text matches?
// 3. when there's a cta, there's a ctaCallback
// 4. when the button is clicked ctaCallback is called
describe('Accordion', () => {
  it('displays the body when clicked', ()=> {
    const { view } = renderView({initiallyExpanded: false});

    const AccButton = view.getByRole('button');
    const AccBodyText = view.queryByText('This should render when expanded')
    expect(AccBodyText).toBeNull();

    userEvent.click(AccButton)

    expect(AccBodyText).toBeTruthy();
  })
})
