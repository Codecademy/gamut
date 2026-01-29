import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent, queries, RenderResult } from '@testing-library/react';

import { Pagination } from '..';

const onChange = jest.fn();
const renderView = setupRtl(Pagination, {
  totalPages: 10,
  onChange,
});
interface TestHelpersType {
  view: RenderResult<typeof queries, HTMLElement>;
  pageNumber?: number;
  direction?: 'forward' | 'back';
}
const getPage = ({ view, pageNumber }: TestHelpersType) => {
  return view.getByRole('button', { name: `Page ${pageNumber}` });
};
const getBackButton = ({ view }: TestHelpersType) => {
  return view.getByRole('button', { name: /(Navigate back to page )\d+/ });
};
const getForwardButton = ({ view }: TestHelpersType) => {
  return view.getByRole('button', { name: /(Navigate forward to page )\d+/ });
};
const getJumpButtonCount = ({ view }: TestHelpersType) =>
  view.getAllByLabelText(/(Jump )+/).length;
const getJumpButton = ({ view, pageNumber, direction }: TestHelpersType) => {
  return view.getByLabelText(`Jump ${direction} to page ${pageNumber}`);
};

describe('Pagination', () => {
  it('sets page as current when clicked', async () => {
    const { view } = renderView({});
    const page1 = getPage({ view, pageNumber: 1 });

    expect(page1).toHaveAttribute('aria-current', 'page');

    const page2 = getPage({ view, pageNumber: 2 });
    fireEvent.click(page2);

    expect(page1).toHaveAttribute('aria-current', 'false');
    expect(page2).toHaveAttribute('aria-current', 'page');
  });

  it('does not render a back button when on the first page', () => {
    const { view } = renderView({});

    expect(getForwardButton({ view }));
    expect(
      view.queryByRole('button', { name: /(Navigate back to page )\d+/ })
    ).toBe(null);
  });

  it('correctly renders number of pages according to chapterSize', () => {
    const { view } = renderView({ chapterSize: 3 });

    expect(getPage({ view, pageNumber: 1 }));
    expect(getPage({ view, pageNumber: 3 }));
    expect(view.queryByRole('button', { name: 'Page 4' })).toBe(null);
  });

  it('renders a back and forward button on middle pages', () => {
    const { view } = renderView({ defaultPageNumber: 2 });

    expect(getBackButton({ view }));
    expect(getForwardButton({ view }));
  });

  it('does not render a forward button when on the last page', () => {
    const { view } = renderView({ defaultPageNumber: 10 });

    expect(getBackButton({ view }));
    expect(
      view.queryByRole('button', { name: /(Navigate forward to page )\d+/ })
    ).toBe(null);
  });

  it('advances one page forward on forward button click', () => {
    const { view } = renderView({});
    const page1 = getPage({ view, pageNumber: 1 });

    expect(page1).toHaveAttribute('aria-current', 'page');

    const forwardButton = getForwardButton({ view });
    fireEvent.click(forwardButton);
    const page2 = getPage({ view, pageNumber: 2 });

    expect(page1).toHaveAttribute('aria-current', 'false');
    expect(page2).toHaveAttribute('aria-current', 'page');
  });

  it('advances one page back on back button click', async () => {
    const { view } = renderView({ defaultPageNumber: 3 });
    const thirdPage = getPage({ view, pageNumber: 3 });

    expect(thirdPage).toHaveAttribute('aria-current', 'page');

    const backButton = getBackButton({ view });
    fireEvent.click(backButton);
    const page2 = getPage({ view, pageNumber: 2 });

    expect(page2).toHaveAttribute('aria-current', 'page');
    expect(thirdPage).toHaveAttribute('aria-current', 'false');
  });

  it('does not render a jump buttons', () => {
    const { view } = renderView({});

    expect(view.queryByRole('button', { name: /(Jump to page )\d+/ })).toBe(
      null
    );
  });

  it('changes shown page buttons according to chapterSize', () => {
    const { view } = renderView({ chapterSize: 3, defaultPageNumber: 6 });

    expect(view.getAllByRole('button').length).toBe(5);
    expect(getPage({ view, pageNumber: 6 }));
    expect(getPage({ view, pageNumber: 7 }));
  });

  it('calls onChange with page number whenever page changes', () => {
    const { view } = renderView({});
    const page2 = getPage({ view, pageNumber: 2 });
    fireEvent.click(page2);

    expect(onChange).toHaveBeenCalledWith(2);

    const backButton = view.getByRole('button', {
      name: /(Navigate back to page )\d+/,
    });
    const forwardButton = getForwardButton({ view });
    fireEvent.click(backButton);

    expect(onChange).toHaveBeenCalledWith(1);

    fireEvent.click(forwardButton);

    expect(onChange).toHaveBeenCalledWith(2);
    expect(onChange).toHaveBeenCalledTimes(3);
  });

  describe('when there are more then 10 pages', () => {
    it('does not render a jump back button when on the first page', () => {
      const { view } = renderView({ totalPages: 15 });

      expect(getJumpButtonCount({ view })).toBe(2);
      expect(view.queryByLabelText(/(Jump back )+/)).toBe(null);
    });

    it('renders a jump forward and back button when on the middle pages', () => {
      const { view } = renderView({ totalPages: 15, defaultPageNumber: 7 });

      expect(getJumpButtonCount({ view })).toBe(4);
    });

    it('does not render a jump forward button when on the last page', () => {
      const { view } = renderView({ totalPages: 15, defaultPageNumber: 15 });

      expect(view.queryByRole('button', { name: 'Page 1' })).toBe(null);
    });

    it('advances chapterSize forward on jump forward button click', () => {
      const { view } = renderView({ totalPages: 15 });
      const page1 = getPage({ view, pageNumber: 1 });

      expect(page1).toHaveAttribute('aria-current', 'page');

      const forwardButton = getJumpButton({
        view,
        pageNumber: 6,
        direction: 'forward',
      });
      fireEvent.click(forwardButton);
      const sixthPage = getPage({ view, pageNumber: 6 });

      expect(view.queryByRole('button', { name: 'Page 1' })).toBe(null);
      expect(sixthPage).toHaveAttribute('aria-current', 'page');
    });

    it('advances chapterSize back on jump back ellipsis button click', () => {
      const { view } = renderView({ defaultPageNumber: 15, totalPages: 15 });
      const page15 = view.getByRole('button', { name: `Last Page, Page 15` });

      expect(page15).toHaveAttribute('aria-current', 'page');

      const backButton = getJumpButton({
        view,
        pageNumber: 6,
        direction: 'back',
      });
      fireEvent.click(backButton);
      const page6 = getPage({ view, pageNumber: 6 });

      expect(page6).toHaveAttribute('aria-current', 'page');
    });

    it('calls onChange with page number whenever jump buttons are clicked', () => {
      const { view } = renderView({ defaultPageNumber: 8, totalPages: 15 });
      const backButton = getJumpButton({
        view,
        pageNumber: 3,
        direction: 'back',
      });
      fireEvent.click(backButton);

      expect(onChange).toHaveBeenCalledWith(3);

      const forwardButton = getJumpButton({
        view,
        pageNumber: 8,
        direction: 'forward',
      });
      fireEvent.click(forwardButton);

      expect(onChange).toHaveBeenCalledWith(8);
    });
  });

  describe('when there is a pageNumber prop provided', () => {
    it('sets pageNumber to current page', () => {
      const { view } = renderView({ pageNumber: 5 });
      const page5 = getPage({ view, pageNumber: 5 });

      expect(page5).toHaveAttribute('aria-current', 'page');
    });

    it('renders the correct pages', () => {
      const { view } = renderView({ chapterSize: 3, pageNumber: 5 });

      expect(view.getAllByRole('button').length).toBe(5);
      expect(getPage({ view, pageNumber: 6 }));
      expect(getPage({ view, pageNumber: 7 }));
    });

    it('calls onChange with the correct page', () => {
      const { view } = renderView({ pageNumber: 5 });
      const page5 = getPage({ view, pageNumber: 5 });
      fireEvent.click(page5);

      expect(onChange).toHaveBeenCalledWith(5);
    });
  });
});
