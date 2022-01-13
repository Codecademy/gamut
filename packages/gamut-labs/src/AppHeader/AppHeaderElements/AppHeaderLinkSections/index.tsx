import { css, states } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { AppHeaderLink } from '../AppHeaderLink';
import {
  AppHeaderClickHandler,
  AppHeaderDropdownItem,
  AppHeaderLinkItem,
} from '../types';

export type AppHeaderLinkSectionsProps = {
  action: AppHeaderClickHandler;
  item: AppHeaderDropdownItem;
  ref?: React.RefObject<HTMLUListElement>;
  role?: string;
  id?: string;
  style?: {};
  showIcons?: boolean;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

type LinkComponentProps = {
  action: AppHeaderClickHandler;
  link: AppHeaderLinkItem;
  showLineBreak?: boolean;
  showIcons?: boolean;
  onKeyDown?: (event: React.KeyboardEvent) => void;
};

type StyledListItemProps = {
  showLineBreak?: boolean;
};

const StyledList = styled.ul(
  css({
    listStyle: `none`,
    padding: 0,
  })
);

const StyledListItem = styled.li<StyledListItemProps>(
  states({
    showLineBreak: {
      '&:before': {
        bg: `gray-600`,
        content: `''`,
        display: `block`,
        height: `1px`,
        margin: `0.5rem 1.5rem`,
        width: `calc(100% - 3rem)`,
      },
    },
  })
);

const LinkComponent: React.FC<LinkComponentProps> = ({
  action,
  link,
  showIcons = false,
  showLineBreak = false,
  onKeyDown,
}) => (
  <StyledListItem role="none" showLineBreak={showLineBreak}>
    <AppHeaderLink
      action={action}
      item={link}
      onKeyDown={onKeyDown}
      py={16}
      showIcons={showIcons}
      tabIndex="-1"
    />
  </StyledListItem>
);

export const AppHeaderLinkSections = React.forwardRef<
  HTMLUListElement,
  AppHeaderLinkSectionsProps
>(({ action, item, showIcons = false, onKeyDown, ...props }, ref) => (
  <StyledList ref={ref} {...props}>
    {item.type === 'profile-dropdown'
      ? item.popover.map((linkSection: AppHeaderLinkItem[], sectionIndex) =>
          linkSection.map((link: AppHeaderLinkItem, linkIndex) => (
            <LinkComponent
              onKeyDown={onKeyDown}
              key={link.id}
              action={action}
              link={link}
              showLineBreak={sectionIndex !== 0 && linkIndex === 0}
              showIcons={showIcons}
            />
          ))
        )
      : item.popover.map((link: AppHeaderLinkItem) => (
          <LinkComponent
            onKeyDown={onKeyDown}
            key={link.id}
            action={action}
            link={link}
          />
        ))}
  </StyledList>
));
