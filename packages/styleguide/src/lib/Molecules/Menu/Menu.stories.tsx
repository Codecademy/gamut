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
  SparkleIcon,
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
      <FlexBox column width="300px">
        <MenuItem onClick={() => null}>Menu Item</MenuItem>
        <MenuItem active onClick={() => null}>
          Active Item
        </MenuItem>
        <MenuItem icon={MultipleUsersIcon} onClick={() => null}>
          Icon Item
        </MenuItem>
        <MenuItem disabled onClick={() => null}>
          Disabled Item
        </MenuItem>
        <MenuItem
          disabled
          label={{
            info: 'This is disabled because...',
            alignment: 'right-center',
          }}
          onClick={() => null}
        >
          Disabled item with ToolTip
        </MenuItem>
        <MenuItem active disabled onClick={() => null}>
          (TESTING) Active Item and disabled
        </MenuItem>
      </FlexBox>
    ),
  },
};

export const Fixed: Story = {
  args: {
    variant: 'fixed',
    children: (
      <FlexBox column width="300px">
        <MenuItem href="#">Menu Item</MenuItem>
        <MenuItem href="#" active>
          Active Item
        </MenuItem>
        <MenuItem href="#" icon={MultipleUsersIcon}>
          Icon Item
        </MenuItem>
        <MenuItem disabled onClick={() => null}>
          Disabled Item
        </MenuItem>
        <MenuItem
          disabled
          label={{
            info: 'This is disabled because...',
            alignment: 'right-center',
          }}
          onClick={() => null}
        >
          Disabled item with ToolTip
        </MenuItem>
        <MenuItem active disabled onClick={() => null}>
          (TESTING) Active Item and disabled
        </MenuItem>
      </FlexBox>
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
        <MenuItem icon={AiChatSparkIcon} label="Chat" onClick={() => {}} />
        <MenuItem
          href="#whatsup"
          icon={BashShellIcon}
          label={{ alignment: 'right-center', info: 'Prompt' }}
        />
        <MenuItem
          href="#whatsup-people"
          icon={PeopleIcon}
          label={{ alignment: 'right-center', info: 'People' }}
        />
        <MenuItem
          active
          href="#whatsup-1"
          icon={FileIcon}
          label={{ alignment: 'right-center', info: 'Learn' }}
        />
        <MenuItem
          aria-label="I am bold and different"
          href="#whats-2"
          icon={RatingStarCircleIcon}
          label={{
            alignment: 'right-center',
            info: <Text color="hyper">I am bold and different</Text>,
            narrow: true,
          }}
        />
        <MenuItem
          href="#who-is-3"
          icon={InformationalIcon}
          label={{ alignment: 'right-center', info: 'Content' }}
        />
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
    <FlexBox m={48} minHeight="30px" position="relative">
      <FlexBox flex={1}>
        <Background bg="black" borderRadius="lg" height="100%" pl={48}>
          <FlexBox
            alignItems="center"
            bg="navy"
            dimensions="200px"
            height="100%"
            justifyContent="right"
            ref={target}
          >
            <Menu role="menu" variant="fixed">
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
                icon={MultipleUsersIcon}
                onClick={() => clickHandler(-164, 2)}
              >
                Icon Item
              </MenuItem>
              <MenuItem active={activeIndex === 3} onClick={() => null}>
                A complex action
              </MenuItem>
            </Menu>
          </FlexBox>
          <PopoverContainer
            alignment={alignment}
            inline
            isOpen={isOpen}
            targetRef={target}
            x={-21}
            y={currentTarget}
          >
            <Background bg="white" borderRadius="lg">
              <Menu role="menu" variant="popover">
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
