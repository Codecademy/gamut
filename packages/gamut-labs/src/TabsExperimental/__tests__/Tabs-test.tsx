import { Text } from '@codecademy/gamut';
import { setupRtl } from '@codecademy/gamut-tests';
import React from 'react';

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
});
