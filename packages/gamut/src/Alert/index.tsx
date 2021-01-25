import {
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
import React from 'react';

import { Box, GridBox } from '../Box';
import { FillButton, IconButton } from '../Button';

type AlertContainerProps = HandlerProps<typeof alertVariants>;
type AlertVariants = AlertContainerProps['variant'];

export interface AlertCTAProps {
  href?: string;
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

export type AlertProps = {
  className?: string;
  /** Alert Variant String */
  variant?: AlertVariants;
  /** Callback to be called when the close icon is clicked */
  onClose?: () => void;
  /** Call to Action Configuration */
  cta?: AlertCTAProps;
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

const VariantIcons = {
  general: InfoCircleIcon,
  success: CheckFilledIcon,
  error: CloseCircleIcon,
  maintenance: SupportFilledIcon,
  feature: StarIcon,
};

const AlertContainer = styled.div<AlertContainerProps>(({ theme }) => {
  return css`
    width: 100%;
    max-width: 820px;
    padding: ${theme.spacing[8]} ${theme.spacing[16]};
    border-style: solid;
    border-width: 2px;
    border-color: ${theme.colors.navy};
    border-radius: 3px;
  `;
}, alertVariants);

export const Alert: React.FC<AlertProps> = ({
  className,
  children,
  variant = 'general',
  cta,
  onClose,
}) => {
  const Icon = VariantIcons[variant];
  const columns = [
    'max-content',
    '1fr',
    cta && 'max-content',
    onClose && 'max-content',
  ]
    .filter(Boolean)
    .join(' ');

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
        alignItems="start"
        gridTemplateColumns={columns}
      >
        <Box paddingY={4} height="1.5rem" display="flex">
          <Icon size={16} />
        </Box>
        <Box lineHeight="base">{children}</Box>
        {cta && (
          <FillButton href={cta.href} size="small">
            {cta.text}
          </FillButton>
        )}
        {onClose && (
          <Box height="1.5rem" display="flex" alignItems="center">
            <IconButton size="small" onClick={onClose} icon={CloseIcon} />
          </Box>
        )}
      </GridBox>
    </AlertContainer>
  );
};
