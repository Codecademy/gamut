import { Card } from '@codecademy/gamut';
import { ListSection, ListSectionProps } from '@codecademy/gamut-labs';
import React from 'react';

export const ListSectionExample = (args: ListSectionProps) => {
  const listItems = [
    { title: 'one' },
    { title: 'two' },
    { title: 'three' },
    { title: 'four' },
  ];

  return (
    <ListSection {...args} title="List Section Title">
      {listItems.map((listItem) => (
        <Card>{listItem.title}</Card>
      ))}
    </ListSection>
  );
};
