import {
  AccordionArea,
  AccordionButton,
  Anchor,
  Box,
  Text,
} from '@codecademy/gamut';
import { theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { useState } from 'react';

export type MenuData = {
  title: string;
  slug: string;
  items: MenuItemData[];
};

export type MenuItemData = {
  title: string;
  slug: string;
};

export type AccordionMenuProps = {
  menuData: MenuData;
  onSectionToggle: (sectionSlug: string) => void;
  onMenuItemClick: (item: MenuItemData, sectionSlug: string) => void;
  selectedItem?: string;
};

const StyledAccordionArea = styled(AccordionArea)`
  padding-bottom: ${theme.spacing[32]};
`;

const StyledAccordionButton = styled(AccordionButton)`
  margin-left: -${theme.spacing[16]};
  width: auto;
`;

export const AccordionMenu: React.FC<AccordionMenuProps> = ({
  menuData,
  onSectionToggle,
  onMenuItemClick,
  selectedItem,
}) => {
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <StyledAccordionArea
      expanded={expanded}
      top={
        <StyledAccordionButton
          expanded={expanded}
          onClick={() => {
            setExpanded(!expanded);
            onSectionToggle(menuData.slug);
          }}
        >
          <Text variant="title-xs">{menuData.title}</Text>
        </StyledAccordionButton>
      }
    >
      {menuData.items.map((item) => {
        if (selectedItem === item.slug) {
          return (
            <Box key={item.slug} py={8}>
              <Box
                borderColor="navy"
                borderStyleLeft="solid"
                borderWidthLeft="6px"
                pl={12}
              >
                <Text as="span" fontWeight="title">
                  {item.title}
                </Text>
              </Box>
            </Box>
          );
        }
        return (
          <Box key={item.slug} py={8}>
            <Anchor
              variant="interface"
              display="block"
              onClick={() => onMenuItemClick(item, menuData.slug)}
            >
              {item.title}
            </Anchor>
          </Box>
        );
      })}
    </StyledAccordionArea>
  );
};
