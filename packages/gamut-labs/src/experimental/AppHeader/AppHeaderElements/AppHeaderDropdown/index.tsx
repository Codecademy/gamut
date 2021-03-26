import { Box, FlexBox } from '@codecademy/gamut';
import { ArrowChevronDownFilledIcon } from '@codecademy/gamut-icons';
import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
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

  const paddingY = 24;
  const linkHeight = 56;
  const separatorHeight = 16;
  const getPopoverHeight = () => {
    if (item.type === 'dropdown')
      return item.popover.length * linkHeight + paddingY;
    const numberOfLinks = item.popover.reduce(
      (sum, linksArray) => sum + linksArray.length,
      0
    );
    const totalSeparatorHeight = separatorHeight * (item.popover.length - 1);
    return numberOfLinks * linkHeight + totalSeparatorHeight + paddingY;
  };

  return (
    <>
      {clickTarget}
      <AnimatePresence>
        {isOpen && (
          <Popover
            align={item.type === 'profile-dropdown' ? 'right' : 'left'}
            verticalOffset={item.type === 'profile-dropdown' ? 0 : -2}
            outline
            isOpen={isOpen}
            onRequestClose={handleClose}
            targetRef={headerDropdownRef}
          >
            <motion.div
              style={{ overflow: 'hidden', top: '12px', position: 'relative' }}
              initial={{ height: 0 }}
              animate={{ height: getPopoverHeight() }}
              transition={{ duration: 0.175 }}
              exit={{ height: 0 }}
            >
              <Box paddingX={24}>
                <AppHeaderLinkSections action={action} item={item} />
              </Box>
            </motion.div>
          </Popover>
        )}
      </AnimatePresence>
    </>
  );
};
