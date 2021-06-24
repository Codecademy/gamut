import { Text } from '@codecademy/gamut';
import { setupRtl } from '@codecademy/gamut-tests';
import React from 'react';
import { act } from 'react-dom/test-utils';

import { TabPanel } from '../TabPanel';
import { Tabs } from '../Tabs';
import { TabPanelProps, TabsProps } from '../types';

const herculeText = 'The world champ!';
const gokuText = 'Just some chump';

type SimpleTabsProps = {
  tabs?: Partial<Omit<TabsProps, 'children'>>;
  panelOne?: Partial<Omit<TabPanelProps, 'children'>>;
  panelTwo?: Partial<Omit<TabPanelProps, 'children'>>;
};

const SimpleTabs: React.FC<SimpleTabsProps> = ({
  tabs,
  panelOne,
  panelTwo,
}) => (
  <Tabs {...tabs}>
    <TabPanel title="Hercule" {...panelOne}>
      <Text>{herculeText}</Text>
    </TabPanel>
    <TabPanel title="Goku" {...panelTwo}>
      <Text>{gokuText}</Text>
    </TabPanel>
  </Tabs>
);

const renderView = setupRtl(SimpleTabs);

describe('Tabs', () => {
  it('should render the titles and texts of the tab panels', () => {
    const { view } = renderView();
    expect(view.getByText('Hercule')).toBeTruthy();
    expect(view.getByText('Goku')).toBeTruthy();
    expect(view.getByText(gokuText)).toBeTruthy();
    expect(view.getByText(herculeText)).toBeTruthy();
  });
  it('should only display the contents of each tab when clicked', () => {
    const { view } = renderView();
    expect(view.getByText(gokuText)).not.toBeVisible();
    view.getByText('Goku').click();
    expect(view.getByText(gokuText)).toBeVisible();
    expect(view.getByText(herculeText)).not.toBeVisible();
  });
  it('should allow a different tab to be set externally', () => {
    const { view } = renderView({ tabs: { activeTabIndex: 1 } });
    expect(view.getByText(gokuText)).toBeVisible();
    expect(view.getByText(herculeText)).not.toBeVisible();
  });
  it('should not allow the content of disabled tabs to be viewed by clicking', () => {
    const { view } = renderView({ panelTwo: { tabDisabled: true } });
    view.getByText('Goku').click();
    expect(view.getByText(gokuText)).not.toBeVisible();
  });
  it('should fire an onChange function (if one is provided) on tab change', () => {
    const onChange = jest.fn();
    const { view, update } = renderView({ tabs: { onChange } });
    expect(onChange).toHaveBeenCalledTimes(0);
    act(() => view.getByText('Goku').click());
    expect(onChange).toHaveBeenCalledTimes(1);
    act(() => update({ tabs: { activeTabIndex: 0, onChange } }));
    expect(onChange).toHaveBeenCalledTimes(2);
  });
  it('should fire an onTabChange function (if one is provided) on tab change via click', () => {
    const onChange = jest.fn();
    const { view, update } = renderView({ panelOne: { onTabClick: onChange } });
    expect(onChange).toHaveBeenCalledTimes(0);
    act(() => view.getByText('Goku').click());
    expect(onChange).toHaveBeenCalledTimes(0);
    act(() => view.getByText('Hercule').click());
    expect(onChange).toHaveBeenCalledTimes(1);
    act(() =>
      update({
        tabs: { activeTabIndex: 1 },
        panelOne: { onTabClick: onChange },
      })
    );
    expect(onChange).toHaveBeenCalledTimes(1);
    act(() =>
      update({
        tabs: { activeTabIndex: 0 },
        panelOne: { onTabClick: onChange },
      })
    );
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
