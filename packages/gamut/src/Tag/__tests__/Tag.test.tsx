import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';

import { Tag } from '..';

// Might test this for suggestion

const tagText = 'Tag Text';
const renderView = setupRtl(Tag, { children: <>{tagText}</> });
// const renderView = setupRtl(Tag, { children: <>{tagText}</> });

describe('Tag', () => {
  it('renders correct text for the `readOnly` variant', () => {
    const { view } = renderView({variant: 'readOnly'});

    view.getByText(tagText)
  });

  it('excludes any buttons for the `readOnly` variant', () => {
    const { view } = renderView({variant: 'readOnly'});

    expect(view.queryByRole('button')).toBeNull();
  });

  it('renders correct text for the `suggestion` variant', () => {
    const { view } = renderView({variant: 'suggestion'});

    view.getByText(tagText)
  });

  it('includes a button for the `selection` variant', () => {
    const { view } = renderView({variant: 'selection'});

    view.getByRole('button');
  });

  it('calls onDismiss when DeleteButton is clicked for the `selection` variant', () => {
    const onDismiss = jest.fn();
    const { view } = renderView({variant: 'selection', onDismiss});

    const deleteButton = view.getByRole('button');

    fireEvent.click(deleteButton);

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('is in a disabled state when provided a `disabled: true` prop for the `selection` variant', () => {
    const { view } = renderView({variant: 'suggestion', disabled: true});

    expect(view.getByRole('button')).toBeDisabled();
  });
});



// check readonly tag
// // text renders correctly
// // there is no button
// suggestion
// // text renders correctly
// // onDismiss is there
// // onDismiss is clicked
// // disabled onDismiss is not clicked
// navigation
// // is an anchor element
// // href is there
// // disabled click is not click
// suggestion
// // onClick is provided, and can be clicked
// // is a button
// // disabled click is not clicked

