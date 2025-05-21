import {
  FlexBox,
  FormGroup,
  Input,
  Pagination,
  PaginationProps,
} from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  args: {},
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    chapterSize: 5,
    totalPages: 8,
    onChange: () => {},
  },
};

export const IncludeSkipToButtons: Story = {
  args: {
    chapterSize: 5,
    totalPages: 20,
    onChange: () => {},
  },
};

export const Stroke: Story = {
  args: {
    chapterSize: 5,
    totalPages: 18,
    onChange: () => {},
  },
};

export const Text: Story = {
  args: {
    chapterSize: 5,
    totalPages: 20,
    onChange: () => {},
    variant: 'text',
  },
};

export const Navigation: Story = {
  args: {
    chapterSize: 5,
    totalPages: 27,
    isNavigation: true,
    onChange: (pageNumber) => {
      window.open(
        `https://giphy.com/search/hamtaro-page-${pageNumber}`,
        '_blank'
      );
    },
  },
};

export const PaginationControlledExample: React.FC<PaginationProps> = (
  props
) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(3);

  const setChangedPage = useCallback(
    (pg: number) => {
      const page = Number(pg);
      if (page > totalPages) return setPageNumber(1);
      if (page <= 0) return setPageNumber(totalPages);
      if (page !== pageNumber) setPageNumber(page);
    },
    [totalPages, pageNumber, setPageNumber]
  );

  const setChangedTotalPages = useCallback(
    (page: string) => {
      setTotalPages(Number(page));
    },
    [setTotalPages]
  );

  return (
    <>
      <FlexBox justifyContent="center" mb={24} p={12}>
        <FormGroup htmlFor="current-page" label="Current Page">
          <Input
            htmlFor="current-page"
            label="current page"
            min={1}
            type="number"
            value={pageNumber}
            onChange={(e) => setChangedPage(Number(e.target.value))}
          />
        </FormGroup>
        <FormGroup htmlFor="total-pages" label="Total Pages">
          <Input
            htmlFor="total-pages"
            label="total pages"
            min={1}
            type="number"
            value={totalPages}
            onChange={(e) => setChangedTotalPages(e.target.value)}
          />
        </FormGroup>
      </FlexBox>
      <Pagination
        {...props}
        pageNumber={pageNumber}
        totalPages={totalPages}
        onChange={setChangedPage}
      />
    </>
  );
};

export const Controlled: Story = {
  args: {
    chapterSize: 5,
    totalPages: 27,
  },
  render: (args) => <PaginationControlledExample {...args} />,
};
