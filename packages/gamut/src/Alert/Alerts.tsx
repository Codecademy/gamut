import { positioning } from '@codecademy/gamut-styles';
import { HandlerProps } from '@codecademy/gamut-system';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useMemo, useState } from 'react';

import { Box } from '../Box';
import { Alert, AlertProps, VARIANT_META } from './Alert';

type AlertItemProps = HandlerProps<typeof positioning>;

const stacking = css`
  &[aria-hidden='true'] {
    opacity: 0;
    pointer-events: none;
  }

  &[aria-hidden='false'] {
    left: 0;
    top: 0;
  }

  &[aria-hidden='false'] ~ [aria-hidden='false'] {
    left: -4px;
    top: 4px;
    ~ [aria-hidden='false'] {
      left: -8px;
      top: 8px;
    }
  }
`;

export const AlertItem = styled.div<AlertItemProps>`
  ${positioning}
  width: 100%;
  position: absolute;
  opacity: 1;
  transition: opacity 0.1s ease-out, top 0.4s cubic-bezier(0.23, 1, 0.32, 1),
    left 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  ${stacking}
`;

export const Alerts: React.FC<{
  alerts?: AlertProps[];
  onClose: (id: string) => void;
}> = ({ alerts = [], onClose }) => {
  const [closed, setClosed] = useState<string[]>([]);

  const alertsToRender = useMemo(() => {
    return alerts.sort(
      ({ variant: vA = 'general' }, { variant: vB = 'general' }) =>
        VARIANT_META[vA].order < VARIANT_META[vB].order ? -1 : 1
    );
  }, [alerts]);

  return (
    <Box
      position="absolute"
      display="flex"
      alignItems="flex-start"
      justifyContent="center"
      left="0"
      right="0"
      top="0"
      height="100%"
      width="100%"
    >
      <Box position="relative" width="100%" maxWidth="820px">
        {alertsToRender.map((alert, i) => {
          const normalIndex = i - closed.length;
          const isClosed = closed.includes(alert.message) || normalIndex > 2;

          return (
            <AlertItem
              zIndex={alertsToRender.length - i}
              aria-hidden={isClosed}
              key={alert.message}
            >
              <Alert
                {...alert}
                onClose={() => {
                  onClose(alert.message);
                  setClosed([...closed, alert.message]);
                }}
              />
            </AlertItem>
          );
        })}
      </Box>
    </Box>
  );
};
