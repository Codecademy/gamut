import { MiniChevronDownIcon, MiniDeleteIcon } from '@codecademy/gamut-icons';
import { Background, system, timing, variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

import { Box } from '../Box';
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
};

const CollapsableContent = styled(motion.div)(
  system.css({ py: 4, overflowY: 'hidden' })
);

CollapsableContent.defaultProps = {
  variants: {
    collapsed: { height: '2rem' },
    expanded: { height: 'auto' },
  },
  transition: { duration: 0.2, ease: 'easeInOut' },
};

const CollapseButton = styled(IconButton)(
  variant({
    prop: 'toggleState',
    defaultVariant: 'collapsed',
    base: { svg: { transition: `${timing.fast} transform` } },
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
  const isInline = props.placement === 'inline';
  const activeAlert = alertVariants?.[type] ?? alertVariants.general;
  const { icon: Icon, bg } = activeAlert;

  const [expanded, setExpanded] = useState(false);
  const [truncated, setTruncated] = useState(false);

  const toggleState = expanded || isInline ? 'expanded' : 'collapsed';
  const tabIndex = hidden ? -1 : undefined;

  const content = isInline ? (
    children
  ) : (
    <Truncate expanded={expanded} onTruncate={setTruncated} lines={1}>
      {children}
    </Truncate>
  );

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
      <FillButton
        {...cta}
        mode="dark"
        variant="secondary"
        size="small"
        tabIndex={tabIndex}
      >
        {cta.children ?? cta.text}
      </FillButton>
    </Box>
  );

  return (
    <AlertBanner bg={bg} {...props}>
      <Icon size={32} aria-hidden p={8} />
      <CollapsableContent
        aria-expanded={expanded}
        initial={toggleState}
        animate={toggleState}
      >
        {content}
      </CollapsableContent>
      <Box>{expandButton}</Box>
      <Box>{ctaButton}</Box>
      {onClose && (
        <IconButton
          tabIndex={tabIndex}
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
