import { Text } from '@codecademy/gamut';
import { setupRtl } from '@codecademy/gamut-tests';
import * as React from 'react';

import { TabPanelExperimental } from '../TabPanelExperimental';
import { TabsExperimental } from '../TabsExperimental';
import { TabPanelProps, TabsProps } from '../types';

const herculeText = 'The world champ!';
const gokuText = 'Just some chump';

type SimpleTabsProps = {
  tabs?: Partial<Omit<TabsProps, 'children'>>;
  panelOne?: Partial<Omit<TabPanelProps, 'children'>>;
  panelTwo?: Partial<Omit<TabPanelProps, 'children'>>;
};

const ignoredText = 'I am very important and special';

const SimpleTabs: React.FC<SimpleTabsProps> = ({
  tabs,
  panelOne,
  panelTwo,
}) => (
  <TabsExperimental {...tabs}>
    <TabPanelExperimental title="Hercule" {...panelOne}>
      <Text>{herculeText}</Text>
    </TabPanelExperimental>
    <TabPanelExperimental title="Goku" {...panelTwo}>
      <Text>{gokuText}</Text>
    </TabPanelExperimental>
    <Text>{ignoredText}</Text>
  </TabsExperimental>
);

const renderView = setupRtl(SimpleTabs);

describe('Tabs', () => {
  it('should render the titles and texts of the tab panels', () => {
    const { view } = renderView();
    expect(view.getByText('Hercule'));
    expect(view.getByText('Goku'));
    expect(view.getByText(gokuText));
    expect(view.getByText(herculeText));
  });
  it('should only display the contents of each tab when clicked', () => {
    const { view } = renderView();
    expect(view.getByText(gokuText)).not.toBeVisible();
    view.getByText('Goku').click();
    expect(view.getByText(gokuText)).toBeVisible();
    expect(view.getByText(herculeText)).not.toBeVisible();
  });
  it('should not render any non-TabPanelExperimental children', () => {
    const { view } = renderView();
    expect(view.queryByText(ignoredText)).toBeNull();
  });
});
