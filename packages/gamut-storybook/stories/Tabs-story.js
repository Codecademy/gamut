import React from 'react';
import { storiesOf } from '@storybook/react';
import DeprecatedTabs from '@codecademy/gamut/Tabs';
import { Tabs, TabList, Tab, TabPanel } from '@codecademy/gamut/Tabs/NewTab';
import { withKnobs, boolean, text, number } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { addonInfoOptions as options } from './options';

function generateTabConfig(num, isDefault) {
  return [...Array(num).keys()].map(ind => {
    const displayInd = ind + 1;
    return {
      text: `Tab Number ${displayInd}`,
      default: isDefault === ind,
    };
  });
}

storiesOf('Component/Deprecated Tabs', module)
  .add('Default style', () => (
    <DeprecatedTabs config={generateTabConfig(5, 2)}>
      <div>
        Tab 1: Illum et molestiae eum. Voluptatem molestiae iure cum placeat
        ipsum. Sunt culpa optio doloribus qui iure consequatur culpa modi.
        Expedita sed aut magnam. Ut architecto suscipit quas fuga delectus
        incidunt et. Iste iusto itaque et blanditiis sed quis corrupti.
      </div>
      <div>Tab 2</div>
      <div>
        Tab 3: Quia nostrum velit ex modi nihil reprehenderit voluptas illum.
        Natus quia molestiae. Et quae expedita officiis officia rem
        consequuntur.
      </div>
      <div>Tab 4</div>
      <div>
        Tab 5: Hic ea sunt nulla libero amet. Rerum quia vitae magni sed aut
        rerum natus consequuntur necessitatibus.
      </div>
    </DeprecatedTabs>
  ))
  .add('Animated underline style', () => (
    <DeprecatedTabs config={generateTabConfig(5, 0)} animatedUnderlineStyle>
      <div>
        Tab 1: Illum et molestiae eum. Voluptatem molestiae iure cum placeat
        ipsum. Sunt culpa optio doloribus qui iure consequatur culpa modi.
        Expedita sed aut magnam. Ut architecto suscipit quas fuga delectus
        incidunt et. Iste iusto itaque et blanditiis sed quis corrupti.
      </div>
      <div>Tab 2</div>
      <div>
        Tab 3: Quia nostrum velit ex modi nihil reprehenderit voluptas illum.
        Natus quia molestiae. Et quae expedita officiis officia rem
        consequuntur.
      </div>
      <div>Tab 4</div>
      <div>
        Tab 5: Hic ea sunt nulla libero amet. Rerum quia vitae magni sed aut
        rerum natus consequuntur necessitatibus.
      </div>
    </DeprecatedTabs>
  ));

storiesOf('Component/NewTabs', module)
  .addDecorator(withKnobs)
  .add(
    'Tabs (Controlled)',
    withInfo({
      text: `
        The **activeTabIndex** prop and **updateTabIndex** callback function prop are required for controlled tabs.

        For optimum accessibility, you should provide an **onTabIndexUpdate** callback function that sets focus on an appropriate element
        (either a form element or the top-level header) for the newly-active tab panel when the active tab changes.

        The accessibility implementation was taken from [this article](https://simplyaccessible.com/article/danger-aria-tabs/)
        `,
      ...options,
    })(() => (
      <Tabs
        renderAllPanels={boolean('renderAllPanels', false)}
        activeTabIndex={number('activeTabIndex', 0)}
        updateTabIndex={function noop() {}}
        onTabIndexUpdated={function noop() {}}
        allCaps={boolean('allCaps', false)}
      >
        <TabList
          center={boolean('center', false)}
          maxWidth={text('maxWidth', undefined)}
        >
          <Tab>{text('text_tab_1', 'Tab 1')}</Tab>
          <Tab>{text('text_tab_2', 'Tab 2')}</Tab>
          <Tab>{text('text_tab_3', 'Tab 3')}</Tab>
        </TabList>
        <TabPanel>hi i am tab 1</TabPanel>
        <TabPanel>hi i am tab 2</TabPanel>
        <TabPanel>hi i am tab 3</TabPanel>
      </Tabs>
    ))
  )
  .add(
    'Tabs (Uncontrolled)',
    withInfo({
      text: `When no **activeTabIndex** prop is provided, the component uses internal state.`,
      ...options,
    })(() => (
      <Tabs
        renderAllPanels={boolean('renderAllPanels', false)}
        defaultActiveTabIndex={number('defaultActiveTabIndex', 1)}
        allCaps={boolean('allCaps', false)}
        onTabIndexUpdated={function noop() {}}
      >
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanel>hi i am tab 1</TabPanel>
        <TabPanel>hi i am tab 2</TabPanel>
        <TabPanel>hi i am tab 3</TabPanel>
      </Tabs>
    ))
  );
