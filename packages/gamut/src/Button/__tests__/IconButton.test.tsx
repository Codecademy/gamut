import { StarIcon } from '@codecademy/gamut-icons';
import userEvent from '@testing-library/user-event';
import { setupRtl } from 'component-test-setup';

import { IconButton } from '../IconButton';
import { IconButtonFloatingMock } from './mocks';

const onClick = jest.fn();
const buttonProps = {
  'aria-label': 'Click me!',
  icon: StarIcon,
  onClick,
  tip: 'This is a button to click',
};

const renderView = setupRtl(IconButton, buttonProps);

const renderFloatingView = setupRtl(IconButtonFloatingMock, buttonProps);

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

  // TO-DO: When we upgrade jest, we can use `description` in the tests below to make sure they are semnantically connected to buttons.
  it('renders an inline tip', async () => {
    const { view } = renderView({});

    view.getByRole('tooltip', { name: 'This is a button to click' });
  });

  it('renders a floating tip', async () => {
    const { view } = renderFloatingView({});

    expect(view.queryByRole('tooltip')).toBeNull();

    const cta = view.getByRole('button');

    userEvent.hover(cta);

    view.getByRole('tooltip', { name: 'This is a button to click' });
  });
});
