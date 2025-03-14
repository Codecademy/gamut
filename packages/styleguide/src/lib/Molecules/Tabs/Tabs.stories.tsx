import {
  Badge,
  FillButton,
  FormGroup,
  Input,
  Tab,
  TabList,
  TabNav,
  TabNavLink,
  TabNavProps,
  TabPanel,
  TabPanels,
  Tabs,
  TabsProps,
  Text,
} from '@codecademy/gamut';
import { Background } from '@codecademy/gamut-styles';
import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';

const meta: Meta<typeof Tab> = {
  component: Tab,
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
type Story = StoryObj<typeof Tab>;

const TabsPanelCollection: React.FC = () => {
  return (
    <TabPanels my={24} className="welcomePanel">
      <TabPanel>
        <Text as="h2">Welcome to Tab 1</Text>
        <Text>Hi there! I&apos;m the contents inside Tab 1. Yippee!</Text>
      </TabPanel>
      <TabPanel>
        <Text as="h2">Welcome to Tab 2</Text>
        <Text>Hi there! I&apos;m the contents inside Tab 2. Yippee!</Text>
      </TabPanel>
      <TabPanel>
        <Text as="h2">Welcome to Tab 3</Text>
        <Text>Hi there! I&apos;m the contents inside Tab 3. Yippee!</Text>
      </TabPanel>
    </TabPanels>
  );
};

type TabsWithoutChildren = Omit<TabsProps, 'children'>;

const TabsExample = (args: TabsWithoutChildren) => {
  return (
    <Tabs {...args}>
      <TabList mx={24}>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </TabList>
      <TabsPanelCollection />
    </Tabs>
  );
};

export const Default: Story = {
  render: (args) => <TabsExample {...args} />,
};

const TabsControlledExample = () => {
  const [controlledIndex, setControlledIndex] = useState(0);

  const maxTabIndex = 2;
  const setIndex = useCallback(
    (value: string | number) => {
      const val = Number(value);
      if (val > maxTabIndex) return setControlledIndex(0);
      if (val < 0) return setControlledIndex(maxTabIndex);
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
      <Tabs index={controlledIndex} onChange={setIndex}>
        <TabList mx={24}>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabsPanelCollection />
      </Tabs>
    </>
  );
};

export const Controlled: Story = {
  render: () => <TabsControlledExample />,
};

const TabsBadgeExample = (args: TabsWithoutChildren) => {
  return (
    <>
      <Tabs {...args}>
        <TabList>
          <Tab>
            Tab 1 <Badge ml={8}>New!</Badge>
          </Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabsPanelCollection />
      </Tabs>
    </>
  );
};

export const TabsBadge: Story = {
  render: () => <TabsBadgeExample />,
};

const TabsBlockVariantExample = (args: TabNavProps) => {
  return (
    <>
      <Tabs {...args} variant="block">
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabsPanelCollection />
      </Tabs>
    </>
  );
};

export const TabsBlock: Story = {
  render: () => <TabsBlockVariantExample />,
};

const TabsNavExample = (args: TabNavProps) => {
  return (
    <TabNav {...args} fill aria-label="Secondary Navigation">
      <TabNavLink selected href="/">
        Tab Link 1
      </TabNavLink>
      <TabNavLink href="/">Tab Link 2</TabNavLink>
      <TabNavLink href="/">Tab Link 3</TabNavLink>
    </TabNav>
  );
};

export const TabsNav: Story = {
  render: () => <TabsNavExample />,
};

const TabsInteractiveContentExample = (args: TabsWithoutChildren) => {
  return (
    <>
      <Tabs {...args}>
        <TabList mx={24}>
          <Tab>Interactive Tab 1</Tab>
          <Tab>Just Plain Tab 2</Tab>
          <Tab>Also Interactive Tab 3</Tab>
        </TabList>
        <TabPanels my={24} className="lol">
          <TabPanel tabIndex={-1}>
            <Text as="h2">Welcome to Tab 1</Text>
            <FillButton>
              I should come into focus, rather than the panel.
            </FillButton>
          </TabPanel>
          <TabPanel>
            <Text as="h2">Welcome to Tab 2</Text>
            <Text>I am normal. My panel should just focus.</Text>
          </TabPanel>
          <TabPanel tabIndex={-1}>
            <Text as="h2">Welcome to Tab 3</Text>
            <FillButton variant="secondary">
              I also should come into focus, rather than the panel.
            </FillButton>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export const TabsInteractiveContent: Story = {
  render: () => <TabsInteractiveContentExample />,
};
