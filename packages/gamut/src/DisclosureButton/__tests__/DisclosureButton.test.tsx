import { setupRtl } from '@codecademy/gamut-tests';
import {screen} from '@testing-library/dom'
import userEvent from '@testing-library/user-event';

import { DisclosureButton } from '..';


const defaultProps = {
  header: 'this is the heading',
};

const renderView = setupRtl(DisclosureButton, defaultProps);

describe('DisclosureButton', () => {
// Would I need to check for setState here?
  it('renders the header text', () => {
    const { view } = renderView({
      isExpanded: false,
    });

    view.getByText('this is the heading');
  })
  it('is clickable', () => {
    const { view } = renderView({
      isExpanded: false,
    });
    // when getting by text, it's not registered
    let DisclosureButton = view.getByRole('button')
    // screen.debug()
    expect(DisclosureButton.getAttribute('aria-expanded')).toBe('false')
    userEvent.click(DisclosureButton)
    DisclosureButton = view.getByRole('button')
    // expect(DisclosureButton.getAttribute('aria-expanded')).toBe('true')
  })
})
