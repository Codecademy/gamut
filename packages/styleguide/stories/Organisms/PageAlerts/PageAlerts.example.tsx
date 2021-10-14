import { FillButton } from '@codecademy/gamut';
import {
  PageAlert,
  PageAlerts,
  PageAlertsContext,
  PageAlertsProvider,
} from '@codecademy/gamut-labs';
import React, { useContext } from 'react';

const buildSuccessAlert: () => PageAlert = () => {
  return {
    type: 'success',
    message: `Random message: ${Math.random()}`,
  };
};

export const PageAlertsExample: React.FC = () => (
  <PageAlertsProvider>
    <Component />
    <PageAlerts
      extra={[{ type: 'success', message: 'extra alert on page-load' }]}
    />
  </PageAlertsProvider>
);

const Component: React.FC = () => {
  const { addAlert } = useContext(PageAlertsContext);
  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const errorAlert: PageAlert = {
    type: 'error',
    message: 'The thing did not happen!',
  };

  const handleThing = async () => {
    try {
      await wait(2000);
      addAlert(buildSuccessAlert());
    } catch (err) {
      addAlert(errorAlert);
    }
  };

  return (
    <>
      <FillButton onClick={handleThing}>Do the thing</FillButton>
    </>
  );
};
