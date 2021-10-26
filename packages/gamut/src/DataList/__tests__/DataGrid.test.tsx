import { setupRtl } from '@codecademy/gamut-tests';
import { act, fireEvent, RenderResult, screen } from '@testing-library/react';
import React from 'react';

import { DataGrid, DataGridProps } from '../DataGrid';
import { ColumnConfig } from '../types';

type Row = { id: number; name: string; sin: string };
type Columns = ColumnConfig<Row>[];

type Props = DataGridProps<Row, 'id', Columns>;

const onRowSelect = jest.fn();
const onRowExpand = jest.fn();
const onQueryChange = jest.fn();

const props = {
  id: 'test',
  idKey: 'id',
  rows: [
    { id: 1, name: 'Hari Seldon', sin: 'Messiah Complex' },
    { id: 2, name: 'Bel Roise', sin: 'Competence' },
    { id: 3, name: 'Cleon II', sin: 'Hubris' },
  ],
  columns: [{ key: 'name' }, { key: 'sin' }],
  onRowSelect,
  onRowExpand,
  onQueryChange,
  expandedContent: ({ row: { id } }) => <div>Expanded {id}</div>,
} as Props;

const renderView = setupRtl(DataGrid, props as any) as <
  T extends Partial<Props>
>(
  props?: T
) => { view: RenderResult };

