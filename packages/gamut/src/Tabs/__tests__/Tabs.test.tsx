import { setupRtl } from '@codecademy/gamut-tests';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import { Tab, TabList, TabPanel, TabPanels, Tabs, TabsProps } from '../index';

const FullTabs = (props: TabsProps) => (
  <Tabs {...props}>
    <TabList>
      <Tab id="tab1">Tab 1</Tab>
      <Tab id="tab2">Tab 2</Tab>
      <Tab id="tab3" isDisabled>
        Tab 3
      </Tab>
    </TabList>
    <TabPanels>
      <TabPanel id="tab1">
        <p>tab 1 content</p>
      </TabPanel>
      <TabPanel id="tab2">
        <p>tab 2 content</p>
      </TabPanel>
      <TabPanel id="tab3">
        <p>tab 3 content</p>
      </TabPanel>
    </TabPanels>
  </Tabs>
);

const FullTabsControlled = (props: TabsProps) => {
  const [activeTab, setActiveTab] = useState(props.selectedKey ?? 'tab1');
  return (
    <Tabs
      {...props}
      onSelectionChange={() => {
        props.onSelectionChange?.(activeTab);
        setActiveTab(activeTab);
      }}
    >
      <TabList>
        <Tab id="tab1">Tab 1</Tab>
        <Tab id="tab2">Tab 2</Tab>
        <Tab id="tab3" isDisabled>
          Tab 3
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel id="tab1">
          <p>tab 1 content</p>
        </TabPanel>
        <TabPanel id="tab2">
          <p>tab 2 content</p>
        </TabPanel>
        <TabPanel id="tab3">
          <p>tab 3 content</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

const mockOnSelectionChange = jest.fn();
const renderView = setupRtl(FullTabs, {
  onSelectionChange: mockOnSelectionChange,
});
const renderViewControlled = setupRtl(FullTabsControlled, {
  onSelectionChange: mockOnSelectionChange,
});

describe('Tabs', () => {
  describe('Uncontrolled', () => {
    it('renders the first tab and first tab panel when no default selected key is passed', () => {
      const { view } = renderView();

      view.getByText('Tab 1');
      view.getByText('tab 1 content');
    });

    it('renders the second tab tab panel and calls onSelectionChange when second tab is clicked', async () => {
      const { view } = renderView();

      await userEvent.click(view.getByText('Tab 2'));
      view.getByText('tab 2 content');
      expect(mockOnSelectionChange).toHaveBeenCalled();
    });

    it('renders the default selected key when passed', () => {
      const { view } = renderView({ defaultSelectedKey: 'tab2' });

      view.getByText('Tab 2');
      view.getByText('tab 2 content');
    });
  });
  describe('Controlled', () => {
    it('renders the first tab and first tab panel when selectedKey is set to "tab1"', () => {
      const { view } = renderViewControlled({ selectedKey: 'tab1' });

      view.getByText('Tab 1');
      view.getByText('tab 1 content');
    });

    it('renders the second tab and second tab panel when selectedKey is set to "tab2"', () => {
      const { view } = renderViewControlled({ selectedKey: 'tab2' });

      view.getByText('Tab 2');
      view.getByText('tab 2 content');
    });

    it('calls onSelectionChange when a tab is clicked', async () => {
      const { view } = renderViewControlled({ selectedKey: 'tab1' });

      await userEvent.click(view.getByText('Tab 2'));
      await waitFor(() => view.getByText('tab 2 content'));
      expect(mockOnSelectionChange).toHaveBeenCalled();
    });
  });
  describe('Disabled', () => {
    it('renders tab as disabled when isDisabled is passed', () => {
      const { view } = renderView();

      const tab = view.getByText('Tab 3');
      expect(tab).toHaveAttribute('aria-disabled', 'true');
      expect(tab).toHaveStyle('opacity: 0.25');
    });

    it('renders tab keys as disabled when disabledKeys is passed', () => {
      const { view } = renderView({ disabledKeys: ['tab2'] });

      const tab = view.getByText('Tab 2');
      expect(tab).toHaveAttribute('aria-disabled', 'true');
      expect(tab).toHaveStyle('opacity: 0.25');
    });
  });
});
