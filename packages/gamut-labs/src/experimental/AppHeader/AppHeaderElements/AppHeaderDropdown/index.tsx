import { Box } from '@codecademy/gamut';
import { ArrowChevronDownFilledIcon } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import cx from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef, useState } from 'react';

import { Popover } from '../../../Popover';
import { AppHeaderAvatar } from '../AppHeaderAvatar';
import { AppHeaderLinkSections } from '../AppHeaderLinkSections';
import { focusStyles, hoverStyles, textButtonStyles } from '../SharedStyles';
import { AppHeaderClickHandler, AppHeaderDropdownItem } from '../types';
import styles from './styles.module.scss';

const DropdownContainer = Box.withComponent(motion.div);

const AppHeaderTextTargetButton = styled.button`
  ${textButtonStyles}
  ${hoverStyles}
  ${focusStyles}
`;

const AppHeaderAvatarTargetButton = styled.button`
  background-color: transparent;
  border: transparent;
  font-weight: normal;
  padding: 2px 0;
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
    !isOpen && action(event, item);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const clickTarget =
    item.type === 'profile-dropdown' ? (
      <AppHeaderAvatarTargetButton onClick={(event) => toggleIsOpen(event)}>
        <AppHeaderAvatar imageUrl={item.avatar} />
      </AppHeaderAvatarTargetButton>
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

  const animationSpeed = 708;
  const popoverHeight = item.popover.length * 56 + 24;
  const animationDuration = popoverHeight / animationSpeed;
  console.log({ animationSpeed, popoverHeight, animationDuration });

  return (
    <>
      <div ref={headerDropdownRef}>{clickTarget}</div>
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
              style={{ overflow: 'hidden' }}
              initial={{ maxHeight: 0 }}
              animate={{ maxHeight: popoverHeight }}
              transition={{ duration: animationDuration }}
              exit={{ maxHeight: 0 }}
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
