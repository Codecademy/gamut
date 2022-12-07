import { ContentContainer } from '@codecademy/gamut';
import { css, states } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import * as React from 'react';

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
  showIcon?: boolean;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  mobile?: boolean;
};

type LinkComponentProps = {
  action: AppHeaderClickHandler;
  link: AppHeaderLinkItem;
  showLineBreak?: boolean;
  showIcon?: boolean;
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
  showIcon = false,
  showLineBreak = false,
  onKeyDown,
}) => (
  <StyledListItem role="none" showLineBreak={showLineBreak}>
    <AppHeaderLink
      action={action}
      item={link}
      onKeyDown={onKeyDown}
      py={16}
      showIcon={showIcon}
      tabIndex="-1"
    />
  </StyledListItem>
);

export const AppHeaderLinkSections = React.forwardRef<
  HTMLUListElement,
  AppHeaderLinkSectionsProps
>(
  (
    { action, item, showIcon = false, onKeyDown, mobile = false, ...props },
    ref
  ) => (
    <ContentContainer size={mobile ? 'medium' : 'small'}>
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
                  showIcon={showIcon}
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
    </ContentContainer>
  )
);
