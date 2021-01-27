import { ArrowChevronDownIcon } from '@codecademy/gamut-icons';
import { variant } from '@codecademy/gamut-styles';
import { HandlerProps } from '@codecademy/gamut-system';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { ComponentProps } from 'react';

import { Box } from '../Box';
import { ButtonDeprecatedBase } from '../ButtonDeprecatedBase';

export type AccordionButtonSize = 'normal' | 'large';

export type AccordionButtonTheme = 'blue' | 'plain' | 'yellow';

export type AccordionButtonProps = ComponentProps<typeof ButtonComponent> & {
  /**
   * Whether the button should display as open or closed.
   */
  expanded?: boolean;
};

const buttonVariants = variant({
  prop: 'colorVariant',
  variants: {
    plain: {},
    blue: {
      textColor: 'blue-300',
    },
    yellow: {
      backgroundColor: 'yellow-500',
      borderStyle: 'solid',
      borderWidthY: '1px',
      borderStyleX: '0',
      fontWeight: 'base',
    },
  },
});

const size = ({ size, theme }: any) =>
  size &&
  css`
    border-radius: 2px;
    padding-top: 4px;
    font-size: 1.5rem;

    ${theme.breakpoints.md} {
      font-size: 1.75rem;
    }
  `;

type ButtonProps = HandlerProps<typeof buttonVariants> & {
  /**
   * Determines the size of the button.
   */
  size?: AccordionButtonSize;
};

const ButtonComponent = styled(ButtonDeprecatedBase)<ButtonProps>`
  display: flex;
  justify-content: space-between;
  padding: 0.375rem 1rem;
  width: 100%;
  column-gap: ${({ theme, size }) =>
    size === 'large' ? theme.spacing[16] : theme.spacing[12]};

  ${({ size, theme }: any) =>
    size === 'large' &&
    css`
      border-radius: 2px;
      padding-top: 4px;
      font-size: 1.5rem;

      ${theme.breakpoints.md} {
        font-size: 1.75rem;
      }
    `}

  &:hover {
    background-color: ;
  }

  ${size}
  ${buttonVariants};
`;

const ExpandIcon = styled(ArrowChevronDownIcon)<{ expanded?: boolean }>`
  transition: transform 0.35s ease-out;
  transform: ${({ expanded }) => expanded && `rotate(-180deg)`};
`;

export const AccordionButton: React.FC<AccordionButtonProps> = ({
  children,
  className,
  expanded,
  size = 'normal',
  colorVariant = 'plain',
  ...baseProps
}) => {
  const iconSize = size === 'large' ? 30 : 16;

  return (
    <ButtonComponent
      className={className}
      aria-expanded={expanded}
      colorVariant={colorVariant}
      size={size}
      {...baseProps}
      as="button"
    >
      <Box paddingTop={size === 'large' ? 4 : 0}>{children}</Box>
      <ExpandIcon
        expanded={expanded}
        height={iconSize}
        width={iconSize}
        aria-hidden
      />
    </ButtonComponent>
  );
};
