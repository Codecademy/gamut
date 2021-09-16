import { Box } from '@codecademy/gamut';
import React from 'react';

import { SectionItem } from './AccordionMenu';
import { SectionItemLink } from './SectionItemLink';
import { SelectedSectionItem } from './SelectedSectionItem';

export type TopLinkSectionProps = {
  sections: SectionItem[];
  onItemClick: () => void;
  selectedItem?: string;
};

export const TopLinkSection: React.FC<TopLinkSectionProps> = ({
  sections,
  onItemClick,
  selectedItem,
}) => (
  <Box pb={32}>
    {sections.map((item) => (
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
