import { setupRtl } from '@codecademy/gamut-tests';
import userEvent from '@testing-library/user-event';

import { Alert } from '../Alert';

describe('Alert', () => {
  const onClose = jest.fn();
  const onClick = jest.fn();

  const renderView = setupRtl(Alert, {
    onClose,
    children: 'Hello',
    variant: 'notice',
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('calls the onClose callback when the close button is clicked', () => {
    const { view } = renderView();

    const buttons = view.getAllByRole('button');

    expect(buttons.length).toBe(2);

    userEvent.click(buttons[1]);

    expect(onClose).toHaveBeenCalled();
  });

  it('renders a clickable CTA', () => {
    const { view } = renderView({ cta: { onClick, children: 'Click Me!' } });

    const cta = view.getByText('Click Me!');

    userEvent.click(cta);

    expect(onClick).toHaveBeenCalled();
  });

  it('renders the cta as a link if configured', () => {
    const { view } = renderView({
      cta: { children: 'Click Me', href: '/hello', onClick },
    });

    const cta = view.getByRole('link');

    userEvent.click(cta);

    expect(cta).toHaveAttribute('href', '/hello');
    expect(onClick).toHaveBeenCalled();
  });

  it('renders a clickable button to expand the truncated section', () => {
    const { view } = renderView();

    const buttons = view.getAllByRole('button');

    expect(buttons).toHaveLength(2);

    view.getByText('H');
    view.getByText('...');

    userEvent.click(buttons[0]);

    view.getByText('Hello');

    userEvent.click(buttons[0]);

    view.getByText('H');
    view.getByText('...');
  });
});
