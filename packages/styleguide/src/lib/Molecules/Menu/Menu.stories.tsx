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
  argTypes: {
    spacing: {
      control: 'radio',
      options: ['normal', 'condensed'],
    },
    variant: {
      control: 'radio',
      options: ['popover', 'fixed'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  args: {
    children: (
      <>
        <MenuItem>Menu item</MenuItem>
        <MenuItem active>Active item</MenuItem>
        <MenuItem icon={MultipleUsersIcon}>Icon item</MenuItem>
        <MenuItem>Menu item</MenuItem>
      </>
    ),
  },
};

export const Popover: Story = {
  args: {
    variant: 'popover',
  },
  render: (args) => (
    <FlexBox column width="fit-content">
      <Menu aria-orientation="vertical" role="menubar">
        <MenuItem label="testing" onClick={() => null}>
          Menu item with Tooltip
        </MenuItem>
        <MenuItem active onClick={() => null}>
          Active item
        </MenuItem>
        <MenuItem
          icon={MultipleUsersIcon}
          label={{
            info: 'More info here...',
            alignment: 'right-center',
          }}
          onClick={() => null}
        >
          Icon item with ToolTip
        </MenuItem>
        <MenuItem disabled href="/">
          Disabled link no ToolTip
        </MenuItem>
        <MenuItem
          disabled
          label={{
            info: 'This is disabled because...',
            alignment: 'right-center',
          }}
          onClick={() => null}
        >
          Disabled button with ToolTip
        </MenuItem>
      </Menu>
    </FlexBox>
  ),
};

export const Fixed: Story = {
  args: {
    variant: 'fixed',
  },
  render: (args) => (
    <FlexBox column width="fit-content">
      <nav>
        <Menu {...args}>
          <MenuItem label="testing" onClick={() => null}>
            Menu item with Tooltip
          </MenuItem>
          <MenuItem active onClick={() => null}>
            Active item
          </MenuItem>
          <MenuItem
            icon={MultipleUsersIcon}
            label={{
              info: 'More info here...',
              alignment: 'right-center',
            }}
            onClick={() => null}
          >
            Icon item with ToolTip
          </MenuItem>
          <MenuItem disabled onClick={() => null}>
            Disabled item no ToolTip
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
        </Menu>
      </nav>
    </FlexBox>
  ),
};

export const MenuRole: Story = {
  args: {
    role: 'menu',
    children: (
      <>
        <MenuItem onClick={() => null}>Click action</MenuItem>
        <MenuItem active>Active click action</MenuItem>
        <MenuItem icon={MultipleUsersIcon} onClick={() => null}>
          Icon click action
        </MenuItem>
        <MenuItem onClick={() => null}>Menu click action</MenuItem>
      </>
    ),
  },
};

export const NavMenu: Story = {
  args: {
    variant: 'fixed',
  },
  render: (args) => (
    <nav>
      <Menu {...args}>
        <MenuItem href="#link">Link item</MenuItem>
        <MenuItem active href="#link">
          Active link item
        </MenuItem>
        <MenuItem href="#link" icon={MultipleUsersIcon}>
          Icon link item
        </MenuItem>
        <MenuItem href="#link">Link item</MenuItem>
      </Menu>
    </nav>
  ),
};

export const NoRoleMenu: Story = {
  args: {
    variant: 'popover',
    children: (
      <>
        <MenuItem>Menu item</MenuItem>
        <MenuItem active>Active item</MenuItem>
        <MenuItem icon={MultipleUsersIcon}>Icon item</MenuItem>
        <MenuItem>Menu item</MenuItem>
      </>
    ),
  },
};

export const PopoverCondensed: Story = {
  args: {
    variant: 'popover',
    children: (
      <>
        <MenuItem>Menu item</MenuItem>
        <MenuItem active>Active item</MenuItem>
        <MenuItem icon={MultipleUsersIcon}>Icon item</MenuItem>
        <MenuItem>Menu item</MenuItem>
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
        <MenuItem>Menu item</MenuItem>
        <MenuItem active>Active item</MenuItem>
        <MenuItem icon={MultipleUsersIcon}>Icon item</MenuItem>
        <MenuItem>Menu item</MenuItem>
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
        <MenuItem>Menu item</MenuItem>
        <MenuItem active>Active item</MenuItem>
        <MenuSeparator />
        <MenuItem icon={MultipleUsersIcon}>Icon item</MenuItem>
        <MenuItem>Menu item</MenuItem>
      </>
    ),
  },
};

export const FixedMenuSeparator: Story = {
  args: {
    variant: 'fixed',
    children: (
      <>
        <MenuItem>Menu item</MenuItem>
        <MenuItem active>Active item</MenuItem>
        <MenuSeparator my={4} />
        <MenuItem icon={MultipleUsersIcon}>Icon item</MenuItem>
        <MenuItem>Menu item</MenuItem>
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
                I have a side menu
              </MenuItem>
              <MenuItem
                active={activeIndex === 1}
                onClick={() => clickHandler(-115, 1)}
              >
                Active item
              </MenuItem>
              <MenuItem
                active={activeIndex === 2}
                icon={MultipleUsersIcon}
                onClick={() => clickHandler(-164, 2)}
              >
                Icon item
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
                    <MenuItem>I am a side menu!</MenuItem>
                    <MenuItem href="cool">Cool link</MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem>I am a DIFFERENT menu!</MenuItem>
                    <MenuItem href="cool-too">Another cool link</MenuItem>
                    <MenuItem>An action</MenuItem>
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
