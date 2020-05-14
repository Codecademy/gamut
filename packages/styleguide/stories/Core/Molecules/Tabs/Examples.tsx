import React from 'react';
import { Tabs, TabList, Tab, TabPanel } from '@codecademy/gamut/src';
import { number, boolean, text } from '@storybook/addon-knobs';

export const Uncontrolled = () => {
  return (
    <Tabs
      defaultActiveTabIndex={number('defaultActiveTabIndex', 2)}
      onChange={() => {}}
      renderAllPanels={boolean('Render All panels', false)}
    >
      <TabList
        center={boolean('Centered', false)}
        maxWidth={text('Max Width', undefined)}
      >
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </TabList>
      <TabPanel>
        <h2>Welcome to Tab 1</h2>
        <p>Hi there! I'm the contents inside Tab 1. Yippee!</p>
      </TabPanel>
      <TabPanel>
        <h2>Welcome to Tab 2</h2>
        <p>Hi there! I'm the contents inside Tab 2. Yippee!</p>
      </TabPanel>
      <TabPanel>
        <h2>Welcome to Tab 3</h2>
        <p>Hi there! I'm the contents inside Tab 3. Yippee!</p>
      </TabPanel>
    </Tabs>
  );
};

export const Controlled = () => {
  return (
    <Tabs
      activeTabIndex={number('Active Tab Index', 0)}
      onChange={() => {}}
      renderAllPanels={boolean('Render All Panels', false)}
    >
      <TabList
        center={boolean('Centered', false)}
        maxWidth={text('Max Width', undefined)}
      >
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </TabList>
      <TabPanel>
        <h2>Welcome to Tab 1</h2>
        <p>Hi there! I'm the contents inside Tab 1. Yippee!</p>
      </TabPanel>
      <TabPanel>
        <h2>Welcome to Tab 2</h2>
        <p>Hi there! I'm the contents inside Tab 2. Yippee!</p>
      </TabPanel>
      <TabPanel>
        <h2>Welcome to Tab 3</h2>
        <p>Hi there! I'm the contents inside Tab 3. Yippee!</p>
      </TabPanel>
    </Tabs>
  );
};
