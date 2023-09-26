import { MiniChevronDownIcon, MiniDeleteIcon } from '@codecademy/gamut-icons';
import { useCurrentMode } from '@codecademy/gamut-styles';
import { isValidElement, useState } from 'react';
import * as React from 'react';
import TruncateMarkup from 'react-truncate-markup';

import { Rotation, WithChildrenProp } from '..';
import { Box } from '../Box';
import { FillButton, IconButton, TextButton } from '../Button';
import {
  AlertBanner,
  AlertBox,
  CollapsableContent,
  collapsableContentTransition,
  collapsableContentVariants,
} from './elements';
import { alertVariants } from './variants';

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
    cta?: Omit<
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
  ...props
}) => {
  const isInline = props.placement === 'inline';
  const activeAlert = alertVariants?.[type] ?? alertVariants.general;
  const { icon: Icon, bg } = activeAlert;

  const currentColorMode = useCurrentMode();
  const isSubtleVariant = type === 'subtle';

  const [expanded, setExpanded] = useState(false);
  const [truncated, setTruncated] = useState(false);

  const toggleState = expanded || isInline ? 'expanded' : 'collapsed';
  const tabIndex = hidden ? -1 : undefined;

  const floatingContent = expanded ? (
    <Box as="span" display="inline-block" width="100%">
      {children}
    </Box>
  ) : (
    <TruncateMarkup
      tokenize="characters"
      ellipsis={<span>...</span>}
      lines={1}
      onTruncate={setTruncated}
    >
      {/** Truncate markup expects a single child element */}
      <Box as="span" display="inline-block" width="100%">
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

  const expandButton = truncated && (
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
  );

  const buttonColorMode = isSubtleVariant ? currentColorMode : 'dark';

  const ctaButton = cta && Boolean(cta.children ?? cta.text) && (
    <Box gridColumn={['2', , 'auto']} gridRow={['2', , 'auto']}>
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
    <AlertWrapper bg={bg} {...props}>
      <Icon size={32} aria-hidden p={8} />
      <CollapsableContent
        animate={toggleState}
        aria-expanded={expanded}
        initial={toggleState}
        variant={collapsableContentVariants}
        transition={collapsableContentTransition}
      >
        {isInline ? children : floatingContent}
      </CollapsableContent>
      <Box>{expandButton}</Box>
      <Box alignSelf="center">{ctaButton}</Box>
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
    </AlertWrapper>
  );
};

Alert.defaultProps = {
  type: 'general',
  placement: 'floating',
};
