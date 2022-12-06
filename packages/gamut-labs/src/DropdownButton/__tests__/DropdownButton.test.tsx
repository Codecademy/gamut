import { Text } from '@codecademy/gamut';
import { StarIcon } from '@codecademy/gamut-icons';
import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/react';

import { DropdownButton } from '..';

export const items = [
  { id: 'one', text: 'List Item 1', icon: StarIcon },
  { id: 'two', text: 'List Item 2', icon: StarIcon },
  { id: 'three', text: 'List Item 3', icon: StarIcon },
];

const defaultProps = {
  dropdownItems: items,
  children: <Text>hello</Text>,
};

const renderDropdownButton = setupRtl(DropdownButton, defaultProps);

describe('ListSection', () => {
  it('renders a fill button when buttonType is fill', () => {
    const { view } = renderDropdownButton({ buttonType: 'fill' });
    view.getByTestId('dropdown-fill-button');
  });

  it('renders a stroke button when buttonType is stroke', () => {
    const { view } = renderDropdownButton({ buttonType: 'stroke' });
    view.getByTestId('dropdown-stroke-button');
  });

  it('renders a kebab icon button when buttonType is kebab', () => {
    const { view } = renderDropdownButton({ buttonType: 'kebab' });
    view.getByTestId('dropdown-kebab-button');
  });

  it('renders a horizontal kebab icon button when buttonType is horizontalKebab', () => {
    const { view } = renderDropdownButton({ buttonType: 'horizontalKebab' });
    view.getByTestId('dropdown-horizontal-kebab-button');
  });

  it('renders a fill button when buttonType is not provided', () => {
    const { view } = renderDropdownButton();
    view.getByTestId('dropdown-fill-button');
  });

  it('renders children within the button', () => {
    const { view } = renderDropdownButton();
    view.getByText('hello');
  });

  it('renders all the items when the button is clicked', () => {
    const { view } = renderDropdownButton();
    const button = view.getByTestId('dropdown-fill-button');
    fireEvent.click(button);

    expect(view.getAllByText('List Item', { exact: false })).toHaveLength(3);
  });

  it('calls the provided onClick method when the button is clicked', () => {
    const onClick = jest.fn();
    const { view } = renderDropdownButton({ onClick });
    const button = view.getByTestId('dropdown-fill-button');
    fireEvent.click(button);

    expect(onClick).toBeCalledTimes(1);
  });
});
