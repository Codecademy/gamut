import {
  MiniCheckCircleIcon,
  MiniChevronDownIcon,
  MiniDeleteIcon,
  MiniInfoCircleIcon,
  MiniRemoveCircleIcon,
  MiniStarIcon,
  MiniWarningTriangleIcon,
} from '@codecademy/gamut-icons';
import { Background, breakpoints, system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import React, { useMemo, useState } from 'react';

import { Box, FlexBox } from '../Box';
import { FillButton, IconButton, StrokeButton } from '../Button';
import { Truncate } from '../Truncate';

export type AlertType = keyof typeof alertVariants;
export type InlineAlertType = Exclude<AlertType, 'notice' | 'feature'>;
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
  type?: InlineAlertType;
  placement?: 'inline';
};

export type AlertProps = FloatingAlert | InlineAlert;

const alertVariants = {
  general: {
    order: 4,
    icon: MiniInfoCircleIcon,
    bg: 'blue',
    button: FillButton,
  },
  success: {
    order: 2,
    icon: MiniCheckCircleIcon,
    bg: 'green',
    button: FillButton,
  },
  error: {
    order: 1,
    icon: MiniRemoveCircleIcon,
    bg: 'red',
    button: FillButton,
  },
  notice: {
    order: 3,
    icon: MiniWarningTriangleIcon,
    bg: 'orange',
    button: StrokeButton,
  },
  feature: {
    order: 5,
    icon: MiniStarIcon,
    bg: 'blue-300',
    button: StrokeButton,
  },
} as const;

const placementVariants = system.variant({
  prop: 'placement',
  base: {
    borderColor: 'navy',
    display: 'grid',
    alignItems: 'start',
    width: 1,
    maxWidth: `calc(${breakpoints.md} - 4rem)`,
    border: 2,
    borderRadius: '3px',
    columnGap: [4, 8, , 12],
    gridTemplateColumns: 'max-content minmax(0, 1fr) repeat(3, max-content)',
  },
  variants: {
    inline: {
      border: 'none',
      p: 4,
      py: 8,
    },
    floating: {
      p: 4,
    },
  },
});

const AlertBanner = styled(Background)<Pick<AlertProps, 'type' | 'placement'>>(
  placementVariants
);

AlertBanner.defaultProps = {
  role: 'status',
  'aria-label': 'alert box',
  'aria-live': 'polite',
} as any;

const CollapseButton = styled(IconButton)(
  system.variant({
    prop: 'toggleState',
    defaultVariant: 'collapsed',
    base: { svg: { transition: '200ms transform' } },
    variants: {
      collapsed: {},
      expanded: {
        svg: {
          transform: 'rotate(180deg)',
        },
      },
    },
  })
);

export const Alert: React.FC<AlertProps> = ({
  children,
  cta,
  onClose,
  type = 'general',
  ...props
}) => {
  const activeAlert = alertVariants?.[type] ?? alertVariants.general;
  const { icon: Icon, button: Button, bg } = activeAlert;

  const [expanded, setExpanded] = useState(false);
  const [truncated, setTruncated] = useState(false);
  const toggleState = expanded ? 'expanded' : 'collapsed';

  const contentSize = useMemo(() => {
    if (truncated && Boolean(cta)) return 'span 1';
    if (truncated || Boolean(cta)) return 'span 2';
    return 'span 3';
  }, [truncated, cta]);

  const renderContent = () => {
    if (props.placement === 'inline') {
      return children;
    }

    return (
      <motion.div
        variants={{
          collapsed: { height: '1.5rem' },
          expanded: { height: 'auto' },
        }}
        style={{
          overflow: 'hidden',
        }}
        transition={{ duration: '200ms', ease: 'easeInOut' }}
        aria-expanded={expanded}
        initial={toggleState}
        animate={toggleState}
      >
        <Truncate expanded={expanded} onTruncate={setTruncated} lines={1}>
          {children}
        </Truncate>
      </motion.div>
    );
  };

  const expandButton = truncated && (
    <CollapseButton
      aria-label={expanded ? 'Collapse' : 'Expand'}
      toggleState={toggleState}
      variant="secondary"
      size="small"
      icon={MiniChevronDownIcon}
      onClick={() => setExpanded(!expanded)}
    />
  );

  const ctaButton = cta && Boolean(cta.children ?? cta.text) && (
    <Box gridColumn={['2', , 'auto']} gridRow={['2', , 'auto']}>
      <Button {...cta} variant="secondary" size="small">
        {cta.children ?? cta.text}
      </Button>
    </Box>
  );

  const closeButton = onClose && (
    <IconButton
      aria-label="Close Alert"
      variant="secondary"
      size="small"
      onClick={onClose}
      icon={MiniDeleteIcon}
    />
  );

  return (
    <AlertBanner bg={bg} {...props}>
      <FlexBox size="2rem" alignments="center">
        <Icon size={16} aria-hidden="true" />
      </FlexBox>
      <Box py={4} gridColumnEnd={contentSize}>
        {renderContent()}
      </Box>
      {expandButton}
      {ctaButton}
      {closeButton}
    </AlertBanner>
  );
};

Alert.defaultProps = {
  type: 'general',
  placement: 'floating',
};
