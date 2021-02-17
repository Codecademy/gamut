import {
  MiniCheckCircleIcon,
  MiniChevronDownIcon,
  MiniChevronUpIcon,
  MiniDeleteIcon,
  MiniInfoCircleIcon,
  MiniRemoveCircleIcon,
  MiniStarIcon,
  MiniWarningTriangleIcon,
} from '@codecademy/gamut-icons';
import { variant } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import { Box, FlexBox } from '../Box';
import { FillButton, IconButton } from '../Button';
import { Truncate } from '../Truncate';

export type AlertProps = {
  className?: string;
  /** Alert Variant String */
  type?: 'general' | 'success' | 'error' | 'maintenance' | 'feature';
  /** Callback to be called when the close icon is clicked */
  onClose?: () => void;
  /** Call to Action Configuration */
  cta?: Omit<
    React.ComponentProps<typeof FillButton>,
    'variant' | 'mode' | 'size'
  > & { text: string };
};

const VARIANT_META = {
  general: { order: 4, icon: MiniInfoCircleIcon, mode: 'dark' },
  success: { order: 2, icon: MiniCheckCircleIcon, mode: 'dark' },
  error: { order: 1, icon: MiniRemoveCircleIcon, mode: 'dark' },
  maintenance: {
    order: 3,
    icon: MiniWarningTriangleIcon,
    mode: 'light',
  },
  feature: { order: 5, icon: MiniStarIcon, mode: 'light' },
} as const;

const AlertBanner = styled(Box)(
  variant({
    general: {
      backgroundColor: 'blue',
      textColor: 'white',
    },
    success: {
      backgroundColor: 'green',
      textColor: 'white',
    },
    error: {
      backgroundColor: 'red',
      textColor: 'white',
    },
    maintenance: {
      backgroundColor: 'orange',
      textColor: 'navy',
    },
    feature: {
      backgroundColor: 'blue-300',
      textColor: 'navy',
    },
  }),
  ({ theme }) => css`
    display: grid;
    width: 100%;
    max-width: 820px;
    border: 2px solid ${theme.colors.navy};
    border-radius: 3px;
  `
);

AlertBanner.defaultProps = {
  role: 'status',
  'aria-label': 'alert box',
  'aria-live': 'polite',
};

export const Alert: React.FC<AlertProps> = ({
  children,
  type = 'general',
  cta,
  onClose,
}) => {
  const { icon: Icon, mode } = VARIANT_META[type];
  const [expanded, setExpanded] = useState(false);
  const [truncated, setTruncated] = useState(false);

  const columns = `max-content minmax(0, 1fr) repeat(${
    truncated ? 3 : 2
  }, max-content)`;

  return (
    <AlertBanner
      padding={4}
      alignItems="start"
      columnGap={[4, 8, , 12]}
      gridTemplateColumns={columns}
      variant={type}
    >
      <FlexBox
        height="2rem"
        width="2rem"
        alignItems="center"
        justifyContent="center"
      >
        <Icon size={16} />
      </FlexBox>
      <Box paddingY={4}>
        <Truncate expanded={expanded} onTruncate={setTruncated} lines={1}>
          {children}
        </Truncate>
      </Box>
      {truncated && (
        <IconButton
          mode={mode}
          variant="secondary"
          size="small"
          icon={expanded ? MiniChevronUpIcon : MiniChevronDownIcon}
          onClick={() => setExpanded(!expanded)}
        />
      )}
      {cta && (
        <Box gridColumn={['2', , 'auto']} gridRow={['2', , 'auto']}>
          <FillButton {...cta} mode="dark" variant="secondary" size="small">
            {cta.children || cta.text}
          </FillButton>
        </Box>
      )}
      {onClose && (
        <IconButton
          mode={mode}
          variant="secondary"
          size="small"
          onClick={onClose}
          icon={MiniDeleteIcon}
        />
      )}
    </AlertBanner>
  );
};
