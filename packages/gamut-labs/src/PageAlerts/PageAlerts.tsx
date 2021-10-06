import { Alert, BodyPortal } from '@codecademy/gamut';
import { breakpoints } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { useContext, useEffect, useRef } from 'react';

import {
  PageAlertsContext,
  PageAlertsContextValue,
} from './PageAlertsProvider';
import { PageAlert } from './types';

export type PageAlertsProps = {
  extra?: PageAlert[];
};

export const AlertArea = styled.div`
  display: grid;
  justify-content: center;
  width: calc(${breakpoints.md} - 4rem);
  padding: 1rem;
  max-width: 100%;
  grid-template-columns: 1fr;
  row-gap: 1rem;
  top: 5rem;
  left: 50%;
  z-index: 15;
  position: fixed;
  transform: translate(-50%, 0);
`;

export const PageAlerts: React.FC<PageAlertsProps> = ({ extra = [] }) => {
  const { alerts, closeAlert } = useContext<PageAlertsContextValue>(
    PageAlertsContext
  );
  const allAlerts = [...alerts, ...extra];
  const alertAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    alertAreaRef.current?.querySelector('button')?.focus();
  });

  if (!allAlerts?.length) return null;

  return (
    <BodyPortal>
      <AlertArea role="alert" key="alerts" ref={alertAreaRef}>
        {allAlerts.map((alert) => (
          <Alert
            cta={alert.cta}
            onClose={
              alert.permanent
                ? undefined
                : () => {
                    closeAlert(alert.message);
                    alert?.onClose?.();
                  }
            }
            type={alert.type}
            key={alert.message}
          >
            {alert.message}
          </Alert>
        ))}
      </AlertArea>
    </BodyPortal>
  );
};
