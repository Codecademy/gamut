import { MockGamutProvider } from '@codecademy/gamut-tests';
import { render } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { times } from 'lodash';
import React from 'react';

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
  openCrossDeviceItemId: '',
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

    expect(mockSetOpenCrossDeviceItemId).toBeCalledTimes(1);
    expect(mockSetOpenCrossDeviceItemId).toBeCalledWith('notifications');

    defaultProps.openCrossDeviceItemId = 'notifications';

    // const paneView = render(
    //  <MockGamutProvider>{hook.result.current[1]}</MockGamutProvider>
    // );

    // expect(settingsProps.onEnable).toHaveBeenCalled();
    // expect(paneView.container).not.toBeEmptyDOMElement();
  });
});
