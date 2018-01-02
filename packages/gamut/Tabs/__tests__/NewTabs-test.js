import React from 'react';
import { shallow, mount } from 'enzyme';

import { Tab, TabList, TabPanel, Tabs } from '../NewTab';

describe('Tabs', () => {
  it('has a controlled variant', () => {
    const updateTabIndexStub = jest.fn();
    const wrapper = mount(
      <Tabs activeTabIndex={0} updateTabIndex={updateTabIndexStub}>
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
    );

    expect(wrapper.find('.tab.isActive').text()).toBe('Tab 1');

    let activeTabPanelText = wrapper
      .find('.tabPanel')
      .first()
      .text();

    expect(activeTabPanelText).toBe('welcome to tab 1hi i am tab 1');

    let inactiveTabPanelText = wrapper
      .find('.tabPanel')
      .last()
      .text();
    expect(inactiveTabPanelText).toBe('');

    wrapper
      .find('.tab')
      .last()
      .props()
      .onClick({ preventDefault() {} });

    expect(updateTabIndexStub.mock.calls[0][0]).toBe(2);

    wrapper.setProps({
      activeTabIndex: 2,
    });

    expect(wrapper.find('.tab.isActive').text()).toBe('Tab 3');

    inactiveTabPanelText = wrapper
      .find('.tabPanel')
      .first()
      .text();
    expect(inactiveTabPanelText).toBe('');

    activeTabPanelText = wrapper
      .find('.tabPanel')
      .last()
      .text();
    expect(activeTabPanelText).toBe('welcome to tab 3hi i am tab 3');
  });

  it('has an uncontrolled variant', () => {
    const wrapper = mount(
      <Tabs defaultActiveTabIndex={2}>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanel>
          <h2>welcome to tab 1</h2>
        </TabPanel>
        <TabPanel>
          <h2>welcome to tab 2</h2>
        </TabPanel>
        <TabPanel>
          <h2>welcome to tab 3</h2>
        </TabPanel>
      </Tabs>
    );

    expect(wrapper.find('.tab.isActive').text()).toBe('Tab 3');

    let activeTabPanelText = wrapper
      .find('.tabPanel')
      .last()
      .text();

    expect(activeTabPanelText).toBe('welcome to tab 3');

    let inactiveTabPanelText = wrapper
      .find('.tabPanel')
      .first()
      .text();
    expect(inactiveTabPanelText).toBe('');

    wrapper
      .find('.tab')
      .first()
      .props()
      .onClick({ preventDefault() {} });

    expect(wrapper.find('.tab.isActive').text()).toBe('Tab 1');

    inactiveTabPanelText = wrapper
      .find('.tabPanel')
      .last()
      .text();
    expect(inactiveTabPanelText).toBe('');

    activeTabPanelText = wrapper
      .find('.tabPanel')
      .first()
      .text();
    expect(activeTabPanelText).toBe('welcome to tab 1');
  });

  it('can render inactive panels into the DOM if necessary (for interoperability with JS libraries like recaptcha', () => {
    const wrapper = shallow(
      <Tabs activeTabIndex={0} updateTabIndex={() => {}}>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
        </TabList>
        <TabPanel>
          <h2>welcome to tab 1</h2>
        </TabPanel>
        <TabPanel>
          <h2>welcome to tab 2</h2>
        </TabPanel>
      </Tabs>
    );

    const inactivePanelHasChildren = wrapper =>
      !!wrapper.html().match('welcome to tab 2');

    expect(inactivePanelHasChildren(wrapper)).toBe(false);

    wrapper.setProps({
      renderAllPanels: true,
    });

    expect(inactivePanelHasChildren(wrapper)).toBe(true);
  });
  it('calls the onTabIndexUpdate function to notify listeners after changing tabs', () => {
    const onTabIndexUpdateStub = jest.fn();
    const wrapper = shallow(
      <Tabs
        activeTabIndex={0}
        onTabIndexUpdate={onTabIndexUpdateStub}
        updateTabIndex={() => {}}
      >
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanel>
          <h2>welcome to tab 1</h2>
        </TabPanel>
        <TabPanel>
          <h2>welcome to tab 2</h2>
        </TabPanel>
        <TabPanel>
          <h2>welcome to tab 3</h2>
        </TabPanel>
      </Tabs>,
      { lifecycleExperimental: true }
    );

    wrapper.setProps({
      activeTabIndex: 2,
    });

    expect(onTabIndexUpdateStub.mock.calls.length).toBe(1);
    expect(onTabIndexUpdateStub.mock.calls[0][0]).toBe(2);
  });
});
