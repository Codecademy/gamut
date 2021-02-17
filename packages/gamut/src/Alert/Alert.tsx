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
  variant: 'general' | 'success' | 'error' | 'maintenance' | 'feature';
  /** Callback to be called when the close icon is clicked */
  onClose?: () => void;
  /** Call to Action Configuration */
  cta?: string;
  /**  */
  href?: string;
  /** CTA onClick */
  onClick?: () => void;
  /** Message */
  message: string;
};

const VARIANT_META = {
  general: { order: 4, icon: MiniInfoCircleIcon, buttonMode: 'dark-alt' },
  success: { order: 2, icon: MiniCheckCircleIcon, buttonMode: 'dark-alt' },
  error: { order: 1, icon: MiniRemoveCircleIcon, buttonMode: 'dark-alt' },
  maintenance: {
    order: 3,
    icon: MiniWarningTriangleIcon,
    buttonMode: 'light-alt',
  },
  feature: { order: 5, icon: MiniStarIcon, buttonMode: 'light-alt' },
} as const;

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

const AlertBanner = styled(Box)(
  alertVariants,
  ({ theme }) => css`
    display: flex;
    align-items: flex-start;
    width: 100%;
    max-width: 820px;
    border: 2px solid ${theme.colors.navy};
    border-radius: 3px;
    padding: ${theme.spacing[4]};
  `
);

AlertBanner.defaultProps = {
  role: 'status',
  'aria-label': 'alert box',
  'aria-live': 'polite',
};

export const Alert: React.FC<AlertProps> = ({
  className,
  message,
  variant = 'general',
  cta,
  href,
  onClick,
  onClose,
}) => {
  const { icon: Icon, buttonMode } = VARIANT_META[variant];
  const [expanded, setExpanded] = useState(false);
  const [truncated, setTruncated] = useState(false);

  return (
    <AlertBanner
      variant={variant}
      columnGap={[4, 8, , 12]}
      flexWrap={{ base: 'wrap', sm: 'nowrap' }}
    >
      <FlexBox padding={8} alignItems="center">
        <Icon size={16} />
      </FlexBox>
      <FlexBox flexGrow={1} flexBasis={['50%', , 'auto']} paddingY={4}>
        <Truncate expanded={expanded} onTruncate={setTruncated} lines={1}>
          {message}
        </Truncate>
      </FlexBox>
      {truncated && (
        <IconButton
          mode={buttonMode}
          size="small"
          icon={expanded ? MiniChevronUpIcon : MiniChevronDownIcon}
          onClick={() => setExpanded(!expanded)}
        />
      )}
      {cta && (
        <FlexBox
          flexBasis={['100%', , 'initial']}
          marginLeft={[4, 8, 0]}
          paddingX={[32, , 0]}
          order={[4, , 'initial']}
        >
          <FillButton
            mode="dark-alt"
            href={href}
            onClick={onClick}
            size="small"
          >
            {cta}
          </FillButton>
        </FlexBox>
      )}
      {onClose && (
        <IconButton
          mode={buttonMode}
          size="small"
          onClick={onClose}
          icon={MiniDeleteIcon}
        />
      )}
    </AlertBanner>
  );
};
