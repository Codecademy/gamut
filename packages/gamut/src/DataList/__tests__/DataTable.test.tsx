import { setupRtl } from '@codecademy/gamut-tests';
import { matchers } from '@emotion/jest';

import { DataTable } from '../DataTable';
import { ColumnConfig } from '../types';

// Add the custom matchers provided by '@emotion/jest'
expect.extend(matchers);

type Row = { id: string; name: string; role: string };
type Columns = ColumnConfig<Row>[];

const rows: Row[] = [
  { id: '1', name: 'Jean Luc Picard', role: 'Captain' },
  { id: '2', name: 'Wesley Crusher', role: 'Deus Ex Machina' },
];

const columns: Columns = [
  { key: 'name', header: 'Name' },
  { key: 'role', header: 'Role' },
];

const renderView = setupRtl(DataTable, {
  id: 'datatable-test',
  idKey: 'id',
  rows,
  columns,
});

describe('DataTable', () => {
  describe('Container query control', () => {
    it('applies container query styles by default', () => {
      const { view } = renderView();
      
      const wrapper = view.container.querySelector('#datatable-test');
      expect(wrapper).toHaveStyleRule('container-type', 'inline-size');
    });

    it('disables container queries when disableContainerQuery is true', () => {
      const { view } = renderView({ disableContainerQuery: true });
      
      const wrapper = view.container.querySelector('#datatable-test');
      expect(wrapper).toHaveStyleRule('container-type', 'normal');
    });
  });

  describe('Basic functionality', () => {
    it('renders DataTable with provided data', () => {
      const { view } = renderView();
      
      expect(view.getByText('Jean Luc Picard')).toBeInTheDocument();
      expect(view.getByText('Captain')).toBeInTheDocument();
      expect(view.getByText('Wesley Crusher')).toBeInTheDocument();
      expect(view.getByText('Deus Ex Machina')).toBeInTheDocument();
    });

    it('uses table variant by default', () => {
      const { view } = renderView();
      
      const table = view.container.querySelector('table');
      expect(table).toBeInTheDocument();
    });

    it('renders headers when header prop is true (default)', () => {
      const { view } = renderView();
      
      expect(view.getByText('Name')).toBeInTheDocument();
      expect(view.getByText('Role')).toBeInTheDocument();
    });
  });
});
