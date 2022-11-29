import { Box } from '@codecademy/gamut';
import { system } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import React from 'react';

import { SectionItem } from './AccordionMenu';
import { SectionItemLink } from './SectionItemLink';

export type LayoutMenuSectionStyles = StyleProps<typeof system.space>;

export type LayoutMenuSectionProps = LayoutMenuSectionStyles & {
  items: SectionItem[];
  onItemClick: () => void;
};

export const LayoutMenuSection: React.FC<LayoutMenuSectionProps> = ({
  items,
  onItemClick,
  ...styleProps
}) => (
  <Box {...styleProps}>
    {items.map((item) => (
      <Box key={item.slug} px={4}>
        <SectionItemLink
          href={item.href}
          onClick={(event) => {
            item.onClick(event);
            onItemClick();
          }}
        >
          {item.title}
        </SectionItemLink>
      </Box>
    ))}
  </Box>
);
