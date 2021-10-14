import { FillButton, GridBox } from '@codecademy/gamut';
import {
  PageAlert,
  PageAlerts,
  PageAlertsContext,
  PageAlertsProvider,
} from '@codecademy/gamut-labs';
import React, { useContext } from 'react';

const buildAlert: () => PageAlert = () => {
  return {
    type: 'success',
    message: `Random message: ${Math.random()}`,
  };
};

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

  const errorAlert: PageAlert = {
    type: 'error',
    message: 'Error! The thing did not happen!',
  };
  const generalAlert: PageAlert = {
    type: 'general',
    message: 'General alert!',
  };
  const noticeAlert: PageAlert = {
    type: 'notice',
    message: 'Notice!',
  };
  const featureAlert: PageAlert = {
    type: 'feature',
    message: 'Feature alert!',
  };

  return (
    <GridBox width={300} rowGap={16}>
      <FillButton onClick={() => addAlert(buildAlert())}>
        Trigger random success alert
      </FillButton>
      <FillButton onClick={() => addAlert(errorAlert)}>
        Trigger error alert
      </FillButton>
      <FillButton onClick={() => addAlert(generalAlert)}>
        Trigger general alert
      </FillButton>
      <FillButton onClick={() => addAlert(noticeAlert)}>
        Trigger notice alert
      </FillButton>
      <FillButton onClick={() => addAlert(featureAlert)}>
        Trigger feature alert
      </FillButton>
    </GridBox>
  );
};
