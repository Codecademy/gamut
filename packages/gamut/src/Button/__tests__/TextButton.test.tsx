import { StarIcon } from '@codecademy/gamut-icons';
import userEvent from '@testing-library/user-event';
import { setupRtl } from 'component-test-setup';

import { TextButton } from '../TextButton';

const onClick = jest.fn();
const renderView = setupRtl(TextButton, {
  children: 'Click me!',
  onClick,
});

describe('TextButton', () => {
  it('renders a clickable button', async () => {
    const { view } = renderView();
    const cta = view.getByRole('button', { name: 'Click me!' });
    await userEvent.click(cta);

    expect(onClick).toHaveBeenCalled();
  });

  it('renders an leading decorative icon when an icon is provided', () => {
    const { view } = renderView({ icon: StarIcon });
    view.getByRole('img', { hidden: true });
  });
});
