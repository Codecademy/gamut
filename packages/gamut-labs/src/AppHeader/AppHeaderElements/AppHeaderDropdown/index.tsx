import { Anchor, Box, IconButton } from '@codecademy/gamut';
import { ArrowChevronDownFilledIcon } from '@codecademy/gamut-icons';
import { pxRem } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import cx from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef, useState } from 'react';

import { Avatar } from '../../../Avatar';
import { Popover } from '../../../Popover';
import { AppHeaderLinkSections } from '../AppHeaderLinkSections';
import { AppHeaderClickHandler, AppHeaderDropdownItem } from '../types';

const DropdownAnchor = styled(Anchor)`
  align-items: center;
  display: flex;
  height: 100%;
  font-weight: normal;
  padding: ${pxRem(8)} 0;
  white-space: nowrap;
`;

const DropdownIcon = styled(ArrowChevronDownFilledIcon)`
  margin-left: ${pxRem(5)};
  color: ${({ theme }) => theme.colors.navy};
  transition: transform 0.35s ease-out;
  transform-origin: center ${pxRem(5)};

  &.open {
    transform: rotate(-180deg);
  }
`;

export type AppHeaderDropdownProps = {
  action: AppHeaderClickHandler;
  item: AppHeaderDropdownItem;
};

export const AppHeaderDropdown: React.FC<AppHeaderDropdownProps> = ({
  action,
  item,
}) => {
  const headerDropdownRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = (event: React.MouseEvent) => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      action(event, item);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const clickTarget =
    item.type === 'profile-dropdown' ? (
      <IconButton ref={headerDropdownRef} onClick={toggleIsOpen}>
        <Avatar
          src={item.avatar}
          alt="User profile avatar"
          disableDropshadow
          size={40}
        />
      </IconButton>
    ) : (
      <DropdownAnchor
        ref={headerDropdownRef}
        as="button"
        onClick={(event) => toggleIsOpen(event)}
        title={item.text}
        variant="interface"
      >
        {item.text}
        <DropdownIcon
          aria-label="dropdown"
          className={cx(isOpen && 'open')}
          size={12}
        />
      </DropdownAnchor>
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
            verticalOffset={item.type === 'profile-dropdown' ? 4 : -2}
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
              <Box px={24}>
                <AppHeaderLinkSections action={action} item={item} />
              </Box>
            </motion.div>
          </Popover>
        )}
      </AnimatePresence>
    </>
  );
};
