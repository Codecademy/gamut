import { Card } from '@codecademy/gamut';
import { ListSection, ListSectionProps } from '@codecademy/gamut-labs';
import React from 'react';

type ListItem = {
  title: string;
};

export const ListSectionExample = (args: ListSectionProps<ListItem>) => {
  const listItems = [
    { title: 'one' },
    { title: 'two' },
    { title: 'three' },
    { title: 'four' },
  ];
  const renderItem = (item: ListItem) => <Card>Item Title {item.title}</Card>;

  return (
    <ListSection
      {...args}
      title="List Section Title"
      listItems={listItems}
      renderItem={renderItem}
    />
  );
};
