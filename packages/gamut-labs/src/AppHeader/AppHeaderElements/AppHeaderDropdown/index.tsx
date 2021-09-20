import { Box, IconButton } from '@codecademy/gamut';
import { ArrowChevronDownFilledIcon } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import cx from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef, useState } from 'react';

import { Avatar } from '../../../Avatar';
import { Popover } from '../../../Popover';
import { AppHeaderLinkSections } from '../AppHeaderLinkSections';
import { focusStyles, hoverStyles, textButtonStyles } from '../SharedStyles';
import { AppHeaderClickHandler, AppHeaderDropdownItem } from '../types';
import styles from './styles.module.scss';

const AppHeaderTextTargetButton = styled.button`
  ${textButtonStyles}
  ${hoverStyles}
  ${focusStyles}
`;

export type AppHeaderDropdownProps = {
  action: AppHeaderClickHandler;
  item: AppHeaderDropdownItem;
};

export const AppHeaderDropdown: React.FC<AppHeaderDropdownProps> = ({
  action,
  item,
}) => {
  const headerDropdownRef = useRef<HTMLDivElement>(null);
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
      <IconButton onClick={toggleIsOpen}>
        <Avatar
          src={item.avatar}
          alt="User profile avatar"
          disableDropshadow
          size={40}
        />
      </IconButton>
    ) : (
      <AppHeaderTextTargetButton
        className={cx(styles.target, isOpen && styles.open)}
        onClick={(event) => toggleIsOpen(event)}
      >
        <span title={item.text} className={styles.copy}>
          {item.text}
        </span>
        <ArrowChevronDownFilledIcon
          size={12}
          className={styles.icon}
          aria-label="dropdown"
        />
      </AppHeaderTextTargetButton>
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
      <div ref={headerDropdownRef}>{clickTarget}</div>
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
