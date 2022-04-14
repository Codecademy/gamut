import { setupRtl } from '@codecademy/gamut-tests';
import userEvent from '@testing-library/user-event';
import { times } from 'lodash';

import { createStubNotification } from '../__fixtures__/stubs';
import { NotificationBell } from '../NotificationBell';

const renderView = setupRtl(NotificationBell, {
  bellRef: { current: null },
  onClick: jest.fn(),
});

describe('NotificationBell', () => {
  it('does not render an unread count when there are no unread notifications', () => {
    const { view } = renderView({
      notifications: [createStubNotification()],
    });

    expect(view.container.textContent).toBe('Bell Icon');
  });

  it('renders a single digit unread count when there are a single digit number of unread notifications', () => {
    const { view } = renderView({
      notifications: [createStubNotification({ unread: true })],
    });

    expect(view.container.textContent).toBe('Bell Icon1');
  });

  it('renders an unread count of 99 when there are more than 100 unread notifications', () => {
    const { view } = renderView({
      notifications: times(123, (id) =>
        createStubNotification({ id: `${id}`, unread: true })
      ),
    });

    expect(view.container.textContent).toBe('Bell Icon99');
  });

  it('calls onClick when the button is clicked', () => {
    const { props, view } = renderView({
      notifications: [createStubNotification()],
    });

    userEvent.click(view.getByRole('menuitem'));

    expect(props.onClick).toHaveBeenCalled();
  });
});
