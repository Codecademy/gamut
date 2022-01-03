import { setupRtl } from '@codecademy/gamut-tests';
import userEvent from '@testing-library/user-event';

import { StepButton } from '..';

const renderView = setupRtl(StepButton, {
  type: 'up',
  onClick: jest.fn(),
  labelledBy: '',
});

describe('<StepButton>', () => {
  it('shows the up chevron when used as an incrementer', () => {
    const { view } = renderView({ type: 'up' });

    view.getByTitle('Arrow Chevron Up Icon');
  });

  it('shows the down chevron when used as a decrementer', () => {
    const { view } = renderView({ type: 'down' });

    view.getByTitle('Arrow Chevron Down Icon');
  });

  it('processes the button click', () => {
    const onClick = jest.fn();
    const { view } = renderView({ onClick });

    userEvent.click(view.getByRole('button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
