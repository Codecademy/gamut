import {
  CheckFilledIcon,
  CloseCircleIcon,
  CloseIcon,
  InfoCircleIcon,
  StarIcon,
  SupportFilledIcon,
} from '@codecademy/gamut-icons';
import { variant } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useMemo } from 'react';

import { Box, GridBox } from '../Box';
import { FillButton, IconButton } from '../Button';

type AlertVariants =
  | 'general'
  | 'success'
  | 'error'
  | 'maintenance'
  | 'feature';

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

const alertVariants = variant<AlertVariants>({
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

const VARIANT_ICONS = {
  general: InfoCircleIcon,
  success: CheckFilledIcon,
  error: CloseCircleIcon,
  maintenance: SupportFilledIcon,
  feature: StarIcon,
};

const AlertContainer = styled.div<Pick<AlertProps, 'variant'>>(({ theme }) => {
  return css`
    width: 100%;
    max-width: 820px;
    padding: ${theme.spacing[8]} ${theme.spacing[16]};
    border: 2px solid ${theme.colors.navy};
    border-radius: 3px;
  `;
}, alertVariants);

export const Alert: React.FC<AlertProps> = ({
  className,
  children,
  variant = 'general',
  cta = {},
  onClose,
}) => {
  const { text, href, onClick } = cta;
  const Icon = VARIANT_ICONS[variant];
  const columns = useMemo(() => {
    return [
      'max-content',
      '1fr',
      text && 'max-content',
      onClose && 'max-content',
    ]
      .filter(Boolean)
      .join(' ');
  }, [onClose, text]);

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
          <FillButton mode="dark" href={href} onClick={onClick} size="small">
            {text}
          </FillButton>
        )}
        {onClose && (
          <Box height="1.5rem" display="flex" alignItems="center">
            <IconButton
              mode="dark"
              size="small"
              onClick={onClose}
              icon={CloseIcon}
            />
          </Box>
        )}
      </GridBox>
    </AlertContainer>
  );
};
