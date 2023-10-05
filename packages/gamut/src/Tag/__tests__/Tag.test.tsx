import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';

import { Tag } from '..';

const onDismiss = jest.fn();
const tagText = 'Tag Text';
const renderView = setupRtl(Tag, { children: <>{tagText}</>, onDismiss });

describe('Tag', () => {
  it('renders correct text', () => {
    const { view } = renderView();

    expect(view.getByText(tagText));
  });

  it('includes the DeleteButton by default', () => {
    const { view } = renderView();

    expect(view.getByRole('button'));
  });

  it('does not include the DeleteButton when readonly is true', () => {
    const { view } = renderView({ readonly: true });

    expect(view.queryByRole('button')).toBeNull();
  });

  it('calls onDismiss when DeleteButton is clicked', () => {
    const { view } = renderView();

    const deleteButton = view.getByRole('button');

    fireEvent.click(deleteButton);

    expect(onDismiss).toBeCalledTimes(1);
  });
});
