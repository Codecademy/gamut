import { MiniChevronDownIcon, MiniDeleteIcon } from '@codecademy/gamut-icons';
import { breakpoints, useCurrentMode } from '@codecademy/gamut-styles';
import { Children, isValidElement, useId, useMemo, useState } from 'react';
import TruncateMarkup from 'react-truncate-markup';
import { useMeasure } from 'react-use';

import { Rotation } from '../Animation';
import { Box } from '../Box';
import { FillButton, IconButton, TextButton } from '../Button';
import { CloseButtonProps } from '../Modals/types';
import { ToolTip } from '../Tip/ToolTip';
import { WithChildrenProp } from '../utils';
import {
  AlertBanner,
  AlertBox,
  alertContentProps,
  CleanFillButton,
  CollapsibleContent,
} from './elements';
import {
  alertVariants,
  getAlertRightPadding,
  getGridTemplateColumns,
} from './variants';

export type AlertType = keyof typeof alertVariants;
export type AlertPlacements = 'inline' | 'floating';

/** CTA rendered as a link (FillButton with href) */
export type AlertCtaLink = Exclude<
  React.ComponentProps<typeof FillButton>,
  'variant' | 'mode' | 'size'
> & { text?: string; href: string };

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
    /** Sets the tabIndex of the Alert's Button component(s) to -1 */
    hidden?: boolean;
    className?: string;
    /** Callback to be called when the close icon is clicked */
    onClose?: () => void;
    /** Call to Action Configuration */
    cta?:
      | (Exclude<
          React.ComponentProps<typeof FillButton>,
          'variant' | 'mode' | 'size'
        > & { text?: string })
      | AlertCtaLink;
    /** Props for customizing the close button */
    closeButtonProps?: Omit<
      NonNullable<CloseButtonProps['closeButtonProps']>,
      'hidden'
    >;
  };

export const Alert: React.FC<AlertProps> = ({
  children,
  cta,
  closeButtonProps: {
    disabled: disableCloseButton,
    ref: closeButtonRef,
    tip: closeButtonTip = 'Close alert',
    tipAlignment = 'bottom-center' as const,
  } = {},
  onClose,
  hidden,
  type = 'general',
  placement = 'floating',
  ...props
}) => {
  const [ref, { width }] = useMeasure<HTMLDivElement>();
  const isDesktop = useMemo(() => {
    if (width === 0) return true; // default to desktop if we don't have a width
    return width > parseInt(breakpoints.xs, 10);
  }, [width]);

  const activeAlert = alertVariants?.[type] ?? alertVariants.general;
  const { icon: Icon, bg } = activeAlert;

  const tipId = useId();
  const collapsibleContentId = useId();

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
    return isDesktop ? 'auto' : '2';
  }, [isDesktop]);

  const gridTemplateColumns = useMemo(() => {
    return !isDesktop
      ? `max-content minmax(0, 1fr) repeat(1, max-content)`
      : getGridTemplateColumns({
          cta: ctaExists,
          onClose: !!onClose,
          truncated,
        });
  }, [ctaExists, isDesktop, onClose, truncated]);

  const alertRightPadding = useMemo(() => {
    return getAlertRightPadding(Boolean(onClose));
  }, [onClose]);

  const tabIndex = hidden ? -1 : undefined;

  const floatingContent = expanded ? (
    <Box {...alertContentProps}>{children}</Box>
  ) : (
    <TruncateMarkup
      ellipsis={<span>...</span>}
      lines={1}
      tokenize="characters"
      onTruncate={setTruncated}
    >
      {/** Truncate markup expects a single child element */}
      <Box {...alertContentProps}>
        {Children.map(children, (child) =>
          isValidElement(child) || typeof child === 'string' ? (
            child
          ) : (
            <TruncateMarkup.Atom>{child}</TruncateMarkup.Atom>
          )
        )}
      </Box>
    </TruncateMarkup>
  );

  const buttonLabel = expanded ? 'Collapse alert' : 'Expand alert';
  const ariaId = tipId ?? '';

  const expandButton = truncated && !isInline && (
    <Box>
      <ToolTip
        alignment="bottom-center"
        id={ariaId}
        info={buttonLabel}
        placement="floating"
      >
        <TextButton
          aria-controls={collapsibleContentId}
          aria-describedby={ariaId}
          aria-expanded={expanded}
          aria-label={expanded ? 'Collapse' : 'Expand'}
          size="small"
          tabIndex={tabIndex}
          variant="secondary"
          onClick={() => setExpanded(!expanded)}
        >
          <Rotation rotated={toggleState === 'expanded'}>
            <MiniChevronDownIcon />
          </Rotation>
        </TextButton>
      </ToolTip>
    </Box>
  );

  const buttonColorMode = isSubtleVariant ? currentColorMode : 'dark';

  const ctaButton = ctaExists && (
    <Box
      gridColumn={gridButtonOrder}
      gridRow={gridButtonOrder}
      pb={ctaButtonPadding}
    >
      <CleanFillButton
        {...cta}
        mode={buttonColorMode}
        size="small"
        tabIndex={tabIndex}
        variant="secondary"
      >
        {cta.children ?? cta.text}
      </CleanFillButton>
    </Box>
  );

  const AlertWrapper = isSubtleVariant ? AlertBox : AlertBanner;
  return (
    <AlertWrapper
      bg={bg}
      gridTemplateColumns={gridTemplateColumns}
      placement={placement}
      pr={alertRightPadding}
      ref={ref}
      {...props}
    >
      <Icon aria-hidden p={8} size={32} />
      <CollapsibleContent
        animate={toggleState}
        id={collapsibleContentId}
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
      </CollapsibleContent>
      {expandButton}
      {ctaButton}
      {onClose && (
        <IconButton
          disabled={disableCloseButton}
          icon={MiniDeleteIcon}
          ref={closeButtonRef}
          size="small"
          tabIndex={tabIndex}
          tip={closeButtonTip}
          tipProps={{ alignment: tipAlignment, placement: 'floating' }}
          variant="secondary"
          onClick={onClose}
        />
      )}
    </AlertWrapper>
  );
};
