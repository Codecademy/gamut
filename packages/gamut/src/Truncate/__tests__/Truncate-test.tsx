import { setupRtl } from '@codecademy/gamut-tests';

import { Truncate } from '..';

const children = `Halo doesn't kill the Flood. It kills their food!`;

const renderView = setupRtl(Truncate, { children });

describe('Truncate', () => {
  it('renders truncated markup when not expanded', () => {
    const { view } = renderView({ lines: 2 });

    view.getByText('H');
    view.getByText('...');
  });

  it('renders non-truncated when expanded', () => {
    const { view } = renderView({ expanded: true, lines: 2 });

    view.getByText(children);
  });

  it('calls onTruncate with the truncated value', () => {
    const { props } = renderView({ lines: 2, onTruncate: jest.fn() });

    expect(props.onTruncate).toHaveBeenCalledWith(true);
  });
});
