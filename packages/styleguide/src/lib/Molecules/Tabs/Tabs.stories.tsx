import {
  Badge,
  FillButton,
  FlexBox,
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
    orientation: 'vertical',
    disabledKeys: [],
    selectedKey: undefined,
    onSelectionChange: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: (args) => (
    <Tabs {...args}>
      <FlexBox>
        <TabList>
          <Tab id="1">Tab 1</Tab>
          <Tab id="2">Tab 2</Tab>
          <Tab id="3">Tab 3</Tab>
        </TabList>
        <FlexBox
          alignItems="center"
          justifyContent="flex-end"
          width="100%"
          borderBottom={1}
          mb={24}
        >
          <Text>Tab List</Text>
        </FlexBox>
      </FlexBox>
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

  const maxTabIndex = 3;
  const setIndex = useCallback(
    (value: string | number) => {
      const val = Number(value);
      if (val > maxTabIndex) return setControlledIndex(1);
      if (val < 1) return setControlledIndex(maxTabIndex);
      setControlledIndex(val);
    },
    [setControlledIndex]
  );

  return (
    <>
      <Background bg="yellow" mb={24} p={12}>
        <FormGroup label="Tab Index" htmlFor="tab-index">
          <Input
            label="Tab Index"
            value={controlledIndex}
            onChange={(e) => setIndex(e.target.value)}
            type="number"
            min={1}
            htmlFor="tab-index"
          />
        </FormGroup>
      </Background>
      <Tabs selectedKey={String(controlledIndex)} onSelectionChange={setIndex}>
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
    <TabNav fill aria-label="Secondary Navigation">
      <TabNavLink selected href="/">
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
