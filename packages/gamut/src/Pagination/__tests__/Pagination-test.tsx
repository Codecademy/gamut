import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/react';

import { Pagination } from '..';

const renderView = setupRtl(Pagination, {
  totalPages: 10,
  chapterSize: 5,
  onChange: () => null,
});

describe('Pagination', () => {
  it('does not render a back button when on the first page', () => {
    const { view } = renderView({});

    expect(view.getByRole('button', { name: /(Navigate back to page )\d+/ }));
    expect(
      view.queryByRole('button', { name: /(Navigate forward to page )\d+/ })
    ).toBe(null);
  });

  it('renders a back and forward button on middle pages', () => {
    const { view } = renderView({ defaultCurrent: 2 });

    expect(view.getByRole('button', { name: /(Navigate back to page )\d+/ }));
    expect(
      view.getByRole('button', { name: /(Navigate forward to page )\d+/ })
    );
  });

  it('does not render a forward button when on the last page', () => {
    const { view } = renderView({ defaultCurrent: 20 });

    expect(
      view.getByRole('button', { name: /(Navigate forward to page )\d+/ })
    );
    expect(
      view.queryByRole('button', { name: /(Navigate back to page )\d+/ })
    ).toBe(null);
  });

  it('does not render a jump back ellipsis button when on the first page', () => {
    const { view } = renderView({ type: 'ellipsis' });

    expect(
      view.getAllByRole('button', { name: /(Jump to page )\d+/ }).length
    ).toBe(1);
  });

  it('renders a jump forward and back ellipsis button when on the middle pages', () => {
    const { view } = renderView({ type: 'ellipsis', defaultCurrent: 2 });

    expect(
      view.getAllByRole('button', { name: /(Jump to page )\d+/ }).length
    ).toBe(2);
  });

  it('does not render a jump forward ellipsis button when on the last page', () => {
    const { view } = renderView({ type: 'ellipsis', defaultCurrent: 20 });

    expect(
      view.getAllByRole('button', { name: /(Jump to page )\d+/ }).length
    ).toBe(1);
  });

  it('progresses one page forward on forward button click', () => {
    const { view } = renderView({});

    const firstPage = view.getByRole('button', { name: 'Page 1' });
    expect(firstPage).toHaveAttribute('aria-current', 'page');

    const forwardButton = view.getByRole('button', {
      name: /(Navigate forward to page )\d+/,
    });

    fireEvent.click(forwardButton);

    const secondPage = view.getByRole('button', { name: 'Page 1' });

    expect(firstPage).toHaveAttribute('aria-current', false);
    expect(secondPage).toHaveAttribute('aria-current', 'page');
  });

  it('progresses one page back on back button click', () => {
    const { view } = renderView({ defaultCurrent: 2 });

    const secondPage = view.getByRole('button', { name: 'Page 2' });
    expect(secondPage).toHaveAttribute('aria-current', 'page');

    const forwardButton = view.getByRole('button', {
      name: /(Navigate forward to page )\d+/,
    });

    fireEvent.click(forwardButton);

    const firstPage = view.getByRole('button', { name: 'Page 1' });

    expect(secondPage).toHaveAttribute('aria-current', false);
    expect(firstPage).toHaveAttribute('aria-current', 'page');
  });

  it('progresses chapterSize back on jump back ellipsis button click', () => {
    const { view } = renderView({ type: 'ellipsis' });

    const secondPage = view.getByRole('button', { name: 'Page 2' });
    expect(secondPage).toHaveAttribute('aria-current', 'page');

    const forwardButton = view.getByRole('button', {
      name: /(Navigate forward to page )\d+/,
    });

    fireEvent.click(forwardButton);

    const firstPage = view.getByRole('button', { name: 'Page 1' });

    expect(secondPage).toHaveAttribute('aria-current', false);
    expect(firstPage).toHaveAttribute('aria-current', 'page');
  });

  it('progresses chapterSize back on jump back ellipsis button click', () => {
    const { view } = renderView({ defaultCurrent: 2 });

    const secondPage = view.getByRole('button', { name: 'Page 2' });
    expect(secondPage).toHaveAttribute('aria-current', 'page');

    const forwardButton = view.getByRole('button', {
      name: /(Navigate forward to page )\d+/,
    });

    fireEvent.click(forwardButton);

    const firstPage = view.getByRole('button', { name: 'Page 1' });

    expect(secondPage).toHaveAttribute('aria-current', false);
    expect(firstPage).toHaveAttribute('aria-current', 'page');
  });

  it('correctly renders number of pages according to default chapterSize', () => {
    const { view } = renderView({ type: 'ellipsis' });

    expect(view.getByRole('button', { name: 'Page 1' }));
    expect(view.getByRole('button', { name: 'Page 5' }));
    expect(view.queryByRole('button', { name: 'Page 6' })).toBe(null);
  });
});
2;
