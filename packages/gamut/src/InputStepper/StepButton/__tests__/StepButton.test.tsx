import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';

import { StepButton } from '..';

const renderView = setupRtl(StepButton, {
  type: 'up',
  labelledBy: '',
});

jest.mock('@codecademy/gamut-icons', () => ({
  ...jest.requireActual<{}>('@codecademy/gamut-icons'),
  ArrowChevronDownIcon: () => (
    <svg>
      <title>Arrow Chevron Down Icon</title>
    </svg>
  ),
  ArrowChevronUpIcon: () => (
    <svg>
      <title>Arrow Chevron Up Icon</title>
    </svg>
  ),
}));

describe('<StepButton>', () => {
  it('shows the up chevron when used as an incrementer', () => {
    const { view } = renderView();

    view.getByTitle('Arrow Chevron Up Icon');
  });

  it('shows the down chevron when used as a decrementer', () => {
    const { view } = renderView({ type: 'down' });

    view.getByTitle('Arrow Chevron Down Icon');
  });

  it('processes the button click', () => {
    const onClick = jest.fn();
    const { view } = renderView({ onClick });

    const upButton = view.getByRole('button');

    fireEvent.click(upButton);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
