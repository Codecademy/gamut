import { Box } from '@codecademy/gamut';
import { variant } from '@codecademy/gamut-styles';
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

const List = styled(Box)<{ variant?: 'separated' }>`
  list-style: none;
  ${variant({
    separated: {
      borderStyleTop: 'solid',
      borderWidthTop: '1px',
      borderColorTop: 'navy',
      paddingTop: 16,
      marginTop: 8,
    },
  })}
`;

const ListItem = styled(Box)();

const LinkList: React.FC<{
  links: AppHeaderLinkItem[];
  action: AppHeaderClickHandler;
  variant?: 'separated';
}> = ({ links, action, ...rest }) => {
  return (
    <List
      as="ul"
      padding={0}
      margin={0}
      paddingX={{ md: 8 }}
      marginX={{ md: 16 }}
      {...rest}
    >
      {links.map((link: AppHeaderLinkItem) => {
        return (
          <ListItem as="li" key={link.id}>
            <AppHeaderLinkMobile action={action} item={link} />
          </ListItem>
        );
      })}
    </List>
  );
};

export const AppHeaderLinkSections: React.FC<AppHeaderLinkSectionsProps> = ({
  action,
  item,
}) => {
  switch (item.type) {
    case 'profile-dropdown':
      return (
        <div>
          {item.popover.map((linkSection: AppHeaderLinkItem[], i) => {
            return (
              <LinkList
                links={linkSection}
                action={action}
                variant={i !== 0 ? 'separated' : undefined}
              />
            );
          })}
        </div>
      );
    default:
      return <LinkList links={item.popover} action={action} />;
  }
};
