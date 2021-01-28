import { MiniChevronDownIcon } from '@codecademy/gamut-icons';
import { space, theme, variant } from '@codecademy/gamut-styles';
import { HandlerProps } from '@codecademy/gamut-system';
import { UnionToIntersection } from '@codecademy/gamut-system/dist/types/utils';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { ComponentProps } from 'react';

import { Box } from '../Box';
import { ButtonDeprecatedBase } from '../ButtonDeprecatedBase';
export type AccordionButtonSize = 'normal' | 'large';

export type AccordionButtonVariant = 'blue' | 'plain' | 'yellow';

export type AccordionButtonProps = UnionToIntersection<
  ComponentProps<typeof ButtonComponent> & {
    /**
     * Whether the button should display as open or closed.
     */
    expanded?: boolean;
  }
>;

const buttonVariants = variant<'colorVariant', AccordionButtonVariant>({
  prop: 'colorVariant',
  variants: {
    plain: {
      textColor: 'black',
    },
    blue: {
      textColor: 'blue-300',
    },
    yellow: {
      textColor: 'yellow-400',
      backgroundColor: 'yellow-0',
      borderColorY: 'yellow-500',
      fontWeight: 'base',
      borderRadius: '0',
    },
  },
});

const focusVariants = variant<'colorVariant', AccordionButtonVariant>({
  prop: 'colorVariant',
  variants: {
    plain: {
      boxShadow: `0 0 0 2px ${theme.colors.white}, 0 0 0 4px currentColor`,
    },
    blue: {
      boxShadow: `0 0 0 2px ${theme.colors.white}, 0 0 0 4px currentColor`,
    },
    yellow: {
      borderColorY: 'yellow-400',
    },
  },
});
type ButtonProps = HandlerProps<typeof space> & {
  colorVariant?: AccordionButtonVariant;
  /**
   * Determines the size of the button.
   */
  size?: AccordionButtonSize;
};

const ButtonComponent = styled(ButtonDeprecatedBase)<ButtonProps>((props) => {
  const spaceStyles = space(props);
  const variantStyles = buttonVariants(props);
  const focusStyles = focusVariants(props);
  const { theme } = props;

  return css`
    display: flex;
    border: none;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0.375rem 1rem;
    border-radius: 2px;
    border: 1px solid transparent;
    column-gap: ${theme.spacing[12]};
    ${variantStyles};

    &:focus-visible {
      ${focusStyles}
    }

    & > * {
      color: inherit;
    }

    ${spaceStyles}
  `;
});

const ExpandIcon = styled(MiniChevronDownIcon)<{ expanded?: boolean }>`
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
      {...baseProps}
    >
      <Box
        paddingLeft={baseProps.paddingLeft}
        paddingTop={size === 'large' ? 4 : 0}
        textAlign="left"
        lineHeight="base"
        width="100%"
      >
        {children}
      </Box>
      <ExpandIcon
        expanded={expanded}
        height={iconSize}
        width={iconSize}
        aria-hidden
      />
    </ButtonComponent>
  );
};
