import {
  Badge,
  InputStepper,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  TabsProps,
  Text,
} from '@codecademy/gamut';
import { Background } from '@codecademy/gamut-styles';
import React, { useCallback, useState } from 'react';

export const TabsExample = (args: TabsProps) => {
  const [controlledIndex, setControlledIndex] = useState(args.index!);

  const isControlled = typeof controlledIndex !== 'undefined';

  const maxTabIndex = 2;
  const setIndex = useCallback(
    (val) => {
      if (val > maxTabIndex) return setControlledIndex(0);
      if (val < 0) return setControlledIndex(maxTabIndex);
      setControlledIndex(val);
    },
    [setControlledIndex]
  );

  return (
    <>
      {isControlled ? (
        <Background bg="yellow" mb={24} p={12}>
          <InputStepper
            label="Tab Index"
            ariaLabel="Tab Index"
            value={controlledIndex}
            onChange={setIndex}
          />
        </Background>
      ) : null}
      <Tabs index={controlledIndex} onChange={setIndex}>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanels>
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
      </Tabs>
    </>
  );
};

export const TabsBadgeExample = (args: TabsProps) => {
  return (
    <>
      <Tabs {...args}>
        <TabList>
          <Tab>
            Tab 1 <Badge>Hi</Badge>
          </Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanels>
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
      </Tabs>
    </>
  );
};