describe('DataGrid', () => {
  describe('Column Rendering', () => {
    it('renders rows with multiple columns', () => {
      renderView();

      props.rows.forEach(({ name, sin }) => {
        screen.getByText(name);
        screen.getByText(sin);
      });
    });
    it('allows custom rendered columns', () => {
      renderView({
        columns: [
          {
            key: 'name',
            render: ({ id, name, sin }) => (
              <span data-testid={id}>
                {name} - {sin}
              </span>
            ),
          },
        ],
      });

      props.rows.forEach(({ id }) => {
        screen.getByTestId(id);
      });
    });

    it('allows custom header labels', () => {
      renderView({ columns: [{ key: 'sin', header: 'Mortal Sin' }] });

      screen.getByText('Mortal Sin');
    });
  });

  describe('Selecting Rows', () => {
    it('renders no checkboxes when no onRowSelect callback is passed', () => {
      renderView({ onRowSelect: undefined });

      expect(screen.queryByRole('checkbox')).toBeNull();
    });
    it("clicking the row's checkbox selects the row", () => {
      renderView();

      const checkbox = screen.getByRole('checkbox', { name: 'Select 1' });

      act(() => {
        fireEvent.click(checkbox);
      });

      expect(onRowSelect).toHaveBeenLastCalledWith({
        type: 'select',
        payload: { rowId: 1, toggle: false },
      });
    });
    it("clicking the row's checkbox deselects the row when the row is already selected", () => {
      renderView({ selected: [1] });

      const checkbox = screen.getByRole('checkbox', { name: 'Select 1' });

      act(() => {
        fireEvent.click(checkbox);
      });

      expect(onRowSelect).toHaveBeenLastCalledWith({
        type: 'select',
        payload: {
          rowId: 1,
          toggle: true,
        },
      });
    });

    it('selecting another row adds the row to the selection', () => {
      renderView({ selected: [2] });

      const checkbox = screen.getByRole('checkbox', { name: 'Select 1' });

      act(() => {
        fireEvent.click(checkbox);
      });

      expect(onRowSelect).toHaveBeenLastCalledWith({
        type: 'select',
        payload: {
          rowId: 1,
          toggle: false,
        },
      });
    });

    it('selects all rows when the header checkbox is clicked', () => {
      renderView();

      const checkbox = screen.getByRole('checkbox', {
        name: 'Select All',
        hidden: true,
      });

      act(() => {
        fireEvent.click(checkbox);
      });

      expect(onRowSelect).toHaveBeenLastCalledWith({
        type: 'select-all',
        payload: { toggle: false },
      });
    });
    it('it unselects all rows when the header checkbox is clicked and all rows are selected', () => {
      renderView({ selected: [1, 2, 3] });

      const checkbox = screen.getByRole('checkbox', {
        name: 'Select All',
        hidden: true,
      });

      act(() => {
        fireEvent.click(checkbox);
      });

      expect(onRowSelect).toHaveBeenLastCalledWith({
        type: 'select-all',
        payload: { toggle: true },
      });
    });
  });

  describe('Expanding Rows', () => {
    it('Renders an expanded row when passed the correct id', () => {
      renderView({ expanded: [1] });

      screen.getByText('Expanded 1');
      screen.getByRole('button', { expanded: true });
    });

    it('allows multiple expanded rows by default', () => {
      renderView({ expanded: [1, 2] });

      screen.getByText('Expanded 1');
      screen.getByText('Expanded 2');
    });

    it('calls the onRowExpand callback when a collapsed row toggle is clicked', () => {
      renderView();

      expect(screen.queryByRole('button', { expanded: true })).toBeNull();

      const expandButton = screen.getByRole('button', { name: `Expand 1 Row` });

      act(() => {
        fireEvent.click(expandButton);
      });
      expect(onRowExpand).toHaveBeenLastCalledWith({
        type: 'expand',
        payload: {
          rowId: 1,
          toggle: false,
        },
      });
    });
    it('calls the onRowExpand with the id omitted when an expanded row toggle is clicked', () => {
      renderView({ expanded: [1] });

      const expandButton = screen.getByRole('button', { name: `Expand 1 Row` });

      act(() => {
        fireEvent.click(expandButton);
      });

      expect(onRowExpand).toHaveBeenLastCalledWith({
        type: 'expand',
        payload: {
          rowId: 1,
          toggle: true,
        },
      });
    });
  });

  describe('Querying', () => {
    describe('Sorting', () => {
      it('renders the column header with an ascending label when sorted', () => {
        renderView({
          columns: [{ key: 'name', sortable: true }],
          query: { sort: {} },
        });

        expect(screen.queryByText('ascending')).toBeNull();
      });
      it('renders the column header with an descending label when sorted', () => {
        renderView({
          columns: [{ key: 'name', sortable: true }],
          query: { sort: { name: 'desc' } },
        });

        screen.getByLabelText('descending');
      });
      it('renders the column header with no label when not sorted', () => {
        renderView({
          columns: [{ key: 'name', sortable: true }],
          query: { sort: {} },
        });

        expect(screen.queryByText('sort by name')).toBeNull();
      });

      it('calls onQueryChange with the column as desc when previously unsorted', () => {
        renderView({
          columns: [{ key: 'name', sortable: true }],
          query: { sort: {} },
        });
        act(() => {
          fireEvent.click(screen.getByLabelText('sort by name'));
        });

        expect(onQueryChange).toHaveBeenLastCalledWith({
          type: 'sort',
          payload: {
            dimension: 'name',
            value: 'asc',
          },
        });
      });

      it('calls onQueryChange with the column as desc when previously asc', () => {
        renderView({
          columns: [{ key: 'name', sortable: true }],
          query: { sort: { name: 'asc' } },
        });
        act(() => {
          fireEvent.click(screen.getByLabelText('sort by name'));
        });

        expect(onQueryChange).toHaveBeenLastCalledWith({
          type: 'sort',
          payload: {
            dimension: 'name',
            value: 'desc',
          },
        });
      });

      it('calls onQueryChange with the column unsorted when previously desc', () => {
        renderView({
          columns: [{ key: 'name', sortable: true }],
          query: { sort: { name: 'desc' } },
        });
        act(() => {
          fireEvent.click(screen.getByLabelText('sort by name'));
        });

        expect(onQueryChange).toHaveBeenLastCalledWith({
          type: 'sort',
          payload: {
            dimension: 'name',
            value: 'none',
          },
        });
      });

      it('preserves multiple dimensions of sorted columns', () => {
        renderView({
          columns: [
            { key: 'name', sortable: true },
            { key: 'sin', sortable: true },
          ],
          query: { sort: { name: 'desc', sin: 'asc' } },
        });
        act(() => {
          fireEvent.click(screen.getByLabelText('sort by sin'));
        });

        expect(onQueryChange).toHaveBeenLastCalledWith({
          type: 'sort',
          payload: {
            dimension: 'sin',
            value: 'desc',
          },
        });
      });
    });
    describe('Filtering', () => {
      it('opens a popup menu with selectable options', () => {
        renderView({
          columns: [
            {
              key: 'sin',
              header: 'Some Filter',
              filters: ['idk', 'dude'],
            },
          ],
          query: {},
        });

        const button = screen.getByLabelText('filter by sin');

        act(() => {
          fireEvent.click(button);
        });

        screen.getByText('idk');
        screen.getByText('dude');
      });
      it('the menu selects all options if not filter query is specified', () => {
        renderView({
          columns: [
            {
              key: 'sin',
              header: 'Some Filter',
              filters: ['idk', 'dude'],
            },
          ],
          query: {},
        });

        const button = screen.getByLabelText('filter by sin');

        act(() => {
          fireEvent.click(button);
        });

        screen.getByRole('checkbox', {
          name: 'Select All sin',
          checked: true,
          hidden: true,
        });
        screen.getByRole('checkbox', {
          name: 'idk',
          checked: true,
          hidden: true,
        });
        screen.getByRole('checkbox', {
          name: 'dude',
          checked: true,
          hidden: true,
        });
      });

      it('calls onQueryChange when an option is clicked', () => {
        renderView({
          columns: [
            {
              key: 'sin',
              header: 'Some Filter',
              filters: ['idk', 'dude'],
            },
          ],
          query: {},
        });

        const button = screen.getByLabelText('filter by sin');

        act(() => {
          fireEvent.click(button);
        });

        const checkbox = screen.getByRole('checkbox', {
          name: 'idk',
          hidden: true,
        });

        act(() => {
          fireEvent.click(checkbox);
        });

        expect(onQueryChange).toHaveBeenLastCalledWith({
          type: 'filter',
          payload: {
            dimension: 'sin',
            value: ['idk'],
          },
        });
      });

      it('unchecks Select All when a filter is present', () => {
        renderView({
          columns: [
            {
              key: 'sin',
              header: 'Some Filter',
              filters: ['idk', 'dude'],
            },
          ],
          query: { filter: { sin: ['idk'] } },
        });

        const button = screen.getByLabelText('filter by sin');

        act(() => {
          fireEvent.click(button);
        });

        screen.getByRole('checkbox', {
          name: 'idk',
          checked: false,
          hidden: true,
        });
        screen.getByRole('checkbox', {
          name: 'Select All sin',
          checked: false,
          hidden: true,
        });
      });
    });
  });
});
