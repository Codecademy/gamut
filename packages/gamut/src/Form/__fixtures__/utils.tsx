import {
  CalendarIcon,
  DataTransferVerticalIcon,
  EarthIcon,
} from '@codecademy/gamut-icons';
import { fireEvent } from '@testing-library/dom';
import { act } from 'react';

export const DOWN_ARROW = { keyCode: 40 };

export const selectOptions = ['red', 'yellow', 'green'];

export const selectOptionsObject = {
  red: 'red',
  yellow: 'yellow',
  green: 'green',
  blue: 'blue',
  teal: 'teal',
  orange: 'orange',
};

export const optionsIconsArray = [
  {
    label: 'Data Transfer Vertical Icon',
    value: 'one',
    icon: DataTransferVerticalIcon,
  },
  { label: 'Calendar Icon', value: 'two', icon: CalendarIcon },
  { label: 'Earth Icon', value: 'three', icon: EarthIcon },
];

export const groupedOptions = [
  {
    label: 'Fruits',
    options: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Orange', value: 'orange' },
    ],
  },
  {
    label: 'Vegetables',
    options: [
      { label: 'Carrot', value: 'carrot' },
      { label: 'Broccoli', value: 'broccoli' },
      { label: 'Spinach', value: 'spinach' },
    ],
  },
];

export const groupedOptionsWithIcons = [
  {
    label: 'Data Icons',
    options: [
      {
        label: 'Data Transfer Vertical Icon',
        value: 'data-transfer',
        icon: DataTransferVerticalIcon,
      },
      {
        label: 'Calendar Icon',
        value: 'calendar',
        icon: CalendarIcon,
      },
    ],
  },
  {
    label: 'Navigation Icons',
    options: [
      {
        label: 'Earth Icon',
        value: 'earth',
        icon: EarthIcon,
      },
    ],
  },
];

export const groupedOptionsWithTitles = [
  {
    label: 'Fruits',
    options: [
      { label: 'Apple', value: 'apple', subtitle: 'Red and crunchy' },
      { label: 'Banana', value: 'banana', subtitle: 'Yellow and sweet' },
      { label: 'Orange', value: 'orange', subtitle: 'Citrus and juicy' },
    ],
  },
  {
    label: 'Vegetables',
    options: [
      { label: 'Carrot', value: 'carrot', subtitle: 'Orange and healthy' },
      {
        label: 'Broccoli',
        value: 'broccoli',
        subtitle: 'Green and nutritious',
      },
      { label: 'Spinach', value: 'spinach', subtitle: 'Leafy and iron-rich' },
    ],
  },
];

export const optionsWithAbbreviations = [
  {
    label: 'United States of America',
    value: 'usa',
    abbreviation: 'USA',
  },
  {
    label: 'United Kingdom',
    value: 'uk',
    abbreviation: 'UK',
  },
  {
    label: 'Canada',
    value: 'canada',
    abbreviation: 'CA',
  },
  {
    label: 'Australia',
    value: 'australia',
    abbreviation: 'AU',
  },
];

export const openDropdown = async (view: any) => {
  await act(() => {
    fireEvent.keyDown(view.getByRole('combobox'), DOWN_ARROW);
    return Promise.resolve();
  });
};
