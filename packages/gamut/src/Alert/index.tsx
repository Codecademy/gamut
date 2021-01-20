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

import { FlexBox, GridBox } from '../Box';
import { IconButton } from '../Button';
import { BannerCTA } from './types';

const alertVariants = variant({
  info: {
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
    backgroundColor: 'paleBlue',
    textColor: 'navy',
  },
});

type AlertContainerProps = HandlerProps<typeof alertVariants>;
type AlertVariants = AlertContainerProps['variant'];

const VariantIcons = {
  info: InfoCircleIcon,
  success: CheckFilledIcon,
  error: CloseCircleIcon,
  maintenance: SupportFilledIcon,
  feature: StarIcon,
};

const AlertContainer = styled.div<AlertContainerProps>(({ theme }) => {
  return css`
    padding: ${theme.spacing[12]} ${theme.spacing[16]};
    border-style: solid;
    border-width: 2px;
    border-color: ${theme.colors.navy};
    border-radius: 3px;
  `;
}, alertVariants);

export type AlertProps = {
  className?: string;
  /** Banner theme string: info, alert, success, announcement, error */
  variant?: AlertVariants;
  /** On close callback */
  onClose?: () => void;
  /** Call to action configuration { text, href, onClick } */
  cta?: BannerCTA;
  /** Remove the max-width on the Alert container */
  fluid?: boolean;
  /** Number of lines to limit the message to */
  lines?: number;
};

export const Alert: React.FC<AlertProps> = ({
  className,
  children,
  variant = 'info',
  lines,
  cta,
  onClose,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const showExpandToggle = isTruncated || isExpanded;
  const ToggleIcon = isExpanded ? ArrowChevronUpIcon : ArrowChevronDownIcon;
  const Icon = VariantIcons[variant];
  return (
    <AlertContainer
      className={className}
      variant={variant}
      role="status"
      aria-label="alert box"
      aria-live="polite"
    >
      <GridBox
        columnGap={16}
        gridAutoFlow="column"
        gridTemplateColumns="max-content 1fr max-content max-content"
      >
        <Icon size={20} />
        <GridBox gridAutoFlow="column" gridTemplateColumns="1fr max-content">
          <FlexBox
            width="100%"
            maxHeight={isExpanded ? 'none' : '1.5rem'}
            overflowY="hidden"
          >
            {children}
          </FlexBox>
          {showExpandToggle && (
            <IconButton
              icon={ToggleIcon}
              onClick={() => setIsExpanded(!isExpanded)}
            />
          )}
        </GridBox>
        {cta && (
          <FlexBox
            as="button"
            backgroundColor="white"
            textColor="navy"
            borderStyle="none"
          >
            {cta.text}
          </FlexBox>
        )}
        {onClose && (
          <FlexBox as="button" borderStyle="none">
            <CloseIcon />
          </FlexBox>
        )}
      </GridBox>
    </AlertContainer>
  );
};
