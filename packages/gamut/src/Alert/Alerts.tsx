import { positioning, variant } from '@codecademy/gamut-styles';
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

const placementVariants = variant({
  prop: 'placement',
  variants: {
    inline: {
      position: 'relative',
      display: 'flex',
      minHeight: '5rem',
      paddingY: 16,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    'top-center': {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      top: '5rem',
      left: 0,
      right: 0,
    },
  },
});

export const AlertContainer = styled(Box)(placementVariants);

export const Alerts: React.FC<{
  id?: string;
  placement?: HandlerProps<typeof placementVariants>['placement'];
  alerts?: AlertProps[];
  onClose: (id: string) => void;
}> = ({ id, alerts = [], onClose, placement = 'inline' }) => {
  const [closed, setClosed] = useState<string[]>([]);

  const alertsToRender = useMemo(() => {
    return alerts.sort(
      ({ variant: vA = 'general' }, { variant: vB = 'general' }) =>
        VARIANT_META[vA].order < VARIANT_META[vB].order ? -1 : 1
    );
  }, [alerts]);

  return (
    <AlertContainer width="100%" placement={placement}>
      <Box position="relative" width="100%" maxWidth="820px">
        {alertsToRender.map((alert, i) => {
          const normalIndex = i - closed.length;
          const isClosed = closed.includes(alert.message) || normalIndex > 2;

          return (
            <AlertItem
              zIndex={alertsToRender.length - i}
              aria-hidden={isClosed}
              key={`${id}-${alert.message}`}
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
    </AlertContainer>
  );
};
