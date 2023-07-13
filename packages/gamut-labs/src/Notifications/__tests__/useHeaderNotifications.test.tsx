import { MockGamutProvider } from '@codecademy/gamut-tests';
import { render } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { times } from 'lodash';

import { CrossDeviceItemId } from '../../GlobalHeader/types';
import { createStubNotification } from '../__fixtures__/stubs';
import { useHeaderNotifications } from '../useHeaderNotifications';

const onEnable = jest.fn();

const settingsProps = {
  actions: {
    clear: jest.fn(),
    click: jest.fn(),
    dismiss: jest.fn(),
    read: jest.fn(),
    track: jest.fn(),
  },
  onEnable,
};

const defaultProps = {
  settings: settingsProps,
  Renderer: () => <div>hi!</div>,
  openCrossDeviceItemId: CrossDeviceItemId.UNSET,
  setOpenCrossDeviceItemId: jest.fn(),
};

describe('useHeaderNotifications', () => {
  it('returns nulls when there are no notifications', async () => {
    const hook = renderHook(() =>
      useHeaderNotifications({ ...defaultProps, settings: undefined })
    );
    expect(hook.result.current).toEqual([null, null]);
  });

  it('renders its notifications pane as invisible by default when there are notifications', async () => {
    const notifications = [createStubNotification()];
    const newSettings = { ...settingsProps, notifications };
    const hook = renderHook(() =>
      useHeaderNotifications({ ...defaultProps, settings: newSettings })
    );

    const view = render(
      <MockGamutProvider>{hook.result.current[1]}</MockGamutProvider>
    );

    expect(view.container).toBeEmptyDOMElement();
  });

  it('renders its notifications pane as visible when the bell is clicked and there are notifications', async () => {
    const mockSetOpenCrossDeviceItemId = jest.fn();
    defaultProps.setOpenCrossDeviceItemId = mockSetOpenCrossDeviceItemId;

    const notifications = times(5, (id) =>
      createStubNotification({ id: `${id}`, unread: true })
    );
    const newSettings = { ...settingsProps, notifications };

    const hook = renderHook(() =>
      useHeaderNotifications({ ...defaultProps, settings: newSettings })
    );

    const buttonView = render(
      <MockGamutProvider>
        {hook.result.current[0]?.renderElement()}
      </MockGamutProvider>
    );

    act(() => {
      userEvent.click(buttonView.getByRole('menuitem'));
    });

    // verify button click would tell react to update state
    expect(mockSetOpenCrossDeviceItemId).toBeCalledTimes(1);
    expect(mockSetOpenCrossDeviceItemId).toBeCalledWith('notifications');

    const overriddenDefaultProps = {
      ...defaultProps,
      openCrossDeviceItemId: CrossDeviceItemId.NOTIFICATIONS,
    };
    // simulate React telling the component there was a change to its prop (openCrossDeviceItemId) and therefore trigger a rerender
    const secondRenderOfHook = renderHook(() =>
      useHeaderNotifications({
        ...overriddenDefaultProps,
        settings: newSettings,
      })
    );
    const paneView = render(
      <MockGamutProvider>
        {secondRenderOfHook.result.current[1]}
      </MockGamutProvider>
    );

    expect(settingsProps.onEnable).toHaveBeenCalled();
    expect(paneView.container).not.toBeEmptyDOMElement();
  });
});
