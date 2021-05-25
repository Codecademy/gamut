import React from 'react';

import { AccordionMenu, MenuData, MenuItemData } from './AccordionMenu';

export type LayoutMenuProps = {
  /**
   * An array of menu data including the title, slug, and items, each of which will become an accordion
   */
  allMenuData: MenuData[];
  /**
   * React Node containing any additional links to be rendered after the accordions
   */
  additionalLinks?: React.ReactNode;
  /**
   * Callback to be run on click of the accordion button
   */
  onSectionToggle: (sectionSlug: string) => void;
  /**
   * Callback to be run on click of a menu item. This should include where the link should go
   */
  onMenuItemClick: (item: MenuItemData, sectionSlug: string) => void;
  /**
   * The slug of the current selected menu item
   */
  selectedItem?: string;
};

export const LayoutMenu: React.FC<LayoutMenuProps> = ({
  allMenuData,
  additionalLinks,
  onSectionToggle,
  onMenuItemClick,
  selectedItem,
}) => {
  return (
    <nav>
      {allMenuData.map((data) => (
        <AccordionMenu
          key={data.slug}
          menuData={data}
          onSectionToggle={onSectionToggle}
          onMenuItemClick={onMenuItemClick}
          selectedItem={selectedItem}
        />
      ))}
      {/* more links that are not accordions */}
      {additionalLinks}
    </nav>
  );
};
