import { Box, Menu } from '@codecademy/gamut';
import React from 'react';

import { AppHeaderLinkMobile } from '../../../AppHeaderMobile/AppHeaderLinkMobile';
import {
  AppHeaderClickHandler,
  AppHeaderDropdownItem,
  AppHeaderLinkItem,
} from '../types';

export type AppHeaderLinkSectionsProps = {
  action: AppHeaderClickHandler;
  item: AppHeaderDropdownItem;
};

export const AppHeaderLinkSections: React.FC<AppHeaderLinkSectionsProps> = ({
  action,
  item,
}) => {
  return (
    <Menu variant="action" border="none">
      {item.type === 'profile-dropdown'
        ? item.popover.map((linkSection: AppHeaderLinkItem[], sectionIndex) => {
            return linkSection.map((link: AppHeaderLinkItem, linkIndex) => {
              return (
                <AppHeaderLinkMobile
                  action={action}
                  item={link}
                  key={link.id}
                  topSeparator={sectionIndex !== 0 && linkIndex === 0}
                />
              );
            });
          })
        : item.popover.map((link: AppHeaderLinkItem) => {
            return (
              <AppHeaderLinkMobile action={action} item={link} key={link.id} />
            );
          })}
    </Menu>
  );
};
