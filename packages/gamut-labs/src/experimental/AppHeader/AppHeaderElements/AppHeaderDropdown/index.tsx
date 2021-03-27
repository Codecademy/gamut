import { FlexBox } from '@codecademy/gamut';
import { ArrowChevronDownFilledIcon } from '@codecademy/gamut-icons';
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

export const AppHeaderDropdown: React.FC<AppHeaderDropdownProps> = ({
  action,
  item,
}) => {
  const headerDropdownRef = useRef<HTMLAnchorElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = (event: React.MouseEvent) => {
    !isOpen && action(event, item);
    setIsOpen(!isOpen);
  };
  const handleClose = () => setIsOpen(false);

  const activeVariant = isOpen ? 'open' : 'closed';
  const clickTarget =
    item.type === 'profile-dropdown' ? (
      <HeaderLink
        ref={headerDropdownRef}
        paddingY={4}
        onClick={(event) => toggleIsOpen(event)}
        aria-haspopup="true"
      >
        <AppHeaderAvatar imageUrl={item.avatar} />
      </HeaderLink>
    ) : (
      <HeaderLink
        ref={headerDropdownRef}
        menuVariant={activeVariant}
        onClick={(event) => toggleIsOpen(event)}
        aria-haspopup="true"
      >
        {item.text}
        <FlexBox marginLeft={8} alignItems="center">
          <motion.div
            initial="closed"
            animate={activeVariant}
            variants={{
              closed: { transform: 'rotate(0deg)' },
              open: { transform: 'rotate(-180deg)' },
            }}
          >
            <ArrowChevronDownFilledIcon size={12} aria-label="dropdown" />
          </motion.div>
        </FlexBox>
      </HeaderLink>
    );

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
              initial={{
                height: 0,
                padding: 0,
                overflow: 'hidden',
                minHeight: '100%',
              }}
              animate={{ height: 'auto' }}
              transition={{ duration: 0.175 }}
              exit={{ height: 0 }}
            >
              <AppHeaderLinkSections action={action} item={item} />
            </motion.div>
          </Popover>
        )}
      </AnimatePresence>
    </>
  );
};
