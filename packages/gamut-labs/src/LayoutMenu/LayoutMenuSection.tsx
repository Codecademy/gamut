import { Box } from '@codecademy/gamut';
import React from 'react';

import { SectionItem } from './AccordionMenu';
import { SectionItemLink } from './SectionItemLink';
import { SelectedSectionItem } from './SelectedSectionItem';

export type LayoutMenuSectionProps = {
  items: SectionItem[];
  selectedItem?: string;
  onItemClick: () => void;
};

export const LayoutMenuSection: React.FC<LayoutMenuSectionProps> = ({
  items,
  selectedItem,
  onItemClick,
}) => (
  <Box>
    {items.map((item) => (
      <Box key={item.slug} py={8} px={4} pb={16}>
        {selectedItem === item.slug ? (
          <SelectedSectionItem>{item.title}</SelectedSectionItem>
        ) : (
          <SectionItemLink
            href={item.href}
            onClick={(event) => {
              item.onClick(event);
              onItemClick();
            }}
          >
            {item.title}
          </SectionItemLink>
        )}
      </Box>
    ))}
  </Box>
);
