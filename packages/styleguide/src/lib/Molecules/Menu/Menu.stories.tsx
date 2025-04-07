import {
  FlexBox,
  Menu,
  MenuItem,
  MenuSeparator,
  PopoverContainer,
  Text,
} from '@codecademy/gamut';
import {
  AiChatSparkIcon,
  BashShellIcon,
  FileIcon,
  InformationalIcon,
  MultipleUsersIcon,
  PeopleIcon,
  RatingStarCircleIcon,
} from '@codecademy/gamut-icons';
import { Background } from '@codecademy/gamut-styles';
import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

const meta: Meta<typeof Menu> = {
  component: Menu,
  // This is a known issue with SB 8, see: https://github.com/storybookjs/storybook/issues/23170
  // Will fix this casting when the issue is resolved
  subcomponents: {
    MenuItem: MenuItem as React.ComponentType<unknown>,
    MenuSeparator: MenuSeparator as React.ComponentType<unknown>,
  },
  args: {
    spacing: 'normal',
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  args: {
    children: (
      <>
        <MenuItem>Menu Item</MenuItem>
        <MenuItem active>Active Item</MenuItem>
        <MenuItem icon={MultipleUsersIcon}>Icon Item</MenuItem>
        <MenuItem>Menu Item</MenuItem>
      </>
    ),
  },
};

export const Popover: Story = {
  args: {
    variant: 'popover',
    children: (
      <>
        <MenuItem onClick={() => null}>Menu Item</MenuItem>
        <MenuItem active onClick={() => null}>
          Active Item
        </MenuItem>
        <MenuItem icon={MultipleUsersIcon} onClick={() => null}>
          Icon Item
        </MenuItem>
        <MenuItem onClick={() => null}>Menu Item</MenuItem>
      </>
    ),
  },
};

export const Fixed: Story = {
  args: {
    variant: 'fixed',
    children: (
      <>
        <MenuItem href="#">Menu Item</MenuItem>
        <MenuItem active href="#">
          Active Item
        </MenuItem>
        <MenuItem icon={MultipleUsersIcon} href="#">
          Icon Item
        </MenuItem>
        <MenuItem href="#">Menu Item</MenuItem>
      </>
    ),
  },
};

export const PopoverCondensed: Story = {
  args: {
    variant: 'popover',
    children: (
      <>
        <MenuItem>Menu Item</MenuItem>
        <MenuItem active>Active Item</MenuItem>
        <MenuItem icon={MultipleUsersIcon}>Icon Item</MenuItem>
        <MenuItem>Menu Item</MenuItem>
      </>
    ),
    spacing: 'condensed',
  },
};

export const FixedCondensed: Story = {
  args: {
    variant: 'fixed',
    children: (
      <>
        <MenuItem>Menu Item</MenuItem>
        <MenuItem active>Active Item</MenuItem>
        <MenuItem icon={MultipleUsersIcon}>Icon Item</MenuItem>
        <MenuItem>Menu Item</MenuItem>
      </>
    ),
    spacing: 'condensed',
  },
};

export const PopoverMenuSeparator: Story = {
  args: {
    variant: 'popover',
    children: (
      <>
        <MenuItem>Menu Item</MenuItem>
        <MenuItem active>Active Item</MenuItem>
        <MenuSeparator />
        <MenuItem icon={MultipleUsersIcon}>Icon Item</MenuItem>
        <MenuItem>Menu Item</MenuItem>
      </>
    ),
  },
};

export const FixedMenuSeparator: Story = {
  args: {
    variant: 'fixed',
    children: (
      <>
        <MenuItem>Menu Item</MenuItem>
        <MenuItem active>Active Item</MenuItem>
        <MenuSeparator my={4} />
        <MenuItem icon={MultipleUsersIcon}>Icon Item</MenuItem>
        <MenuItem>Menu Item</MenuItem>
      </>
    ),
  },
};

export const IconMenu: Story = {
  args: {
    border: 1,
    borderRadius: 'md',
    width: '88px',
    variant: 'fixed',
    children: (
      <>
        <MenuItem icon={AiChatSparkIcon} label="Chat" />
        <MenuItem icon={BashShellIcon} href="#whatsup" label="Prompt" />
        <MenuItem icon={PeopleIcon} label="People" href="#whatsup-people" />
        <MenuItem active icon={FileIcon} href="#whatsup-1" label="Learn" />
        <MenuItem
          aria-label="I am bold and different"
          icon={RatingStarCircleIcon}
          href="#whats-2"
          label={{
            info: <Text color="hyper">I am bold and different</Text>,
            narrow: true,
          }}
        />
        <MenuItem icon={InformationalIcon} href="#who-is-3" label="Content" />
      </>
    ),
  },
};

export const FloatingMenuExample: React.FC = () => {
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
    <FlexBox minHeight="30px" position="relative" m={48}>
      <FlexBox flex={1}>
        <Background bg="black" height="100%" pl={48} borderRadius="lg">
          <FlexBox
            bg="navy"
            justifyContent="right"
            alignItems="center"
            dimensions="200px"
            height="100%"
            ref={target}
          >
            <Menu variant="fixed" role="menu">
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
            <Background bg="white" borderRadius="lg">
              <Menu variant="popover" role="menu">
                {activeIndex % 2 === 0 ? (
                  <>
                    <MenuItem>i am a side menu!</MenuItem>
                    <MenuItem href="cool">cool link</MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem>i am a DIFFERENT menu!</MenuItem>
                    <MenuItem href="cool-too"> another cool link</MenuItem>
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
