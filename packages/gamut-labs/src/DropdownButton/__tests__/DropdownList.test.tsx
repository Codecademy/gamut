import { Text } from '@codecademy/gamut';
import { StarIcon } from '@codecademy/gamut-icons';
import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/react';

import { DropdownList } from '../DropdownList';

export const items = [
  { id: 'one', text: 'List Item 1', icon: StarIcon, clickHandler: jest.fn() },
  { id: 'two', text: 'List Item 2', icon: StarIcon, clickHandler: jest.fn() },
  { id: 'three', text: 'List Item 3', icon: StarIcon, clickHandler: jest.fn() },
];

const defaultProps = {
  dropdownItems: items,
  children: <Text>hello</Text>,
};

const renderDropdownList = setupRtl(DropdownList, defaultProps);

describe('DropdownList', () => {
  it('fires list item clickhandler on click', () => {
    const { view } = renderDropdownList();
    const button = view.getByTestId('dropdown-item-one');
    fireEvent.click(button);

    expect(items[0].clickHandler).toHaveBeenCalledTimes(1);
  });

  it('fires passed in onClose as well as item clickhandler if provided', () => {
    const onClose = jest.fn();
    const { view } = renderDropdownList({ onClose });
    const button = view.getByTestId('dropdown-item-two');
    fireEvent.click(button);

    expect(items[1].clickHandler).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
