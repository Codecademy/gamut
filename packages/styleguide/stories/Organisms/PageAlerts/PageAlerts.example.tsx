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
      extra={[{ type: 'success', message: '"extra" alert on page-load' }]}
    />
  </PageAlertsProvider>
);

const Component: React.FC = () => {
  const { addAlert } = useContext(PageAlertsContext);

  const alerts: Record<string, PageAlert> = {
    success: {
      type: 'success',
      message: `Random message: ${Math.random()}`,
    },
    error: {
      type: 'error',
      message: 'Error! The thing did not happen!',
    },
    general: {
      type: 'general',
      message: 'General alert!',
    },
    notice: {
      type: 'notice',
      message: 'Notice!',
    },
    feature: {
      type: 'feature',
      message: 'Feature alert!',
    },
  };

  return (
    <GridBox width={300} rowGap={16}>
      <FillButton onClick={() => addAlert(alerts.success)}>
        Trigger random success alert
      </FillButton>
      <FillButton onClick={() => addAlert(alerts.error)}>
        Trigger error alert
      </FillButton>
      <FillButton onClick={() => addAlert(alerts.general)}>
        Trigger general alert
      </FillButton>
      <FillButton onClick={() => addAlert(alerts.notice)}>
        Trigger notice alert
      </FillButton>
      <FillButton onClick={() => addAlert(alerts.feature)}>
        Trigger feature alert
      </FillButton>
    </GridBox>
  );
};
