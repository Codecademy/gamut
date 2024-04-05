import { MiniChevronDownIcon, MiniDeleteIcon } from '@codecademy/gamut-icons';
import { breakpoints, useCurrentMode } from '@codecademy/gamut-styles';
import { isValidElement, useMemo, useState } from 'react';
import * as React from 'react';
import TruncateMarkup from 'react-truncate-markup';
import { useMedia } from 'react-use';

import { Rotation, WithChildrenProp } from '..';
import { Box } from '../Box';
import { FillButton, IconButton, TextButton } from '../Button';
import {
  AlertBanner,
  AlertBox,
  alertContentProps,
  CollapsableContent,
} from './elements';
import { alertVariants, getAlertRightPadding,getGridTemplateColumns } from './variants';

export type AlertType = keyof typeof alertVariants;
export type AlertPlacements = 'inline' | 'floating';

// Subtle alert types should only be used inline
type AlertPlacementType =
  | {
      type?: Exclude<AlertType, 'subtle'>;
      placement?: AlertPlacements;
    }
  | {
      type: 'subtle';
      placement: 'inline';
    };

export type AlertProps = WithChildrenProp &
  AlertPlacementType & {
    hidden?: boolean;
    className?: string;
    /** Callback to be called when the close icon is clicked */
    onClose?: () => void;
    /** Call to Action Configuration */
    cta?: Exclude<
      React.ComponentProps<typeof FillButton>,
      'variant' | 'mode' | 'size'
    > & { text?: string };
  };

export const Alert: React.FC<AlertProps> = ({
  children,
  cta,
  onClose,
  hidden,
  type = 'general',
  placement = 'floating',
  ...props
}) => {
  const isDesktop = useMedia(`(min-width: ${breakpoints.xs})`);
  const activeAlert = alertVariants?.[type] ?? alertVariants.general;
  const { icon: Icon, bg } = activeAlert;

  const currentColorMode = useCurrentMode();
  const isSubtleVariant = type === 'subtle';

  const [expanded, setExpanded] = useState(false);
  const [truncated, setTruncated] = useState(false);

  const ctaExists = cta && Boolean(cta.children ?? cta.text);

  const isInline = useMemo(() => {
    return placement === 'inline' || !isDesktop;
  }, [placement, isDesktop]);

  const toggleState = useMemo(() => {
    return expanded || isInline ? 'expanded' : 'collapsed';
  }, [expanded, isInline]);

  const ctaButtonPadding = useMemo(() => {
    return !isDesktop && placement === 'floating' ? 4 : undefined;
  }, [placement, isDesktop]);

  const gridButtonOrder = useMemo(() => {
    return isDesktop ? undefined : (['2', , 'auto'] as const);
  }, [isDesktop]);

  const gridTemplateColumns = useMemo(() => {
    return !isDesktop
      ? `max-content minmax(0, 1fr) repeat(1, max-content)`
      : getGridTemplateColumns({
          cta: ctaExists,
          // cta: false,
          // onClose: false,
          onClose: !!onClose,
          truncated,
        });
  }, [ctaExists, isDesktop, onClose, truncated]);
  // }, [/* /, isDesktop, onClose, truncated]);
// }, [ctaExists, isDesktop, /* onClose */, truncated]);
// }, [/* ctaExists */, isDesktop, /* onClose */, truncated]);


  const alertRightPadding = useMemo(() => {
    return getAlertRightPadding(Boolean(onClose)) ;
  }, [onClose])

  const tabIndex = hidden ? -1 : undefined;

  const floatingContent = expanded ? (
    <Box {...alertContentProps}>{children}</Box>
  ) : (
    <TruncateMarkup
      tokenize="characters"
      ellipsis={<span>...</span>}
      lines={1}
      onTruncate={setTruncated}
    >
      {/** Truncate markup expects a single child element */}
      <Box {...alertContentProps}>
        {React.Children.map(children, (child) =>
          isValidElement(child) || typeof child === 'string' ? (
            child
          ) : (
            <TruncateMarkup.Atom>{child}</TruncateMarkup.Atom>
          )
        )}
      </Box>
    </TruncateMarkup>
  );

  const expandButton = truncated && !isInline && (
    <Box>
      <TextButton
        tabIndex={tabIndex}
        aria-label={expanded ? 'Collapse' : 'Expand'}
        variant="secondary"
        size="small"
        onClick={() => setExpanded(!expanded)}
      >
        <Rotation rotated={toggleState === 'expanded'}>
          <MiniChevronDownIcon />
        </Rotation>
      </TextButton>
    </Box>
  );

  const buttonColorMode = isSubtleVariant ? currentColorMode : 'dark';
  // onClose = false

  const ctaButton = ctaExists && (
    <Box
      gridColumn={gridButtonOrder}
      gridRow={gridButtonOrder}
      pb={ctaButtonPadding}
    >
      <FillButton
        {...cta}
        mode={buttonColorMode}
        variant="secondary"
        size="small"
        tabIndex={tabIndex}
      >
        {cta.children ?? cta.text}
      </FillButton>
    </Box>
  );

  const AlertWrapper = isSubtleVariant ? AlertBox : AlertBanner;
  return (
    <AlertWrapper
      bg={bg}
      placement={placement}
      gridTemplateColumns={gridTemplateColumns}
      pr={alertRightPadding}
      {...props}
    >
      <Icon size={32} aria-hidden p={8} />
      <CollapsableContent
        animate={toggleState}
        aria-expanded={expanded}
        initial={toggleState}
        transition={{
          duration: 0.2,
          ease: 'easeInOut',
        }}
        variants={{
          collapsed: { height: '2rem' },
          expanded: { height: 'auto' },
        }}
      >
        {isInline ? children : floatingContent}
      </CollapsableContent>
      {expandButton}
      {ctaButton}
      {onClose && (
        <IconButton
          tabIndex={tabIndex}
          variant="secondary"
          size="small"
          onClick={onClose}
          icon={MiniDeleteIcon}
          tip="Close alert"
          tipProps={{ alignment: 'bottom-center', placement: 'floating' }}
        />
      )}
    </AlertWrapper>
  );
};
