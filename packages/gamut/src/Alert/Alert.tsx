import {
  ArrowChevronDownIcon,
  ArrowChevronUpIcon,
  CheckFilledIcon,
  CloseCircleIcon,
  CloseIcon,
  InfoCircleIcon,
  StarIcon,
  SupportFilledIcon,
} from '@codecademy/gamut-icons';
import { variant } from '@codecademy/gamut-styles';
import { HandlerProps } from '@codecademy/gamut-system';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import { FlexBox } from '../Box';
import { FillButton, IconButton } from '../Button';
import { Truncate } from '../Truncate';

export type AlertContainerProps = HandlerProps<typeof alertVariants>;
export type AlertVariants = AlertContainerProps['variant'];

export type AlertProps = {
  className?: string;
  /** Alert Variant String */
  variant: AlertVariants;
  /** Callback to be called when the close icon is clicked */
  onClose?: () => void;
  /** Call to Action Configuration */
  cta?: string;
  /**  */
  href?: string;
  /** CTA onClick */
  onClick: () => void;
  /** Message */
  message: string;
};

export const VARIANT_META = {
  general: { order: 4, icon: InfoCircleIcon },
  success: { order: 2, icon: CheckFilledIcon },
  error: { order: 1, icon: CloseCircleIcon },
  maintenance: { order: 3, icon: SupportFilledIcon },
  feature: { order: 5, icon: StarIcon },
};

const alertVariants = variant({
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
});

export const AlertBanner = styled.div<AlertContainerProps>(({ theme }) => {
  return css`
    width: 820px;
    max-width: 100%;
    padding: ${theme.spacing[8]} ${theme.spacing[16]};
    border: 2px solid ${theme.colors.navy};
    border-radius: 3px;
  `;
}, alertVariants);

export const Alert: React.FC<AlertProps> = ({
  className,
  message,
  variant = 'general',
  cta,
  href,
  onClick,
  onClose,
}) => {
  const { icon: Icon } = VARIANT_META[variant];
  const [expanded, setExpanded] = useState(false);
  const [truncated, setTruncated] = useState(false);

  return (
    <AlertBanner
      className={className}
      variant={variant}
      role="status"
      aria-label="alert box"
      aria-live="polite"
    >
      <FlexBox columnGap={16} alignItems="start" lineHeight="base">
        <FlexBox paddingY={4} height="1.5rem">
          <Icon size={16} />
        </FlexBox>
        <FlexBox flexGrow={1} flexShrink={1} justifySelf="stretch">
          <Truncate expanded={expanded} onTruncate={setTruncated} lines={1}>
            {message}
          </Truncate>
        </FlexBox>
        {truncated && (
          <IconButton
            mode="dark"
            size="small"
            icon={expanded ? ArrowChevronUpIcon : ArrowChevronDownIcon}
            onClick={() => setExpanded(!expanded)}
          />
        )}
        {cta && (
          <FillButton mode="dark" href={href} onClick={onClick} size="small">
            {cta}
          </FillButton>
        )}
        {onClose && (
          <IconButton
            mode="dark"
            size="small"
            onClick={onClose}
            icon={CloseIcon}
          />
        )}
      </FlexBox>
    </AlertBanner>
  );
};
