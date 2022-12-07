import { Box } from '@codecademy/gamut';
import { system } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import * as React from 'react';

import { SectionItem } from './AccordionMenu';
import { SectionItemLink } from './SectionItemLink';
import { SelectedSectionItem } from './SelectedSectionItem';

export type LayoutMenuSectionStyles = StyleProps<typeof system.space>;

export type LayoutMenuSectionProps = LayoutMenuSectionStyles & {
  items: SectionItem[];
  selectedItem?: string;
  onItemClick: () => void;
};

export const LayoutMenuSection: React.FC<LayoutMenuSectionProps> = ({
  items,
  selectedItem,
  onItemClick,
  ...styleProps
}) => (
  <Box {...styleProps}>
    {items.map((item) => (
      <Box key={item.slug} py={8} px={4}>
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
