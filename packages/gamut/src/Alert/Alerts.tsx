import { positioning, variant } from '@codecademy/gamut-styles';
import { HandlerProps } from '@codecademy/gamut-system';
import styled from '@emotion/styled';
import React, { useMemo, useState } from 'react';

import { Box } from '../Box';
import { Alert, AlertProps, VARIANT_META } from './Alert';

type AlertItemProps = HandlerProps<typeof positioning> &
  HandlerProps<typeof stackingVariants>;
type AlertPositioning = 'top-center';

const stackingVariants = variant({
  prop: 'stack',
  variants: {
    'top-right': {
      zIndex: 5,
      left: '5px',
      top: '-5px',
    },
    center: {
      zIndex: 4,
      left: 0,
      top: 0,
    },
    'bottom-left': {
      zIndex: 3,
      left: '-5px',
      top: '5px',
    },
    hidden: {
      zIndex: -1,
      left: '-5px',
      top: '5px',
    },
  },
});

const motion = `0.4s cubic-bezier(0.23, 1, 0.32, 1)`;

export const AlertItem = styled.div<AlertItemProps>`
  width: 100%;
  padding: 0 ${({ theme }) => theme.spacing[24]};
  position: absolute;
  opacity: ${({ stack }) => (stack !== 'hidden' ? 1 : 0)};
  transition: opacity 0.1s ease-out, top ${motion}, left ${motion};

  ${stackingVariants};
`;

const placementVariants = variant<'placement', 'top-center'>({
  prop: 'placement',
  variants: {
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
  placement: AlertPositioning;
  alerts?: AlertProps[];
  onClose: (id: string) => void;
}> = ({ id, alerts = [], onClose, placement = 'top-center' }) => {
  const [closed, setClosed] = useState<string[]>([]);

  const alertsToRender = useMemo(() => {
    const ORDER = ['top-right', 'center', 'bottom-left'] as const;
    let visible = 0;

    return alerts
      .sort(({ variant: vA = 'general' }, { variant: vB = 'general' }) =>
        VARIANT_META[vA].order < VARIANT_META[vB].order ? -1 : 1
      )
      .map((alert) => {
        let stack = 'hidden';
        if (!closed.includes(alert.message)) {
          stack = ORDER[visible] || 'hidden';
          visible += 1;
        }
        return { ...alert, stack };
      });
  }, [alerts, closed]);

  if (!alertsToRender || closed.length === alertsToRender.length) return null;

  return (
    <AlertContainer width="100%" minHeight="5rem" placement={placement}>
      <Box position="relative" width="100%" maxWidth="820px" paddingX={8}>
        {alertsToRender.map(({ stack, ...alert }) => {
          return (
            <AlertItem
              stack={stack as AlertItemProps['stack']}
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
