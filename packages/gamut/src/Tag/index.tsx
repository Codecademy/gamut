import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import {
  Background,
  system,
  useCurrentMode,
  variant,
} from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import React from 'react';

import { Box } from '../Box';
import { ButtonProps } from '../Button';
import { ButtonBase } from '../ButtonBase';
import { Selectors } from '../ButtonBase/ButtonBase';

const colorVariants = variant({
  defaultVariant: 'default',
  base: {
    alignItems: 'center',
    borderRadius: '4px',
    display: 'flex',
    height: '24px',
    justifyContent: 'center',
    minWidth: 'fit-content',
    width: 'fit-content',
  },
  variants: {
    default: {
      bg: `background-current`,
      color: 'text',
    },
    grey: {
      bg: `navy-500`,
      color: 'white',
    },
  },
});

const tagProps = variance.compose(
  system.space,
  system.layout,
  system.typography
);

export interface BaseTagProps
  extends StyleProps<typeof tagProps>,
    StyleProps<typeof colorVariants> {}
export interface ReadOnlyTagProps extends BaseTagProps {
  /**
   * If the DismissButton should be shown.
   */
  readonly: true;
  /**
   * ClickHandler for the DismissButton.
   */
  onDismiss?: never;
}
export interface DismissableTagProps extends BaseTagProps {
  /**
   * If the DismissButton should be shown.
   */
  readonly?: false;
  /**
   * ClickHandler for the DismissButton.
   */
  onDismiss: ButtonProps['onClick'];
}

export type TagProps = ReadOnlyTagProps | DismissableTagProps;

const DeleteButton = styled(ButtonBase)(
  variant({
    defaultVariant: 'default',
    base: {
      alignItems: 'center',
      border: 1,
      borderColor: 'transparent',
      borderRadiusRight: '4px',
      color: 'currentColor',
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      width: '24px',
    },
    variants: {
      default: {
        [Selectors.HOVER]: {
          bg: 'background-hover',
        },
        [Selectors.FOCUS]: {
          bg: 'background-selected',
          // borderColor: 'feedback-warning',
        },
      },
      grey: {
        [Selectors.HOVER]: {
          bg: 'navy-600',
        },
        [Selectors.FOCUS]: {
          bg: 'navy-700',
          // borderColor: 'feedback-warning',
        },
      },
    },
  })
);

export const TagWrapper = styled(Background)<BaseTagProps>(
  tagProps,
  colorVariants
);

export const Tag: React.FC<TagProps> = ({
  children,
  variant,
  readonly,
  onDismiss,
  ...rest
}) => {
  const mode = useCurrentMode();

  return (
    <TagWrapper
      bg={
        variant === 'grey'
          ? 'navy-500'
          : mode === 'light'
          ? 'navy-900'
          : 'white'
      }
      {...rest}
    >
      <Box as="span" fontSize={14} px={8}>
        {children}
      </Box>
      {!readonly && (
        <DeleteButton onClick={onDismiss || undefined}>
          <MiniDeleteIcon size={12} />
        </DeleteButton>
      )}
    </TagWrapper>
  );
};
