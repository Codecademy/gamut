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
  onKeyDown?: (event: React.KeyboardEvent) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

type LinkComponentProps = {
  action: AppHeaderClickHandler;
  link: AppHeaderLinkItem;
  showLineBreak?: boolean;
  showIcon?: boolean;
  onKeyDown?: (event: React.KeyboardEvent) => void;
};

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
`;

const StyledLineBreak = styled.div`
  display: block;
  background-color: ${({ theme }) => theme.colors['gray-600']};
  margin: 0.5rem 1.5rem;
  width: calc(100% - 3rem);
  height: 1px;
`;

const LinkComponent: React.FC<LinkComponentProps> = ({
  action,
  link,
  showIcon = false,
  showLineBreak = false,
  onKeyDown,
}) => (
  <li role="none">
    {showLineBreak && <StyledLineBreak aria-hidden />}
    <AppHeaderLink
      py={16}
      action={action}
      item={link}
      showIcon={showIcon}
      tabIndex="-1"
      onKeyDown={onKeyDown}
    />
  </li>
);

export const AppHeaderLinkSections = React.forwardRef<
  HTMLUListElement,
  AppHeaderLinkSectionsProps
>(({ action, item, onKeyDown, ...props }, ref) => (
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
              showIcon
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
