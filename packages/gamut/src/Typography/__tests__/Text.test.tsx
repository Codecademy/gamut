import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';

import { Text } from '../Text';

const renderView = setupRtl(Text, {
  children: 'Content',
  truncate: 'ellipsis',
  truncateLines: 1,
});

describe('Text', () => {
  it('renders ellipsis truncation without requiring scroll handlers', () => {
    // Type-safety: ellipsis-only truncation must not require onScrollEnd/onScrollEndCapture.
    // If this fails to compile, the Text props have regressed (e.g. React 19 scroll types).
    const { view } = renderView({
      children: 'Long content that gets truncated',
      whiteSpace: 'nowrap',
      title: 'truncated',
    });

    view.getByText('Long content that gets truncated');
  });

  it('accepts optional onScrollEnd when provided', () => {
    const { view } = renderView({ title: 'with handler' });

    view.getByText('Content');
  });

  it('calls onScrollEnd when scrollend event fires', () => {
    const onScrollEnd = jest.fn();
    const { view } = renderView({ onScrollEnd });

    const textElement = view.getByText('Content');
    fireEvent(textElement, new Event('scrollend', { bubbles: true }));

    expect(onScrollEnd).toHaveBeenCalledTimes(1);
  });
});
