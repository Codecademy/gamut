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
import { HandlerProps } from '@codecademy/gamut-system';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import { Box, FlexBox } from '../Box';
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
  onClick?: () => void;
  /** Message */
  message: string;
};

export const VARIANT_META = {
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

export const AlertBanner = styled(Box)<AlertContainerProps>(alertVariants);

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
      className={className}
      variant={variant}
      role="status"
      aria-label="alert box"
      aria-live="polite"
      width="100%"
      maxWidth="820px"
      padding={4}
      paddingX={[4, , 8]}
      borderColor="navy"
      borderStyle="solid"
      borderWidth="2px"
      borderRadius="3px"
    >
      <FlexBox
        columnGap={[4, 8, , 12]}
        rowGap={4}
        alignItems="start"
        lineHeight="base"
        flexWrap={['wrap', , 'nowrap']}
      >
        <FlexBox padding={8} alignItems="center" height="2rem" width="2rem">
          <Icon size={16} />
        </FlexBox>
        <FlexBox
          justifySelf="stretch"
          lineHeight="base"
          flexGrow={1}
          flexBasis={['50%', , 'auto']}
          paddingY={4}
          fontSize={16}
        >
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
            flexBasis="initial"
            justifyContent="flex-start"
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
      </FlexBox>
    </AlertBanner>
  );
};
