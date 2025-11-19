import {
  Badge,
  FillButton,
  FormGroup,
  Input,
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
import { useCallback, useState } from 'react';

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
  args: {
    variant: 'standard',
    defaultSelectedKey: '1',
    disabledKeys: [],
    selectedKey: undefined,
    onSelectionChange: () => {},
    isDisabled: false,
  },
  argTypes: {
    defaultSelectedKey: {
      description: 'The initial selected key in the collection (uncontrolled).',
    },
    disabledKeys: {
      description:
        'The item keys that are disabled. These items cannot be selected, focused, or otherwise interacted with.',
    },
    selectedKey: {
      description: 'The currently selected key in the collection (controlled).',
      type: 'string',
    },
    onSelectionChange: {
      description: 'Handler that is called when the selection changes.',
    },
    isDisabled: {
      description:
        'Whether the TabList is disabled. Shows that a selection exists, but is not available in that circumstance.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList>
        <Tab id="1">Tab 1</Tab>
        <Tab id="2">Tab 2</Tab>
        <Tab id="3">Tab 3</Tab>
      </TabList>
      <TabPanels>
        <TabPanel id="1">
          <Text as="h2">Welcome to Tab 1</Text>
          <Text>Hi there! I&apos;m the contents inside Tab 1. Yippee!</Text>
        </TabPanel>
        <TabPanel id="2" shouldForceMount>
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
  const [activeTab, setActiveTab] = useState(1);

  const maxTab = 3;
  const setTab = useCallback(
    (value: string | number) => {
      const val = Number(value);
      if (val > maxTab) return setActiveTab(1);
      if (val < 1) return setActiveTab(maxTab);
      setActiveTab(val);
    },
    [setActiveTab]
  );

  return (
    <>
      <Background bg="yellow" mb={24} p={12}>
        <FormGroup htmlFor="active-tab" label="Active Tab">
          <Input
            htmlFor="acrive-tab"
            label="Active Tab"
            min={1}
            type="number"
            value={activeTab}
            onChange={(e) => setTab(e.target.value)}
          />
        </FormGroup>
      </Background>
      <Tabs selectedKey={String(activeTab)} onSelectionChange={setActiveTab}>
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

export const WithBadge: Story = {
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

export const BlockVariant: Story = {
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
    <TabNav aria-label="Secondary Navigation" fill>
      <TabNavLink href="/" selected>
        Tab Link 1
      </TabNavLink>
      <TabNavLink href="/">Tab Link 2</TabNavLink>
      <TabNavLink href="/">Tab Link 3</TabNavLink>
    </TabNav>
  ),
};

export const InteractiveContent: Story = {
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

export const Disabled: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList>
        <Tab id="1">Tab 1</Tab>
        <Tab id="2" isDisabled>
          Tab 2
        </Tab>
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

export const ForceMount: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList>
        <Tab id="1">Tab 1</Tab>
        <Tab id="2">Tab 2</Tab>
        <Tab id="3">Tab 3</Tab>
      </TabList>
      <TabPanels my={24}>
        <TabPanel id="1" shouldForceMount>
          <Text as="h2">Welcome to Tab 1</Text>
          <Text>Hi there! I&apos;m the contents inside Tab 1. Yippee!</Text>
        </TabPanel>
        <TabPanel id="2" shouldForceMount>
          <Text as="h2">Welcome to Tab 2</Text>
          <Text>Hi there! I&apos;m the contents inside Tab 2. Yippee!</Text>
        </TabPanel>
        <TabPanel id="3" shouldForceMount>
          <Text as="h2">Welcome to Tab 3</Text>
          <Text>Hi there! I&apos;m the contents inside Tab 3. Yippee!</Text>
        </TabPanel>
      </TabPanels>
    </Tabs>
  ),
};
