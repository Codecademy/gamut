import { breakpoints, system, theme } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { filter, hasIn, orderBy } from 'lodash';
import React, { ComponentProps, useMemo } from 'react';

import { Box } from '../Box';
import { Alert } from './Alert';
import { alertVariants } from './variants';

const areaVariants = system.variant({
  base: {
    position: 'relative',
    display: 'flex',
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
});

const Container = styled.div(areaVariants);

export interface AlertAreaProps extends StyleProps<typeof areaVariants> {
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

  const hiddenAlertProps = {
    'aria-hidden': true,
    tabIndex: -1,
  };

  return (
    <Container variant={variant}>
      <Box position="relative">
        <AnimatePresence>
          {orderedAlerts?.map((alert, i) => {
            if (!alert.children) return null;

            const alertId = alert.children?.toString();
            const props = i === 0 ? {} : hiddenAlertProps;
            const offset = 4 * i;

            return (
              <motion.div
                {...props}
                style={{
                  width: `calc(${breakpoints.md} - 4rem)`,
                  top: 0,
                  x: -offset,
                  y: offset,
                  position: i === 0 ? 'relative' : 'absolute',
                  zIndex: -i,
                  opacity: i > 2 ? 0 : 1,
                }}
                initial={{ y: offset, scale: 0.3, position: 'absolute' }}
                animate={{ y: offset, scale: 1 }}
                exit={{
                  x: 50,
                  y: -50,
                  zIndex: 1,
                  opacity: 0,
                  position: 'absolute',
                  transition: { duration: 0.2 },
                }}
                key={alertId}
              >
                <Alert {...alert} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </Box>
    </Container>
  );
};
