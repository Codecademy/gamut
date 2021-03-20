import { Box, FlexBox } from '@codecademy/gamut';
import { ArrowChevronDownFilledIcon } from '@codecademy/gamut-icons';
import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';

import { Popover } from '../../../Popover';
import { AppHeaderAvatar } from '../AppHeaderAvatar';
import { HeaderLink } from '../AppHeaderLink';
import { AppHeaderLinkSections } from '../AppHeaderLinkSections';
import { AppHeaderClickHandler, AppHeaderDropdownItem } from '../types';

export type AppHeaderDropdownProps = {
  action: AppHeaderClickHandler;
  item: AppHeaderDropdownItem;
};

const Caret = styled(ArrowChevronDownFilledIcon, {
  shouldForwardProp: isPropValid,
})<{ isOpen?: boolean }>`
  margin-left: ${({ theme }) => theme.spacing[8]};
  transition: transform 0.35s ease-out;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(-180deg)' : 'none')};
`;

export const AppHeaderDropdown: React.FC<AppHeaderDropdownProps> = ({
  action,
  item,
}) => {
  const headerDropdownRef = useRef<HTMLAnchorElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = (event: React.MouseEvent) => {
    setIsOpen(!isOpen);
    !isOpen && action(event, item);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const clickTarget =
    item.type === 'profile-dropdown' ? (
      <HeaderLink
        ref={headerDropdownRef}
        variant="interface"
        paddingY={4}
        onClick={(event) => toggleIsOpen(event)}
      >
        <FlexBox display="inline-flex" alignItems="center">
          <AppHeaderAvatar imageUrl={item.avatar} />
        </FlexBox>
      </HeaderLink>
    ) : (
      <HeaderLink
        ref={headerDropdownRef}
        variant="interface"
        paddingY={8}
        paddingRight={isOpen ? 0 : 4}
        fontWeight={isOpen ? 'title' : 'base'}
        onClick={(event) => toggleIsOpen(event)}
      >
        <FlexBox display="inline-flex" alignItems="center">
          {item.text}
          <Caret size={12} aria-label="dropdown" isOpen={isOpen} />
        </FlexBox>
      </HeaderLink>
    );

  return (
    <>
      {clickTarget}
      <Popover
        align={item.type === 'profile-dropdown' ? 'right' : 'left'}
        verticalOffset={item.type === 'profile-dropdown' ? 0 : -2}
        outline
        isOpen={isOpen}
        onRequestClose={handleClose}
        targetRef={headerDropdownRef}
      >
        <Box paddingX={24} paddingY={12}>
          <AppHeaderLinkSections action={action} item={item} />
        </Box>
      </Popover>
    </>
  );
};
