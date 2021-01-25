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

import { FlexBox, GridBox } from '../Box';

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
  /** Banner theme string: info, alert, success, announcement, error */
  variant?: AlertVariants;
  /** On close callback */
  onClose?: () => void;
  /** Call to action configuration { text, href, onClick } */
  cta?: AlertCTAProps;
  /** Remove the max-width on the Alert container */
  fluid?: boolean;
};

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

type AlertButtonProps =
  | {
      as: 'a';
      href: string;
    }
  | {
      as: 'button';
      role: 'button';
    };

const AlertButton = styled.button<AlertButtonProps>(
  ({ theme }: { theme: Theme }) => css`
    font-size: ${theme.fontSize[14]};
    color: ${theme.colors.navy};
    padding: ${theme.spacing[4]} ${theme.spacing[8]};
    background-color: ${theme.colors.white};
    border: none;
    box-shadow: none;
    border-radius: 2px;
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
  variant = 'info',
  cta,
  onClose,
}) => {
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
          <FlexBox width="100%" overflowY="hidden">
            {children}
          </FlexBox>
        </GridBox>
        {cta && <AlertCTA {...cta} />}
        {onClose && (
          <FlexBox as="button" borderStyle="none">
            <CloseIcon />
          </FlexBox>
        )}
      </GridBox>
    </AlertContainer>
  );
};
