import { StarIcon } from '@codecademy/gamut-icons';
import userEvent from '@testing-library/user-event';
import { setupRtl } from 'component-test-setup';

import { IconButton } from '../IconButton';
import { IconButtonFloatingMock } from './mocks';

const onClick = jest.fn();

const renderView = setupRtl(IconButton, {
  'aria-label': 'Click me!',
  icon: StarIcon,
  onClick,
  tip: 'This is a button to click',
});

const renderFloatingView = setupRtl(IconButtonFloatingMock, {
  icon: StarIcon,
  onClick,
  tip: 'Click me!',
});

describe('IconButton', () => {
  it('renders a clickable button', () => {
    const { view } = renderView();

    const cta = view.getByRole('button', { name: 'Click me!' });

    userEvent.click(cta);

    expect(onClick).toHaveBeenCalled();
  });
  it('renders an icon ', () => {
    const { view } = renderView();

    view.getByTitle('Star Icon');
  });

  it('renders a tip', async () => {
    const { view } = renderFloatingView({});

    expect(view.queryByRole('tooltip')).toBeNull();

    const cta = view.getByRole('button');

    userEvent.hover(cta);

    view.getByRole('tooltip');
  });
});
