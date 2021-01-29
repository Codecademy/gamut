import { Box } from '@codecademy/gamut';
import React from 'react';

import { AppHeaderLinkMobile } from '../../../AppHeaderMobile';
import {
  AppHeaderClickHandler,
  AppHeaderDropdownItem,
  AppHeaderLinkItem,
  AppHeaderProfileDropdownItem,
} from '../types';

export type AppHeaderLinkSectionsProps = {
  action: AppHeaderClickHandler;
  item: AppHeaderDropdownItem | AppHeaderProfileDropdownItem;
};

export const AppHeaderLinkSections: React.FC<AppHeaderLinkSectionsProps> = ({
  action,
  item,
}) => {
  return (
    <>
      {item.type === 'profile-dropdown'
        ? item.popover.map((linkSection: AppHeaderLinkItem[], sectionIndex) => {
            return linkSection.map((link: AppHeaderLinkItem, linkIndex) => {
              if (sectionIndex !== 0 && linkIndex === 0) {
                return (
                  <Box key={link.id} paddingX={16}>
                    <AppHeaderLinkMobile
                      action={action}
                      item={link}
                      key={link.id}
                      topSeparator={true}
                    />
                  </Box>
                );
              }
              return (
                <Box key={link.id} paddingX={16}>
                  <AppHeaderLinkMobile
                    action={action}
                    item={link}
                    key={link.id}
                  />
                </Box>
              );
            });
          })
        : item.popover.map((link: AppHeaderLinkItem) => {
            return (
              <Box key={link.id} paddingX={16}>
                <AppHeaderLinkMobile action={action} item={link} />
              </Box>
            );
          })}
    </>
  );
};
