import { Box } from '@codecademy/gamut';
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

const List = styled(Box)`
  list-style: none;
  & + & {
    border-top: 1px solid ${({ theme }) => theme.colors.navy};
    margin-top: ${({ theme }) => theme.spacing[8]};
    padding-top: ${({ theme }) => theme.spacing[8]};
  }
`;

const ListItem = styled(Box)();

type LinkListProps = {
  links: AppHeaderLinkItem[];
  action: AppHeaderClickHandler;
};

const LinkList: React.FC<LinkListProps> = ({ links, action }) => {
  return (
    <List
      as="ul"
      padding={0}
      margin={0}
      paddingX={{ md: 8 }}
      marginX={{ md: 16 }}
    >
      {links.map((link: AppHeaderLinkItem) => {
        return (
          <ListItem as="li" key={link.id} width="100%" display="flex">
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
        <>
          {item.popover.map((linkSection, i) => (
            <LinkList
              links={linkSection}
              action={action}
              key={linkSection.map(({ id }) => id).join('-')}
            />
          ))}
        </>
      );
    default:
      return <LinkList links={item.popover} action={action} />;
  }
};
