import { Tabs, TabList, Tab, TabPanel } from '@codecademy/gamut/src';
import { boolean, text, number, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import {
  StoryDescription,
  StoryStatus,
  StoryTemplate,
  decoratedStory,
} from '../Templating';

export default {
  title: 'Core|Molecules/Tabs',
  decorators: [withKnobs],
};

export const tabsUncontrolled = decoratedStory('Tabs (Uncontrolled)', () => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      Use a series of tabbed areas for when you have multiple potential sections
      to show, but only one should be visible at a time.
    </StoryDescription>
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
  </StoryTemplate>
));

export const tabsControlled = decoratedStory('Tabs (Controlled)', () => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      When <code>activeTabIndex</code> is specified, the component switches to
      being a controlled component. It won't change its own tab state, but will
      instead notify of a request to change using <code>onChange</code>.
    </StoryDescription>
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
  </StoryTemplate>
));
