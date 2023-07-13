import { Alert, BodyPortal, ContentContainer } from '@codecademy/gamut';
import styled from '@emotion/styled';
import { useCallback, useContext, useEffect, useState } from 'react';
import * as React from 'react';

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
  width: 100%;
  padding: 1rem 0rem;
  grid-template-columns: 1fr;
  row-gap: 1rem;
  top: 3.5rem;
  left: 50%;
  z-index: 15;
  position: fixed;
  transform: translate(-50%, 0);
`;

const StyledAlert = styled(Alert)`
  max-width: 100%;
`;

export const PageAlerts: React.FC<PageAlertsProps> = ({ extra = [] }) => {
  const { alerts, closeAlert, addAlert } = useContext<PageAlertsContextValue>(
    PageAlertsContext
  );

  useEffect(() => {
    extra.forEach(addAlert);
  }, [extra, addAlert]);

  const [alertArea, setAlertArea] = useState<HTMLDivElement>();
  const refCallback = useCallback(
    (alertArea: HTMLDivElement) => {
      setAlertArea(alertArea);
    },
    [setAlertArea]
  );

  const focusAlertCloseButton = useCallback(() => {
    const refButton = alertArea?.querySelector('button');
    refButton?.focus();
  }, [alertArea]);

  // Focus when alertArea is first rendered, as well as when alerts change
  useEffect(() => {
    focusAlertCloseButton();
  }, [alerts, focusAlertCloseButton, alertArea]);

  if (!alerts?.length) return null;

  return (
    <BodyPortal>
      <AlertArea
        role="alert"
        aria-live="assertive"
        key="alerts"
        ref={refCallback}
      >
        {alerts.map((alert) => (
          <ContentContainer size="medium">
            <StyledAlert
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
            </StyledAlert>
          </ContentContainer>
        ))}
      </AlertArea>
    </BodyPortal>
  );
};
