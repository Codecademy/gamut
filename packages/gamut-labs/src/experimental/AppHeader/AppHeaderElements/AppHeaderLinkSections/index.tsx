import { Box } from '@codecademy/gamut';
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
    <Box paddingX={16}>
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
    </Box>
  );
};
