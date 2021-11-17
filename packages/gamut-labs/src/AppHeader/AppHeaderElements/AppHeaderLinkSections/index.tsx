import { Badge } from '@codecademy/gamut';
import styled from '@emotion/styled';
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

export const StyledBadge = styled(Badge)`
  font-size: 10px;
  padding-top: 1px;
  padding-bottom: 10px;
  padding-left: 8px;
  padding-right: 8px;
  width: 36px;
  border-radius: 16px;
`;

const renderBadge = (shouldRender?: boolean) =>
  shouldRender ? (
    <StyledBadge
      round
      variant="blue"
      fontFamily="accent"
      ml={8}
      pl={8}
      pr={8}
      height={16}
      alignSelf="center"
    >
      New
    </StyledBadge>
  ) : undefined;

export const AppHeaderLinkSections: React.FC<AppHeaderLinkSectionsProps> = ({
  action,
  item,
}) => {
  return (
    <>
      {item.type === 'profile-dropdown'
        ? item.popover.map((linkSection: AppHeaderLinkItem[], sectionIndex) => {
            return linkSection.map((link: AppHeaderLinkItem, linkIndex) => {
              return (
                <AppHeaderLinkMobile
                  action={action}
                  item={link}
                  key={link.id}
                  topSeparator={sectionIndex !== 0 && linkIndex === 0}
                  badge={renderBadge(link.hasBadge)}
                />
              );
            });
          })
        : item.popover.map((link: AppHeaderLinkItem) => {
            return (
              <AppHeaderLinkMobile
                action={action}
                item={link}
                key={link.id}
                badge={renderBadge(link.hasBadge)}
              />
            );
          })}
    </>
  );
};
