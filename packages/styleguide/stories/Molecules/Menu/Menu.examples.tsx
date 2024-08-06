import {
  FlexBox,
  Menu,
  MenuItem,
  MenuSeparator,
  PopoverContainer,
  PopoverContainerProps,
} from '@codecademy/gamut';
import { MultipleUsersIcon } from '@codecademy/gamut-icons';
import { Background } from '@codecademy/gamut-styles';
import { useRef, useState } from 'react';
import * as React from 'react';

export const MenuItemsExample: React.FC<{
  type?: 'button' | 'link' | 'default';
}> = ({ type }) => {
  const menuItemProps =
    type === 'button'
      ? { onClick: () => null }
      : type === 'link'
      ? { href: '#' }
      : {};
  return (
    <>
      <MenuItem {...menuItemProps}>Menu Item</MenuItem>
      <MenuItem active {...menuItemProps}>
        Active Item
      </MenuItem>
      <MenuSeparator />
      <MenuItem icon={MultipleUsersIcon} {...menuItemProps}>
        Icon Item
      </MenuItem>
      <MenuItem {...menuItemProps}>Menu Item</MenuItem>
    </>
  );
};

export const PopoverMenuExample: React.FC<PopoverContainerProps> = () => {
  const target = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentTarget, setCurrentTarget] = useState(0);
  const [alignment, setAlignment] = useState<'top-right' | 'bottom-right'>(
    'top-right'
  );
  const [activeIndex, setActiveIndex] = useState(4);

  const clickHandler = (targetNumber: number, currentIndex: number) => {
    setCurrentTarget(targetNumber);
    setAlignment(currentIndex === 3 ? 'bottom-right' : 'top-right');

    if (isOpen && currentIndex === activeIndex) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }

    if (currentIndex !== activeIndex) setActiveIndex(currentIndex);
  };

  return (
    <FlexBox minHeight="30px" width={1} position="relative" m={48}>
      <FlexBox flex={1}>
        <Background bg="black" height="100%" pl={48} borderRadius="l">
          <FlexBox
            bg="navy"
            justifyContent="right"
            alignItems="center"
            dimensions="200px"
            height="100%"
            ref={target}
          >
            <Menu border="none" variant="navigation" role="menu">
              <MenuItem
                active={activeIndex === 0}
                onClick={() => clickHandler(-68, 0)}
              >
                i have a side menu
              </MenuItem>
              <MenuItem
                active={activeIndex === 1}
                onClick={() => clickHandler(-115, 1)}
              >
                Active Item
              </MenuItem>
              <MenuSeparator />
              <MenuItem
                active={activeIndex === 2}
                onClick={() => clickHandler(-164, 2)}
                icon={MultipleUsersIcon}
              >
                Icon Item
              </MenuItem>
              <MenuItem active={activeIndex === 3} onClick={() => null}>
                A complex action
              </MenuItem>
            </Menu>
          </FlexBox>
          <PopoverContainer
            isOpen={isOpen}
            inline
            alignment={alignment}
            x={-21}
            y={currentTarget}
            targetRef={target}
          >
            <Background bg="white" borderRadius="l">
              <Menu variant="select" role="menu">
                {activeIndex % 2 === 0 ? (
                  <>
                    <MenuItem>i am a side menu!</MenuItem>
                    <MenuSeparator />
                    <MenuItem href="cool">cool link</MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem>i am a DIFFERENT menu!</MenuItem>
                    <MenuSeparator />
                    <MenuItem href="cool-too"> another cool link</MenuItem>
                    <MenuSeparator />
                    <MenuItem>an action</MenuItem>
                  </>
                )}
              </Menu>
            </Background>
          </PopoverContainer>
        </Background>
      </FlexBox>
    </FlexBox>
  );
};
