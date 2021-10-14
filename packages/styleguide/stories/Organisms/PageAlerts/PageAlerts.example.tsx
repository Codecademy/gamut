import { FillButton } from '@codecademy/gamut';
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
    <PageAlerts />
  </PageAlertsProvider>
);

const Component: React.FC = () => {
  const { addAlert } = useContext(PageAlertsContext);
  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const successAlert: PageAlert = {
    type: 'success',
    message: 'The thing happened!',
  };

  const errorAlert: PageAlert = {
    type: 'error',
    message: 'The thing did not happen!',
  };

  const handleThing = async () => {
    try {
      await wait(2000);
      addAlert(successAlert);
    } catch (err) {
      addAlert(errorAlert);
    }
  };

  return <FillButton onClick={handleThing}>Do the thing</FillButton>;
};
