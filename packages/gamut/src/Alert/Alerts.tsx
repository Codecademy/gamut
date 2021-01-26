import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { uniq } from 'lodash';
import React, { useMemo, useState } from 'react';

import { Alert, AlertProps, VARIANT_META } from './Alert';

type AlertItemProps = { index: number; offset: number; isClosed?: boolean };

export const AlertItem = styled.div<AlertItemProps>`
  width: 100%;
  position: absolute;
  padding: ${({ theme }) => theme.spacing[16]};
  z-index: ${({ index }) => index};
  top: ${({ offset }) => offset}px;
  left: ${({ offset }) => `calc(50% + ${offset + 10}px)`};
  transform: translate(-50%, 0);
  opacity: 1;

  transition: opacity 0.1s ease-out, top 0.4s ease-in, left 0.4s ease-in,
    transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);

  ${({ isClosed }) =>
    isClosed &&
    css`
      opacity: 0;
      pointer-events: none;
      transform: translate(-50%, 100%);
    `}
`;

export const AlertsWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 100%;
  width: 100%;
  max-width: 1200px;
`;

export const Alerts: React.FC<{ alerts?: AlertProps[] }> = ({
  alerts = [],
}) => {
  const [closed, setClosed] = useState<string[]>([]);

  const alertsToRender = useMemo(() => {
    return alerts.sort(
      ({ variant: vA = 'general' }, { variant: vB = 'general' }) =>
        VARIANT_META[vA].order < VARIANT_META[vB].order ? -1 : 1
    );
  }, [alerts]);

  return (
    <AlertsWrapper>
      {alertsToRender.map((alert, i) => {
        const normalIndex = i - closed.length;
        const offset = (normalIndex > 2 ? 2 : normalIndex) * -10;
        const isClosed = closed.includes(alert.message);

        return (
          <AlertItem
            index={10 - i}
            aria-hidden={isClosed ?? 'true'}
            isClosed={isClosed}
            offset={offset}
            key={alert.message}
          >
            <Alert
              {...alert}
              onClose={() => setClosed(uniq([...closed, alert.message]))}
            />
          </AlertItem>
        );
      })}
    </AlertsWrapper>
  );
};
