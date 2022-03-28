import { setupRtl } from '@codecademy/gamut-tests';

import { Toggle } from '..';

const action = jest.fn();

const renderView = setupRtl(Toggle, {
  label: 'Toggle Text',
  checked: true,
  onChange: action,
});

describe('Toggle', () => {
  it('calls onChange', () => {
    const { view } = renderView();

    view.getByLabelText('Toggle Text').click();

    expect(action).toHaveBeenCalled();
  });
});
