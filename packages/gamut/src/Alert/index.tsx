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
import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { Box, GridBox } from '../Box';

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

type AlertButtonProps =
  | {
      as: 'a';
      href: string;
    }
  | {
      as: 'button';
      role: 'button';
    };

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  box-shadow: none;
  border-radius: 2px;
  color: currentColor;
  display: flex;
  align-items: center;
  padding: 4px;

  path {
    stroke-width: 4px;
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px currentColor;
  }
`;

const AlertButton = styled.button<AlertButtonProps>(
  ({ theme }: { theme: Theme }) => css`
    align-items: center;
    display: flex;
    font-size: ${theme.fontSize[14]};
    color: ${theme.colors.navy};
    padding: 2px ${theme.spacing[8]} 0;
    background-color: ${theme.colors.white};
    border: none;
    box-shadow: none;
    border-radius: 2px;
    font-weight: ${theme.fontWeight.title};
    line-height: 0.5;
    height: 1.5rem;
    cursor: pointer;

    &:hover {
      text-decoration: none;
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      box-shadow: 0 0 0 2px currentColor;
    }
  `
);

const AlertCTA: React.FC<AlertCTAProps> = ({ href, text, ...rest }) => {
  const asProps: AlertButtonProps = href
    ? { as: 'a', href }
    : { as: 'button', role: 'button' };
  return (
    <AlertButton {...asProps} {...rest}>
      {text}
    </AlertButton>
  );
};

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
        {cta && <AlertCTA {...cta} />}
        {onClose && (
          <Box height="1.5rem" display="flex" alignItems="center">
            <CloseButton onClick={onClose}>
              <CloseIcon size={12} />
            </CloseButton>
          </Box>
        )}
      </GridBox>
    </AlertContainer>
  );
};
