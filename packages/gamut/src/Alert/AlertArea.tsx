import { system, theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { filter, hasIn, orderBy } from 'lodash';
import React, { ComponentProps, useMemo } from 'react';

import { Box } from '../Box';
import { Alert } from './Alert';
import { FadeInStacked } from './FadeInStacked';
import { alertVariants } from './variants';

const Container = styled.div(
  system.variant({
    base: {
      position: 'relative',
      display: 'flex',
      maxWidth: 1,
      minHeight: '5rem',
      p: 16,
      width: 1,
      zIndex: 1,
    },
    variants: {
      inline: {},
      floating: {
        position: 'fixed',
        top: `calc(${theme.elements.headerHeight} + 2rem)`,
        left: '50%',
        transform: 'translate(-50%, 0)',
      },
    },
  })
);

export interface AlertAreaProps {
  variant?: ComponentProps<typeof Container>['variant'];
  alerts?: ComponentProps<typeof Alert>[];
}

export const AlertArea: React.FC<AlertAreaProps> = ({
  alerts,
  variant = 'inline',
}) => {
  const orderedAlerts = useMemo(() => {
    return orderBy(
      filter(alerts, ({ type = 'general' }) => hasIn(alertVariants, type)),
      ({ type = 'general' }) => alertVariants?.[type].order,
      ['asc']
    );
  }, [alerts]);

  return (
    <Container variant={variant}>
      <Box dimensions={1} display="inline-block" position="relative">
        <AnimatePresence>
          {orderedAlerts?.map((alert, i) => {
            if (!alert.children) return null;

            const alertId = `${alert.children?.toString()}-${i}`;

            return (
              <FadeInStacked order={i} key={alertId}>
                <Alert {...alert} hidden={i !== 0} />
              </FadeInStacked>
            );
          })}
        </AnimatePresence>
      </Box>
    </Container>
  );
};
