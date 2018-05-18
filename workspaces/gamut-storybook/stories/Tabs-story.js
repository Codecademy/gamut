import React from 'react';
import { storiesOf } from '@storybook/react';
import { Tabs, TabList, Tab, TabPanel } from '@codecademy/gamut/Tabs';
import { withKnobs, boolean, text, number } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { addonInfoOptions as options } from './options';

storiesOf('Component/Tabs', module)
  .addDecorator(withKnobs)
  .add(
    'Tabs (Controlled)',
    withInfo({
      text: `
        The **activeTabIndex**  prop and **onChange** callback function prop are required for controlled tabs.
        The accessibility implementation was taken from [this article](https://simplyaccessible.com/article/danger-aria-tabs/)
        `,
      ...options,
    })(() => (
      <Tabs
        renderAllPanels={boolean('renderAllPanels', false)}
        activeTabIndex={number('activeTabIndex', 0)}
        onChange={function noop() {}}
      >
        <TabList
          center={boolean('center', false)}
          maxWidth={text('maxWidth', undefined)}
          className="some-additional-class"
        >
          <Tab className="some-additional-class">
            {text('text_tab_1', 'Tab 1')}
          </Tab>
          <Tab>{text('text_tab_2', 'Tab 2')}</Tab>
          <Tab>{text('text_tab_3', 'Tab 3')}</Tab>
        </TabList>
        <TabPanel className="some-additional-class">
          <h2>welcome to tab 1</h2>
          <p>hi i am tab 1</p>
        </TabPanel>
        <TabPanel>
          <h2>welcome to tab 2</h2>
          <p>hi i am tab 2</p>
        </TabPanel>
        <TabPanel>
          <h2>welcome to tab 3</h2>
          <p>hi i am tab 3</p>
        </TabPanel>
      </Tabs>
    ))
  )
  .add(
    'Tabs (Uncontrolled)',
    withInfo({
      text: `When no **activeTabIndex** prop is provided, the component uses internal state.
        You can use the **defaultActiveTabIndex** property to start the active tab on a certain index, and you can still provide an **onChange** callback prop to be notified of tab changes.`,
      ...options,
    })(() => (
      <Tabs
        renderAllPanels={boolean('renderAllPanels', false)}
        defaultActiveTabIndex={number('defaultActiveTabIndex', 2)}
        onChange={function noop() {}}
      >
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanel>
          <h2>welcome to tab 1</h2>
          <p>hi i am tab 1</p>
        </TabPanel>
        <TabPanel>
          <h2>welcome to tab 2</h2>
          <p>hi i am tab 2</p>
        </TabPanel>
        <TabPanel>
          <h2>welcome to tab 3</h2>
          <p>hi i am tab 3</p>
        </TabPanel>
      </Tabs>
    ))
  );
