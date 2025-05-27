import { setupRtl } from '@codecademy/gamut-tests';

import { Tab, TabList, TabPanel, TabPanels, Tabs, TabsProps } from '../index';

const FullTabs = (props: TabsProps) => (
  <Tabs {...props}>
    <TabList>
      <Tab id="tab1" />
      <Tab id="tab2" />
    </TabList>
    <TabPanels>
      <TabPanel id="tab1">
        <p>tab 1 content</p>
      </TabPanel>
      <TabPanel id="tab2">
        <p>tab 2 content</p>
      </TabPanel>
    </TabPanels>
  </Tabs>
);

const renderView = setupRtl(FullTabs);

describe('Tabs', () => {
  it('', () => {
    const { view } = renderView();
  });
});
