import {
  Badge,
  FillButton,
  Tab,
  TabList,
  TabNav,
  TabNavLink,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@codecademy/gamut';
import { Background } from '@codecademy/gamut-styles';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  // This is a known issue with SB 8, see: https://github.com/storybookjs/storybook/issues/23170
  // Will fix this casting when the issue is resolved
  subcomponents: {
    TabList: TabList as React.ComponentType<unknown>,
    Tab: Tab as React.ComponentType<unknown>,
    TabPanel: TabPanel as React.ComponentType<unknown>,
    TabPanels: TabPanels as React.ComponentType<unknown>,
    TabNav: TabNav as React.ComponentType<unknown>,
    TabNavLink: TabNavLink as React.ComponentType<unknown>,
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs variant="standard" keyboardActivation="manual">
      <TabList mx={24}>
        <Tab id="1">Tab 1</Tab>
        <Tab id="2">Tab 2</Tab>
        <Tab id="3">Tab 3</Tab>
      </TabList>
      <TabPanels>
        <TabPanel id="1">
          <Text as="h2">Welcome to Tab 1</Text>
          <Text>Hi there! I&apos;m the contents inside Tab 1. Yippee!</Text>
        </TabPanel>
        <TabPanel id="2">
          <Text as="h2">Welcome to Tab 2</Text>
          <Text>Hi there! I&apos;m the contents inside Tab 2. Yippee!</Text>
        </TabPanel>
        <TabPanel id="3">
          <Text as="h2">Welcome to Tab 3</Text>
          <Text>Hi there! I&apos;m the contents inside Tab 3. Yippee!</Text>
        </TabPanel>
      </TabPanels>
    </Tabs>
  ),
};

export const Controlled = () => {
  const [controlledIndex, setControlledIndex] = useState(1);

  return (
    <>
      <Background bg="yellow" mb={24} p={12}>
        <Text>The currently selected tab is {controlledIndex}</Text>
      </Background>
      <Tabs
        selectedKey={controlledIndex}
        onSelectionChange={(val) => setControlledIndex(Number(val))}
      >
        <TabList mx={24}>
          <Tab id="1">Tab 1</Tab>
          <Tab id="2">Tab 2</Tab>
          <Tab id="3">Tab 3</Tab>
        </TabList>
        <TabPanels my={24}>
          <TabPanel id="1">
            <Text as="h2">Welcome to Tab 1</Text>
            <Text>Hi there! I&apos;m the contents inside Tab 1. Yippee!</Text>
          </TabPanel>
          <TabPanel id="2">
            <Text as="h2">Welcome to Tab 2</Text>
            <Text>Hi there! I&apos;m the contents inside Tab 2. Yippee!</Text>
          </TabPanel>
          <TabPanel id="3">
            <Text as="h2">Welcome to Tab 3</Text>
            <Text>Hi there! I&apos;m the contents inside Tab 3. Yippee!</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export const TabsBadge: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList>
        <Tab id="1">
          Tab 1 <Badge ml={8}>New!</Badge>
        </Tab>
        <Tab id="2">Tab 2</Tab>
        <Tab id="3">Tab 3</Tab>
      </TabList>
      <TabPanels my={24}>
        <TabPanel id="1">
          <Text as="h2">Welcome to Tab 1</Text>
          <Text>Hi there! I&apos;m the contents inside Tab 1. Yippee!</Text>
        </TabPanel>
        <TabPanel id="2">
          <Text as="h2">Welcome to Tab 2</Text>
          <Text>Hi there! I&apos;m the contents inside Tab 2. Yippee!</Text>
        </TabPanel>
        <TabPanel id="3">
          <Text as="h2">Welcome to Tab 3</Text>
          <Text>Hi there! I&apos;m the contents inside Tab 3. Yippee!</Text>
        </TabPanel>
      </TabPanels>
    </Tabs>
  ),
};

export const TabsBlock: Story = {
  render: (args) => (
    <Tabs {...args} variant="block">
      <TabList>
        <Tab id="1">Tab 1</Tab>
        <Tab id="2">Tab 2</Tab>
        <Tab id="3">Tab 3</Tab>
      </TabList>
      <TabPanels my={24}>
        <TabPanel id="1">
          <Text as="h2">Welcome to Tab 1</Text>
          <Text>Hi there! I&apos;m the contents inside Tab 1. Yippee!</Text>
        </TabPanel>
        <TabPanel id="2">
          <Text as="h2">Welcome to Tab 2</Text>
          <Text>Hi there! I&apos;m the contents inside Tab 2. Yippee!</Text>
        </TabPanel>
        <TabPanel id="3">
          <Text as="h2">Welcome to Tab 3</Text>
          <Text>Hi there! I&apos;m the contents inside Tab 3. Yippee!</Text>
        </TabPanel>
      </TabPanels>
    </Tabs>
  ),
};

export const TabsNav: Story = {
  render: () => (
    <TabNav fill aria-label="Secondary Navigation">
      <TabNavLink selected href="/">
        Tab Link 1
      </TabNavLink>
      <TabNavLink href="/">Tab Link 2</TabNavLink>
      <TabNavLink href="/">Tab Link 3</TabNavLink>
    </TabNav>
  ),
};

export const TabsInteractiveContent: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList mx={24}>
        <Tab id="1">Interactive Tab 1</Tab>
        <Tab id="2">Just Plain Tab 2</Tab>
        <Tab id="3">Also Interactive Tab 3</Tab>
      </TabList>
      <TabPanels my={24}>
        <TabPanel id="1">
          <Text as="h2">Welcome to Tab 1</Text>
          <FillButton>
            I should come into focus, rather than the panel.
          </FillButton>
        </TabPanel>
        <TabPanel id="2">
          <Text as="h2">Welcome to Tab 2</Text>
          <Text>I am normal. My panel should just focus.</Text>
        </TabPanel>
        <TabPanel id="3">
          <Text as="h2">Welcome to Tab 3</Text>
          <FillButton variant="secondary">
            I also should come into focus, rather than the panel.
          </FillButton>
        </TabPanel>
      </TabPanels>
    </Tabs>
  ),
};
