import { List, ListCol, ListRow } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof List> = {
  title: 'Organisms/Lists & Tables/List/ListProvider',
  component: List,
  args: {},
};

export default meta;
type Story = StoryObj<typeof List>;

export const ProvidedByList: Story = {
  args: { spacing: 'condensed' },
  render: (args) => (
    <List {...args}>
      <ListRow>
        <ListCol type="header">List supplies ListProvider context</ListCol>
        <ListCol>to every ListRow and ListCol.</ListCol>
      </ListRow>
    </List>
  ),
};
