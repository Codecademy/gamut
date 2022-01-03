import { setupRtl } from '@codecademy/gamut-tests';
import userEvent from '@testing-library/user-event';

import { AccordionButton } from '..';

const renderView = setupRtl(AccordionButton, {
  children: 'Hi there',
  onClick: jest.fn(),
  size: 'normal',
  theme: 'yellow',
});

describe('AccordionButton', () => {
  it('fires onClick when clicked', () => {
    const { props, view } = renderView();

    userEvent.click(view.getByRole('button'));

    expect(props.onClick).toHaveBeenCalledTimes(1);
  });
});
