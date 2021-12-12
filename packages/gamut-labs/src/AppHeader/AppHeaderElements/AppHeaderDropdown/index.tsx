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
import styles from './styles.module.scss';

const StyledAnchor = styled(Anchor)`
  align-items: center;
  display: flex;
  height: 100%;
  font-weight: normal;
  padding: ${pxRem(8)} 0;
  white-space: nowrap;
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
      <StyledAnchor
        ref={headerDropdownRef}
        as="button"
        className={cx(isOpen && styles.open)}
        onClick={(event) => toggleIsOpen(event)}
        variant="interface"
      >
        <span title={item.text} className={styles.copy}>
          {item.text}
        </span>
        <ArrowChevronDownFilledIcon
          size={12}
          className={styles.icon}
          aria-label="dropdown"
        />
      </StyledAnchor>
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
