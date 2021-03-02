import {
  MiniCheckCircleIcon,
  MiniChevronDownIcon,
  MiniDeleteIcon,
  MiniInfoCircleIcon,
  MiniRemoveCircleIcon,
  MiniStarIcon,
  MiniWarningTriangleIcon,
} from '@codecademy/gamut-icons';
import { variant } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import React, { useMemo, useState } from 'react';

import { Box, FlexBox } from '../Box';
import { FillButton, IconButton } from '../Button';
import { Truncate } from '../Truncate';

const VARIANT_META = {
  general: { order: 4, icon: MiniInfoCircleIcon, mode: 'dark' },
  success: { order: 2, icon: MiniCheckCircleIcon, mode: 'dark' },
  error: { order: 1, icon: MiniRemoveCircleIcon, mode: 'dark' },
  notice: {
    order: 3,
    icon: MiniWarningTriangleIcon,
    mode: 'light',
  },
  feature: { order: 5, icon: MiniStarIcon, mode: 'light' },
} as const;

export type AlertType = 'general' | 'success' | 'error' | 'notice' | 'feature';
export type AlertPlacements = 'inline' | 'floating';

export type AlertBase = {
  type?: AlertType;
  placement?: AlertPlacements;
  className?: string;
  /** Callback to be called when the close icon is clicked */
  onClose?: () => void;
  /** Call to Action Configuration */
  cta?: Omit<
    React.ComponentProps<typeof FillButton>,
    'variant' | 'mode' | 'size'
  > & { text?: string };
};

export type FloatingAlert = AlertBase & {
  type?: AlertType;
  placement?: 'floating';
};

export type InlineAlert = AlertBase & {
  type?: Exclude<AlertType, 'notice' | 'feature'>;
  placement?: 'inline';
};

export type AlertProps = FloatingAlert | InlineAlert;

const placementVariants = variant({
  prop: 'placement',
  variants: {
    inline: {},
    floating: {
      borderColor: 'navy',
    },
  },
});

const alertVariants = variant({
  prop: 'type',
  variants: {
    general: {
      backgroundColor: 'blue',
      borderColor: 'blue',
      textColor: 'white',
    },
    success: {
      backgroundColor: 'green',
      borderColor: 'green',
      textColor: 'white',
    },
    error: {
      backgroundColor: 'red',
      borderColor: 'red',
      textColor: 'white',
    },
    notice: {
      backgroundColor: 'orange',
      borderColor: 'orange',
      textColor: 'navy',
    },
    feature: {
      backgroundColor: 'blue-300',
      borderColor: 'blue-300',
      textColor: 'navy',
    },
  },
});

const AlertBanner = styled(Box)<Pick<AlertProps, 'type' | 'placement'>>(
  css`
    display: grid;
    width: 100%;
    max-width: 820px;
    border: 2px solid currentColor;
    border-radius: 3px;
  `,
  alertVariants,
  placementVariants
);

AlertBanner.defaultProps = {
  role: 'status',
  'aria-label': 'alert box',
  'aria-live': 'polite',
};

const AlertContent = styled(motion.div)(
  ({ theme }) => css`
    padding: ${theme.spacing[4]} 0;
    overflow-y: hidden;
  `
);

const transitionDuration = 0.2;

const contentVariants = {
  truncated: { height: '2rem' },
  expanded: { height: 'auto' },
};

const CollapseButton = styled(IconButton)<{ expanded?: boolean }>`
  svg {
    transition: ${transitionDuration * 1000}ms transform;
    transform: rotate(${({ expanded }) => (expanded ? '180deg' : '0deg')});
  }
`;

export const Alert: React.FC<AlertProps> = ({
  children,
  cta,
  onClose,
  ...props
}) => {
  const type = props.type ?? 'general';
  const { icon: Icon, mode } = VARIANT_META[type];
  const [expanded, setExpanded] = useState(false);
  const [truncated, setTruncated] = useState(false);

  const numberOfColumns = useMemo(() => {
    if (truncated && Boolean(cta)) return 3;
    if (truncated || Boolean(cta)) return 2;
    return 1;
  }, [truncated, cta]);

  const columns = `max-content minmax(0, 1fr) repeat(${numberOfColumns}, max-content)`;

  return (
    <AlertBanner
      padding={4}
      alignItems="start"
      columnGap={[4, 8, , 12]}
      gridTemplateColumns={columns}
      {...props}
    >
      <FlexBox
        height="2rem"
        width="2rem"
        alignItems="center"
        justifyContent="center"
      >
        <Icon size={16} aria-hidden="true" />
      </FlexBox>
      <AlertContent
        variants={contentVariants}
        transition={{ duration: transitionDuration, ease: 'easeInOut' }}
        aria-expanded={expanded}
        initial={expanded ? 'expanded' : 'truncated'}
        animate={expanded ? 'expanded' : 'truncated'}
      >
        <Truncate expanded={expanded} onTruncate={setTruncated} lines={1}>
          {children}
        </Truncate>
      </AlertContent>
      {truncated && (
        <CollapseButton
          aria-label={expanded ? 'Collapse' : 'Expand'}
          mode={mode}
          variant="secondary"
          size="small"
          expanded={expanded}
          icon={MiniChevronDownIcon}
          onClick={() => setExpanded(!expanded)}
        />
      )}
      {cta && Boolean(cta.children ?? cta.text) && (
        <Box gridColumn={['2', , 'auto']} gridRow={['2', , 'auto']}>
          <FillButton {...cta} mode="dark" variant="secondary" size="small">
            {cta.children ?? cta.text}
          </FillButton>
        </Box>
      )}
      {onClose && (
        <IconButton
          mode={mode}
          aria-label="Close Alert"
          variant="secondary"
          size="small"
          onClick={onClose}
          icon={MiniDeleteIcon}
        />
      )}
    </AlertBanner>
  );
};

Alert.defaultProps = {
  type: 'general',
  placement: 'floating',
};
