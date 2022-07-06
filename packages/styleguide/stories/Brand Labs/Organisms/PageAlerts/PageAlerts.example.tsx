import { FillButton, GridBox } from '@codecademy/gamut';
import {
  PageAlert,
  PageAlerts,
  PageAlertsContext,
  PageAlertsProvider,
} from '@codecademy/gamut-labs';
import React, { useContext } from 'react';

export const PageAlertsExample: React.FC = () => (
  <PageAlertsProvider>
    <Component />
    <PageAlerts
      extra={[
        {
          type: 'success',
          message:
            '"extra" alert on page-load provided by the PageAlertProvider 😎',
        },
      ]}
    />
  </PageAlertsProvider>
);

const Component: React.FC = () => {
  const { addAlert } = useContext(PageAlertsContext);

  const alerts: PageAlert[] = [
    {
      type: 'success',
      message: `This alert can appear multiple times in a row because the message is different each time: ${Math.random()}`,
    },
    {
      type: 'error',
      message: 'Error!',
    },
    {
      type: 'general',
      message: 'General alert!',
    },
    {
      type: 'notice',
      message: 'Notice!',
    },
    {
      type: 'feature',
      message: 'Feature alert!',
    },
  ];

  return (
    <GridBox width={300} rowGap={16}>
      {alerts.map((alert) => (
        <FillButton key={alert.type} onClick={() => addAlert(alert)}>
          {`Trigger ${alert.type} alert`}
        </FillButton>
      ))}
    </GridBox>
  );
};
