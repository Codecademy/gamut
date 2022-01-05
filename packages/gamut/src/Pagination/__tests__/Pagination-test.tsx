import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/react';

import { Pagination } from '..';

const renderView = setupRtl(Pagination, {
  totalPages: 15,
  onChange: () => null,
});

// @to-do : split ellipsis tests

describe('Pagination', () => {
  it('sets page as current when clicked', async () => {
    const { view } = renderView({});

    const firstPage = view.getByRole('button', { name: 'Page 1' });
    expect(firstPage).toHaveAttribute('aria-current', 'page');

    const secondPage = view.getByRole('button', { name: 'Page 2' });

    fireEvent.click(secondPage);

    expect(firstPage).toHaveAttribute('aria-current', 'false');
    expect(secondPage).toHaveAttribute('aria-current', 'page');
  });

  it('does not render a back button when on the first page', () => {
    const { view } = renderView({});

    expect(
      view.getByRole('button', { name: /(Navigate forward to page )\d+/ })
    );
    expect(
      view.queryByRole('button', { name: /(Navigate back to page )\d+/ })
    ).toBe(null);
  });

  it('correctly renders number of pages according to chapterSize', () => {
    const { view } = renderView({ type: 'ellipsis', chapterSize: 3 });

    expect(view.getByRole('button', { name: 'Page 1' }));
    expect(view.getByRole('button', { name: 'Page 3' }));
    expect(view.queryByRole('button', { name: 'Page 4' })).toBe(null);
  });

  it('renders a back and forward button on middle pages', () => {
    const { view } = renderView({ defaultCurrent: 2 });

    expect(view.getByRole('button', { name: /(Navigate back to page )\d+/ }));
    expect(
      view.getByRole('button', { name: /(Navigate forward to page )\d+/ })
    );
  });

  it('does not render a forward button when on the last page', () => {
    const { view } = renderView({ defaultCurrent: 15 });

    expect(view.getByRole('button', { name: /(Navigate back to page )\d+/ }));
    expect(
      view.queryByRole('button', { name: /(Navigate forward to page )\d+/ })
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
    const { view } = renderView({ type: 'ellipsis', defaultCurrent: 15 });

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

    const secondPage = view.getByRole('button', { name: 'Page 2' });

    expect(firstPage).toHaveAttribute('aria-current', 'false');
    expect(secondPage).toHaveAttribute('aria-current', 'page');
  });

  it('progresses one page back on back button click', async () => {
    const { view } = renderView({ defaultCurrent: 3 });

    const thirdPage = view.getByRole('button', { name: 'Page 3' });
    expect(thirdPage).toHaveAttribute('aria-current', 'page');

    const backButton = view.getByRole('button', {
      name: /(Navigate back to page )\d+/,
    });

    fireEvent.click(backButton);

    const secondPage = view.getByRole('button', { name: 'Page 2' });
    expect(secondPage).toHaveAttribute('aria-current', 'page');
    expect(thirdPage).toHaveAttribute('aria-current', 'false');
  });

  it('progresses chapterSize back on jump back ellipsis button click', () => {
    const { view } = renderView({ type: 'ellipsis', defaultCurrent: 15 });

    const page15 = view.getByRole('button', { name: 'Last Page, Page 15' });
    expect(page15).toHaveAttribute('aria-current', 'page');

    const backButton = view.getByRole('button', {
      name: 'Jump to page 6',
    });

    fireEvent.click(backButton);

    const fifthPage = view.getByRole('button', { name: 'Page 6' });

    expect(fifthPage).toHaveAttribute('aria-current', 'page');
  });

  it('progresses chapterSize forward on jump forward ellipsis button click', () => {
    const { view } = renderView({ type: 'ellipsis' });

    const firstPage = view.getByRole('button', { name: 'Page 1' });
    expect(firstPage).toHaveAttribute('aria-current', 'page');

    const forwardButton = view.getByRole('button', {
      name: 'Jump to page 6',
    });

    fireEvent.click(forwardButton);

    const sixthPage = view.getByRole('button', { name: 'Page 6' });

    expect(view.queryByRole('button', { name: 'Page 1' })).toBe(null);
    expect(sixthPage).toHaveAttribute('aria-current', 'page');
  });
});
