import { positioning } from '@codecademy/gamut-styles';
import { HandlerProps } from '@codecademy/gamut-system';
import styled from '@emotion/styled';
import { uniq } from 'lodash';
import React, { useMemo, useState } from 'react';

import { Alert, AlertProps, VARIANT_META } from './Alert';

type AlertItemProps = HandlerProps<typeof positioning>;

export const AlertItem = styled.div<AlertItemProps>`
  ${positioning}
  width: 100%;
  position: absolute;
  padding: ${({ theme }) => theme.spacing[16]};
  opacity: 1;
  transition: opacity 0.1s ease-out, top 0.4s ease-in, left 0.4s ease-in,
    transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);

  &[aria-hidden='true'] {
    opacity: 0;
    pointer-events: none;
  }
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
        const hidden = normalIndex > 2;
        const offset = normalIndex * -4;
        const isClosed = closed.includes(alert.message);

        return (
          <AlertItem
            zIndex={10 - i}
            aria-hidden={hidden || isClosed}
            left={`${offset}px`}
            top={`${isClosed ? -100 : -offset}px`}
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
