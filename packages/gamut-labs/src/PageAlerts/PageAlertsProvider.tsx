import { noop } from 'lodash/fp';
import React, { useCallback, useContext, useState } from 'react';

import { PageAlert } from './types';

export const usePageAlertsContext = () => useContext(PageAlertsContext);

export type PageAlertsContextValue = {
  alerts: PageAlert[];
  addAlert: (alert: PageAlert) => void;
  closeAlert: (alertMessage: string) => void;
};

export const PageAlertsContext = React.createContext<PageAlertsContextValue>({
  alerts: [],
  addAlert: noop,
  closeAlert: noop,
});

export const PageAlertsProvider: React.FC = ({ children }) => {
  const [alerts, setAlerts] = useState<PageAlert[]>([]);

  const addAlert = useCallback((newAlert: PageAlert) => {
    setAlerts((existingAlerts) => {
      if (!existingAlerts.some((alert) => alert.message === newAlert.message))
        return [...existingAlerts, newAlert];

      return existingAlerts;
    });
  }, []);

  const closeAlert = useCallback((message: string) => {
    setAlerts((existingAlerts) => {
      return existingAlerts.filter((alert) => alert.message !== message);
    });
  }, []);

  return (
    <PageAlertsContext.Provider value={{ alerts, addAlert, closeAlert }}>
      {children}
    </PageAlertsContext.Provider>
  );
};
