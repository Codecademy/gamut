import { setupRtl } from '@codecademy/gamut-tests';
import { RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useContext, useEffect } from 'react';
import * as React from 'react';

import { PageAlerts } from '../PageAlerts';
import { PageAlertsContext, PageAlertsProvider } from '../PageAlertsProvider';
import { PageAlert } from '../types';

type PageAlertsTesterProps = {
  alerts: PageAlert[];
  alertMessageToClose?: string;
};

const PageAlertsTester: React.FC<PageAlertsTesterProps> = ({
  alerts,
  alertMessageToClose,
}) => {
  const { addAlert, closeAlert } = useContext(PageAlertsContext);

  useEffect(() => {
    alerts.forEach((alert) => {
      addAlert(alert);
    });
  }, [addAlert, alerts]);

  return (
    <button type="button" onClick={() => closeAlert(alertMessageToClose ?? '')}>
      Close Alert Via Context
    </button>
  );
};

const PageAlertsTestWrapper: React.FC<PageAlertsTesterProps> = (props) => (
  <PageAlertsProvider>
    <PageAlertsTester {...props} />
    <PageAlerts />
  </PageAlertsProvider>
);

const renderView = setupRtl(PageAlertsTestWrapper);

describe('PageAlerts', () => {
  // The alerts all get collapsed/truncated in the test environment, so
  // we need to manually expand them.
  const expandAllAlerts = (view: RenderResult) => {
    const expandButtons = view
      .getAllByText('Mini Chevron Down Icon')
      .map((element: HTMLElement) => element.closest('button'));

    expandButtons.forEach((button) => {
      if (button) userEvent.click(button);
    });
  };

  it('renders the alert message on the page', () => {
    const { view } = renderView({
      alerts: [{ type: 'error', message: 'This is an error alert' }],
    });
    expandAllAlerts(view);

    view.getByText('This is an error alert');
  });

  it('renders the alert with the "alert" role', () => {
    const { view } = renderView({
      alerts: [{ type: 'error', message: 'This is an error alert' }],
    });
    expandAllAlerts(view);

    view.getByRole('alert');
  });

  it('removes the alert when the close button is clicked', () => {
    const { view } = renderView({
      alerts: [{ type: 'error', message: 'This is an error alert' }],
    });
    expandAllAlerts(view);

    const closeButton = view.getByText('Mini Delete Icon').closest('button');
    if (!closeButton) fail('Could not find close button');

    userEvent.click(closeButton);
    expect(view.queryByRole('alert')).toBeFalsy();
  });

  it('does not display a close button when the alert is permanent', () => {
    const { view } = renderView({
      alerts: [
        { type: 'error', message: 'This is an error alert', permanent: true },
      ],
      alertMessageToClose: 'This is an error alert',
    });
    expandAllAlerts(view);

    expect(view.queryByText('Close Alert')).toBeFalsy();
  });

  it('should not render duplicate alerts with the same message', () => {
    const { view } = renderView({
      alerts: [
        { type: 'error', message: 'This is an error alert' },
        { type: 'error', message: 'This is an error alert' },
        { type: 'error', message: 'This is an error alert' },
      ],
    });
    expandAllAlerts(view);

    expect(view.getAllByText('This is an error alert')).toHaveLength(1);
  });

  it('should render multiple alerts at once', () => {
    const { view } = renderView({
      alerts: [
        { type: 'error', message: 'This is an error alert' },
        { type: 'general', message: 'This is a general alert' },
      ],
    });
    expandAllAlerts(view);

    view.getByText('This is an error alert');
    view.getByText('This is a general alert');
  });
});
