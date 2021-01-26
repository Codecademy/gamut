import { positioning } from '@codecademy/gamut-styles';
import { HandlerProps } from '@codecademy/gamut-system';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { uniq } from 'lodash';
import React, { useMemo, useState } from 'react';

import { Alert, AlertProps, VARIANT_META } from './Alert';

type AlertItemProps = { offset: number; isClosed?: boolean };

export const AlertItem = styled.div<AlertItemProps>`
  ${positioning}
  width: 100%;
  position: absolute;
  padding: ${({ theme }) => theme.spacing[16]};
  top: ${({ offset }) => offset}px;
  left: ${({ offset }) => `calc(50% + ${offset}px)`};
  transform: translate(-50%, 0);

  transition: opacity 0.1s ease-out, top 0.4s ease-in, left 0.4s ease-in,
    transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);

  ${({ isClosed, offset }) =>
    isClosed
      ? css`
          opacity: 0;
          pointer-events: none;
          transform: translate(-50%, 100%);
        `
      : css`
          opacity: 1;
        `};
`;

export const AlertsWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 100%;
  width: 100%;
  max-width: 1200px;
  display: flex;
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
            aria-hidden={isClosed ?? 'true'}
            isClosed={isClosed}
            offset={offset}
            key={alert.message}
            zIndex={10 - i}
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
