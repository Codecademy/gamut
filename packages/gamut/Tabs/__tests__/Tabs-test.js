import React from 'react';
import { shallow, mount } from 'enzyme';

import { Tab, TabList, TabPanel, Tabs } from '../';

const getTabs = props => (
  <Tabs {...props}>
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

describe('Tabs', () => {
  describe('ControlledVariant', () => {
    it('shows the proper default tab view', () => {
      const onChange = jest.fn();
      const wrapper = mount(getTabs({ activeTabIndex: 0, onChange }));

      expect(wrapper.find('.tab.active').text()).toBe('Tab 1');

      const activeTabPanelText = wrapper
        .find('div[data-test="tabPanel"]')
        .first()
        .text();

      expect(activeTabPanelText).toBe('welcome to tab 1hi i am tab 1');

      const inactiveTabPanelText = wrapper
        .find('div[data-test="tabPanel"]')
        .last()
        .text();
      expect(inactiveTabPanelText).toBe('');
    });

    it('responds to activeTabIndex prop update', () => {
      const onChange = jest.fn();
      const wrapper = mount(getTabs({ activeTabIndex: 0, onChange }));

      wrapper
        .find('.tab')
        .last()
        .props()
        .onClick({ preventDefault() {} });

      expect(onChange.mock.calls[0][0]).toBe(2);

      wrapper.setProps({
        activeTabIndex: 2,
      });

      expect(wrapper.find('.tab.active').text()).toBe('Tab 3');

      const inactiveTabPanelText = wrapper
        .find('div[data-test="tabPanel"]')
        .first()
        .text();
      expect(inactiveTabPanelText).toBe('');

      const activeTabPanelText = wrapper
        .find('div[data-test="tabPanel"]')
        .last()
        .text();
      expect(activeTabPanelText).toBe('welcome to tab 3hi i am tab 3');
    });
  });

  describe('Uncontrolled Variant', () => {
    it('should show the proper default tab view', () => {
      const wrapper = mount(getTabs({ defaultActiveTabIndex: 2 }));

      expect(wrapper.find('.tab.active').text()).toBe('Tab 3');

      const activeTabPanelText = wrapper
        .find('div[data-test="tabPanel"]')
        .last()
        .text();

      expect(activeTabPanelText).toBe('welcome to tab 3hi i am tab 3');

      const inactiveTabPanelText = wrapper
        .find('div[data-test="tabPanel"]')
        .first()
        .text();
      expect(inactiveTabPanelText).toBe('');
    });

    it('updates state when tab changes', () => {
      const wrapper = mount(getTabs({ defaultActiveTabIndex: 2 }));

      wrapper
        .find('.tab')
        .first()
        .props()
        .onClick({ preventDefault() {} });

      expect(wrapper.find('.tab.active').text()).toBe('Tab 1');

      const inactiveTabPanelText = wrapper
        .find('div[data-test="tabPanel"]')
        .last()
        .text();
      expect(inactiveTabPanelText).toBe('');

      const activeTabPanelText = wrapper
        .find('div[data-test="tabPanel"]')
        .first()
        .text();
      expect(activeTabPanelText).toBe('welcome to tab 1hi i am tab 1');
    });

    it('if uncontrolled, calls the onChange function with the new indexg to notify listener after changing tabs', () => {
      const onChange = jest.fn();
      const wrapper = mount(getTabs({ defaultActiveTabIndex: 2, onChange }));

      wrapper
        .find('.tab')
        .first()
        .props()
        .onClick({ preventDefault() {} });

      expect(wrapper.find('.tab.active').text()).toBe('Tab 1');

      expect(onChange.mock.calls[0][0]).toBe(0);
    });
  });

  describe('Tabs Functionality', () => {
    it('can render inactive panels into the DOM if necessary (for interoperability with JS libraries like recaptcha', () => {
      const wrapper = shallow(
        getTabs({ activeTabIndex: 0, onChange: () => {} })
      );

      const inactivePanelHasChildren = wrapper =>
        !!wrapper.html().match('welcome to tab 2');

      expect(inactivePanelHasChildren(wrapper)).toBe(false);

      wrapper.setProps({
        renderAllPanels: true,
      });

      expect(inactivePanelHasChildren(wrapper)).toBe(true);
    });
  });
});
