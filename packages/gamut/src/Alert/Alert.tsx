import { MiniChevronDownIcon, MiniDeleteIcon } from '@codecademy/gamut-icons';
import { Background, system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

import { Box, FlexBox } from '../Box';
import { FillButton, IconButton } from '../Button';
import { Truncate } from '../Truncate';
import { alertVariants, placementVariants } from './variants';

export type AlertType = keyof typeof alertVariants;
export type InlineAlertType = Exclude<AlertType, 'notice' | 'feature'>;
export type AlertPlacements = 'inline' | 'floating';

export type AlertBase = {
  type?: AlertType;
  placement?: AlertPlacements;
  hidden?: boolean;
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
  hidden,
  type = 'general',
  ...props
}) => {
  const activeAlert = alertVariants?.[type] ?? alertVariants.general;
  const { icon: Icon, button: Button, bg } = activeAlert;

  const [expanded, setExpanded] = useState(false);
  const [truncated, setTruncated] = useState(false);
  const toggleState = expanded ? 'expanded' : 'collapsed';
  const tabIndex = hidden ? -1 : undefined;
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
        style={{ overflow: 'hidden' }}
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
      tabIndex={tabIndex}
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
      <Button {...cta} variant="secondary" size="small" tabIndex={tabIndex}>
        {cta.children ?? cta.text}
      </Button>
    </Box>
  );

  const closeButton = onClose && (
    <IconButton
      tabIndex={tabIndex}
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
      <Box py={4}>{renderContent()}</Box>
      <Box>{expandButton}</Box>
      <Box>{ctaButton}</Box>
      {closeButton}
    </AlertBanner>
  );
};

Alert.defaultProps = {
  type: 'general',
  placement: 'floating',
};
