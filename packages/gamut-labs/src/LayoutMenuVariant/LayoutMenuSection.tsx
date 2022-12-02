import { Box } from '@codecademy/gamut';
import { system } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import React from 'react';

import { SectionItem } from './AccordionMenu';
import { SectionItemLink } from './SectionItemLink';

export type LayoutMenuSectionStyles = StyleProps<typeof system.space>;

export type LayoutMenuSectionProps = LayoutMenuSectionStyles & {
  items: SectionItem[];
  onItemClick: () => void;
};

const StyledBox = styled(Box)`
  list-style: none;
`;
export const LayoutMenuSection: React.FC<LayoutMenuSectionProps> = ({
  items,
  onItemClick,
  ...styleProps
}) => (
  <Box {...styleProps} as="menu" px={4} m={0}>
    {items.map((item) => (
      <StyledBox key={item.slug} as="li">
        <SectionItemLink
          href={item.href}
          onClick={(event) => {
            item.onClick(event);
            onItemClick();
          }}
        >
          {item.title}
        </SectionItemLink>
      </StyledBox>
    ))}
  </Box>
);
