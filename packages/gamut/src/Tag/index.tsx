import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { css, styledOptions, system, variant } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import React from 'react';

import { Box } from '../Box';
import { ButtonBase } from '../ButtonBase';

const colorVariants = variant({
  defaultVariant: 'default',
  base: {
    alignItems: 'center',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'center',
    height: '24px',
    width: 'fit-content',
  },
  variants: {
    default: {
      bg: `text`,
      textColor: 'background',
    },
    grey: {
      bg: `navy-500`,
      textColor: 'white',
    },
  },
});

const tagProps = variance.compose(
  system.space,
  system.layout,
  system.typography
);

export interface TagProps
  extends StyleProps<typeof tagProps>,
    StyleProps<typeof colorVariants> {
  readonly?: boolean;
}

export const DeleteButton = styled(ButtonBase)(
  css({
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    width: '24px',
  })
);

export const TagWrapper = styled('div', styledOptions)<TagProps>(
  tagProps,
  colorVariants
);

export const Tag: React.FC<TagProps> = ({ children, readonly }) => {
  return (
    <TagWrapper>
      <Box as="span" fontSize={14} px={8}>
        {children}
      </Box>
      <DeleteButton>
        <MiniDeleteIcon size={12} color="white" />
      </DeleteButton>
    </TagWrapper>
  );
};
