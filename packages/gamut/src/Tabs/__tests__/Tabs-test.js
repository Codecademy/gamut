import React from 'react';
import { shallow, mount } from 'enzyme';
import { Tab, TabList, TabPanel, Tabs } from '..';
const createTab = i => {
  return React.createElement(
    Tab,
    { tabIndex: i, onChange: () => {}, id: `tab-${i}`, key: `${i}` },
    'Tab ',
    i
  );
};
const createTabPanel = i => {
  return React.createElement(
    TabPanel,
    { id: `${i}` },
    React.createElement('h2', null, 'welcome to tab ', i),
    React.createElement('p', null, 'hi i am tab ', i)
  );
};
const getTabs = props => {
  const tabList = React.createElement(
    TabList,
    { onChange: () => {}, activeTabIndex: 1, createBaseId: i => `${i}` },
    createTab(1),
    createTab(2),
    createTab(3)
  );
  return React.createElement(
    Tabs,
    Object.assign({}, props),
    tabList,
    createTabPanel(1),
    createTabPanel(2),
    createTabPanel(3)
  );
};
describe('Tabs', () => {
  describe('ControlledVariant', () => {
    it('shows the proper default tab view', () => {
      const onChange = jest.fn();
      const wrapper = mount(getTabs({ activeTabIndex: 0, onChange }));
      expect(wrapper.find('.tab.active').text()).toBe('Tab 1');
      const activeTabPanelText = wrapper
        .find(TabPanel)
        .first()
        .text();
      expect(activeTabPanelText).toBe('welcome to tab 1hi i am tab 1');
      const inactiveTabPanelText = wrapper
        .find(TabPanel)
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
        .simulate('click');
      expect(onChange.mock.calls[0][0]).toBe(2);
      wrapper.setProps({
        activeTabIndex: 2,
      });
      expect(wrapper.find('.tab.active').text()).toBe('Tab 3');
      const inactiveTabPanelText = wrapper
        .find(TabPanel)
        .first()
        .text();
      expect(inactiveTabPanelText).toBe('');
      const activeTabPanelText = wrapper
        .find(TabPanel)
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
        .find(TabPanel)
        .last()
        .text();
      expect(activeTabPanelText).toBe('welcome to tab 3hi i am tab 3');
      const inactiveTabPanelText = wrapper
        .find(TabPanel)
        .first()
        .text();
      expect(inactiveTabPanelText).toBe('');
    });
    it('updates state when tab changes', () => {
      const wrapper = mount(getTabs({ defaultActiveTabIndex: 2 }));
      wrapper
        .find('.tab')
        .first()
        .simulate('click');
      expect(wrapper.find('.tab.active').text()).toBe('Tab 1');
      const inactiveTabPanelText = wrapper
        .find(TabPanel)
        .last()
        .text();
      expect(inactiveTabPanelText).toBe('');
      const activeTabPanelText = wrapper
        .find(TabPanel)
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
        .simulate('click');
      expect(wrapper.find('.tab.active').text()).toBe('Tab 1');
      expect(onChange.mock.calls[0][0]).toBe(0);
    });
  });
  describe('Tabs Functionality', () => {
    it('can render inactive panels into the DOM if necessary (for interoperability with JS libraries like recaptcha', () => {
      const wrapper = shallow(
        getTabs({ activeTabIndex: 0, onChange: () => {} })
      );
      const inactivePanelHasChildren = wrp =>
        !!wrp.html().match('welcome to tab 2');
      expect(inactivePanelHasChildren(wrapper)).toBe(false);
      wrapper.setProps({
        renderAllPanels: true,
      });
      expect(inactivePanelHasChildren(wrapper)).toBe(true);
    });
  });
});
//# sourceMappingURL=Tabs-test.js.map
