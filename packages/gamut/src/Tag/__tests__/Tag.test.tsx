import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';

import { Tag } from '..';

const tagText = 'Tag Text';
const renderView = setupRtl(Tag, { children: <>{tagText}</> });

describe('Tag', () => {
  it('renders correct text for the `readOnly` variant', () => {
    const { view } = renderView({ variant: 'readOnly' });
    view.getByText(tagText);
  });

  it('excludes any buttons for the `readOnly` variant', () => {
    const { view } = renderView({ variant: 'readOnly' });

    expect(view.queryByRole('button')).toBeNull();
  });

  it('renders correct text for the `selection` variant', () => {
    const { view } = renderView({ variant: 'selection' });
    view.getByText(tagText);
  });

  it('includes a button for the `selection` variant', () => {
    const { view } = renderView({ variant: 'selection' });
    view.getByRole('button');
  });

  it('calls onDismiss when DeleteButton is clicked for the `selection` variant', () => {
    const onDismiss = jest.fn();
    const { view } = renderView({ variant: 'selection', onDismiss });
    const deleteButton = view.getByRole('button');
    fireEvent.click(deleteButton);

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('is in a disabled state when provided a `disabled: true` prop for the `selection` variant', () => {
    const { view } = renderView({ variant: 'selection', disabled: true });

    expect(view.getByRole('button')).toBeDisabled();
  });

  it('renders correct text for the `navigation` variant', () => {
    const { view } = renderView({ variant: 'navigation' });
    view.getByText(tagText);
  });

  it('renders the text in an anchor element for the `navigation` variant', () => {
    const { view } = renderView({
      variant: 'navigation',
      href: 'www.tagteam.com',
    });
    view.getByRole('link', { name: tagText });
  });

  it('contains the correct href for the `navigation` variant', () => {
    const { view } = renderView({
      variant: 'navigation',
      href: 'www.tagteam.com',
    });

    expect(view.getByRole('link')).toHaveAttribute('href', 'www.tagteam.com');
  });

  it('is in a disabled state when provided a `disabled: true` prop for the `navigation` variant', () => {
    const { view } = renderView({
      variant: 'navigation',
      href: 'www.tagteam.com',
      disabled: true,
    });

    expect(view.getByRole('button')).toBeDisabled();
  });

  it('renders correct text for the `suggestion` variant', () => {
    const onClick = jest.fn();
    const { view } = renderView({ variant: 'suggestion', onClick });
    view.getByText(tagText);
  });

  it('renders the text in a button for the `suggestion` variant', () => {
    const onClick = jest.fn();
    const { view } = renderView({ variant: 'suggestion', onClick });
    view.getByRole('button', { name: tagText });
  });

  it('executes the onClick function passed in as a prop for the `suggestion` variant', () => {
    const onClick = jest.fn();
    const { view } = renderView({ variant: 'suggestion', onClick });
    const suggestionTag = view.getByRole('button');
    fireEvent.click(suggestionTag);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is in a disabled state when provided a `disabled: true` prop for the `suggestion` variant', () => {
    const onClick = jest.fn();
    const { view } = renderView({
      variant: 'suggestion',
      onClick,
      disabled: true,
    });

    expect(view.getByRole('button')).toBeDisabled();
  });
});
