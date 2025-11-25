// Added because SB and TS don't play nice with each other at the moment
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Anchor, DataList, DataTable, FillButton, FlexBox, Text } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  cols,
  CustomEmptyState,
  DataListTemplate,
  DisableContainerQueryExample,
  simpleColumns,
  simpleRows,
} from '../examples';

const meta: Meta<typeof DataList> = {
  component: DataList,
  args: {
    id: 'crew',
    idKey: 'name',
    query: { sort: { name: 'desc', role: 'asc' } },
    rows: [
      {
        name: 'Jean Luc Picard',
        role: 'Captain',
        ship: 'USS Enterprise',
        age: '59',
        species: 'Human',
        sector: 'Alpha Quadrant',
        status: 'Active',
        yearsOfService: '35',
        homeworld: 'La Barre, France, Earth',
        specialization: 'Command & Diplomacy',
      },
      {
        name: 'Wesley Crusher',
        role: 'Deus Ex Machina',
        ship: 'USS Enterprise',
        age: '18',
        species: 'Human/Traveler',
        sector: 'Multiple Dimensions',
        status: 'Transcended',
        yearsOfService: '2',
        homeworld: 'Earth',
        specialization: 'Space-Time Manipulation',
      },
      {
        name: 'Geordie LaForge',
        role: 'Chief Engineer / Rascal',
        ship: 'Borg Cube',
        age: '35',
        species: 'Human',
        sector: 'Alpha Quadrant',
        status: 'Active',
        yearsOfService: '15',
        homeworld: 'Mogadishu, Somalia, Earth',
        specialization: 'Engineering & Technology',
      },
      {
        name: 'Data',
        role: 'Lt. Commander / Scamp',
        ship: 'He is a ship',
        age: '30',
        species: 'Soong-type Android',
        sector: 'Alpha Quadrant',
        status: 'Active',
        yearsOfService: '26',
        homeworld: 'Omicron Theta',
        specialization: 'Operations & Analysis',
      },
    ],
    columns: [
      {
        header: 'Name',
        key: 'name',
        size: 'lg',
        type: 'header',
        sortable: true,
      },
      { header: 'Rank', key: 'role', size: 'lg', sortable: true },
      { header: 'Ship', key: 'ship', size: 'lg', sortable: true },
      { header: 'Age', key: 'age', size: 'sm', sortable: true },
      { header: 'Species', key: 'species', size: 'md', sortable: true },
      { header: 'Sector', key: 'sector', size: 'md', sortable: true },
      { header: 'Status', key: 'status', size: 'sm', sortable: true },
      {
        header: 'Years of service',
        key: 'yearsOfService',
        size: 'md',
        sortable: true,
      },
      { header: 'Homeworld', key: 'homeworld', size: 'lg', sortable: true },
      {
        header: 'Specialization',
        key: 'specialization',
        size: 'xl',
        sortable: true,
        fill: true,
      },
    ],
    header: false,
    spacing: 'condensed',
    onRowSelect: () => {},
    onRowExpand: () => {},
    expandedContent: ({ row }) => (
      <FlexBox borderColor="background-hover" borderTop={1} p={16} pl={[0, 64]}>
        <DataTable
          columns={[
            { key: 'name', size: 'md' },
            { key: 'text', size: 'lg' },
          ]}
          header={false}
          id={row.name}
          idKey="id"
          rows={[
            { id: 1, name: 'Sub Row 1', text: 'Ooo very cool' },
            { id: 2, name: 'Sub Row 2', text: 'Ooo very cool' },
            { id: 3, name: 'Sub Row 3', text: 'Ooo very cool' },
          ]}
          variant="table"
        />
      </FlexBox>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof DataList>;

export const Default: Story = {
  args: {},
};

export const FullDataList: Story = {
  render: () => <DataListTemplate />,
};

export const Expanded: Story = {
  args: {
    expanded: ['Data'],
  },
};

export const Selected: Story = {
  args: {
    selected: ['Data'],
  },
};

export const EmptyState: Story = {
  args: {
    columns: cols,
    header: true,
    rows: [],
    height: '45vh',
    minHeight: '300px',
  },
};

export const EmptyStateCustom: Story = {
  args: {
    columns: cols,
    header: true,
    rows: [],
    height: '45vh',
    minHeight: '300px',
    emptyMessage: <CustomEmptyState />,
  },
};

export const NonSelectable: Story = {
  args: {
    onRowSelect: undefined,
    onRowExpand: undefined,
    expandedContent: undefined,
    header: true,
  },
};

const DataListDisableContainerQueryExample = () => {
  const defaultComponent = (
    <DataList
      columns={simpleColumns}
      header
      id="default-container-query"
      idKey="name"
      rows={simpleRows}
      spacing="condensed"
    />
  );

  const disabledComponent = (
    <DataList
      columns={simpleColumns}
      disableContainerQuery
      id="disabled-container-query"
      idKey="name"
      rows={simpleRows}
      spacing="condensed"
    />
  );

  return (
    <DisableContainerQueryExample
      componentName="DataList"
      defaultComponent={defaultComponent}
      disabledComponent={disabledComponent}
    />
  );
};

export const DisableContainerQuery: Story = {
  args: {},
  render: () => <DataListDisableContainerQueryExample />,
};

// Server-side filtering example component
const ServerSideFilteringExample = () => {
  // Mock data for our example
  const allCrewMembers = useMemo(() => [
    {
      id: 1,
      name: 'Jean Luc Picard',
      role: 'Captain',
      ship: 'USS Enterprise',
      species: 'Human',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Wesley Crusher',
      role: 'Deus Ex Machina',
      ship: 'USS Enterprise',
      species: 'Human/Traveler',
      status: 'Transcended',
    },
    {
      id: 3,
      name: 'Geordie LaForge',
      role: 'Chief Engineer',
      ship: 'USS Enterprise',
      species: 'Human',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Data',
      role: 'Lt. Commander',
      ship: 'USS Enterprise',
      species: 'Android',
      status: 'Active',
    },
    {
      id: 5,
      name: 'William Riker',
      role: 'First Officer',
      ship: 'USS Titan',
      species: 'Human',
      status: 'Active',
    },
    {
      id: 6,
      name: 'Worf',
      role: 'Security Officer',
      ship: 'DS9',
      species: 'Klingon',
      status: 'Active',
    },
  ], []);

  // State management for server-side filtering
  const [rows, setRows] = useState(allCrewMembers);
  const [query, setQuery] = useState({ sort: {}, filter: {} });
  const [loading, setLoading] = useState(false);
  const [apiCallInfo, setApiCallInfo] = useState('No filters applied yet');

  // Mock API call function - in real implementation, replace with your actual API
  const fetchFilteredData = useCallback(async (filterQuery) => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Build query params that would be sent to your API
    const queryParams = new URLSearchParams();
    
    // Add filters to query params
    if (filterQuery.filter) {
      Object.entries(filterQuery.filter).forEach(([key, values]) => {
        if (values && values.length > 0) {
          queryParams.append(`filter[${key}]`, values.join(','));
        }
      });
    }
    
    // Add sorts to query params
    if (filterQuery.sort) {
      Object.entries(filterQuery.sort).forEach(([key, direction]) => {
        if (direction && direction !== 'none') {
          queryParams.append(`sort[${key}]`, direction);
        }
      });
    }
    
    // Show what would be sent to the API
    const queryString = queryParams.toString();
    setApiCallInfo(
      queryString 
        ? `API called with: ${queryString}`
        : 'API called with no filters'
    );
    
    // In a real implementation, you would make an actual API call here:
    // const response = await fetch(`/api/crew?${queryString}`);
    // const data = await response.json();
    // return data.rows;
    
    // Mock server-side filtering logic (replace this with actual API response)
    let filteredData = [...allCrewMembers];
    
    // Apply filters
    if (filterQuery.filter) {
      Object.entries(filterQuery.filter).forEach(([key, values]) => {
        if (values && values.length > 0) {
          filteredData = filteredData.filter(row => !values.includes(row[key]));
        }
      });
    }
    
    // Apply sorting
    if (filterQuery.sort) {
      Object.entries(filterQuery.sort).forEach(([key, direction]) => {
        if (direction && direction !== 'none') {
          filteredData.sort((a, b) => {
            const aVal = String(a[key]).toLowerCase();
            const bVal = String(b[key]).toLowerCase();
            const comparison = aVal.localeCompare(bVal);
            return direction === 'asc' ? comparison : -comparison;
          });
        }
      });
    }
    
    return filteredData;
  }, [allCrewMembers]);

  // Handle query changes (filters and sorts)
  const handleQueryChange = useCallback(async (change) => {
    let newQuery = { ...query };
    
    switch (change.type) {
      case 'filter': {
        const { dimension, value } = change.payload;
        newQuery = {
          ...newQuery,
          filter: { ...newQuery.filter, [dimension]: value },
        };
        break;
      }
      case 'sort': {
        const { dimension, value } = change.payload;
        newQuery = {
          ...newQuery,
          sort: { [dimension]: value },
        };
        break;
      }
      case 'reset': {
        newQuery = { sort: {}, filter: {} };
        break;
      }
    }
    
    setQuery(newQuery);
    
    // Fetch filtered data from server
    const filteredRows = await fetchFilteredData(newQuery);
    setRows(filteredRows);
    setLoading(false);
  }, [query, fetchFilteredData]);

  // Initial load
  useEffect(() => {
    fetchFilteredData(query)
      .then(data => {
        setRows(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Column configuration with filterable columns
  const columns = [
    {
      header: 'Name',
      key: 'name',
      size: 'lg',
      type: 'header',
      sortable: true,
    },
    {
      header: 'Rank',
      key: 'role',
      size: 'lg',
      sortable: true,
    },
    {
      header: 'Ship',
      key: 'ship',
      size: 'lg',
      sortable: true,
      // Available filter options for this column
      filters: ['USS Enterprise', 'USS Titan', 'DS9'],
    },
    {
      header: 'Species',
      key: 'species',
      size: 'lg',
      sortable: true,
      // Available filter options for this column
      filters: ['Human', 'Android', 'Klingon'],
    },
    {
      header: 'Status',
      key: 'status',
      size: 'md',
      fill: true,
      sortable: true,
      filters: ['Active', 'Transcended'],
    },
  ];

  return (
    <FlexBox column gap={16}>
      <Text variant="title-sm">Server-Side Filtering Example</Text>
      <Text color="text-secondary">
        This example demonstrates how to implement server-side filtering. When you apply a filter or sort,
        the component calls an API endpoint with the filter parameters instead of filtering locally.
      </Text>
      <FlexBox
        bg="paleBlue"
        borderRadius="md"
        fontFamily="monospace"
        fontSize={14}
        p={12}
      >
        {apiCallInfo}
      </FlexBox>
      <DataList
        columns={columns}
        header
        id="server-side-crew"
        idKey="id"
        loading={loading}
        query={query}
        rows={rows}
        spacing="condensed"
        onQueryChange={handleQueryChange}
      />
      <Text color="text-secondary" fontSize={14}>
        <strong>Implementation notes:</strong>
        <br />
        • Replace <code>fetchFilteredData</code> with your actual API call
        <br />
        • The <code>onQueryChange</code> callback receives filter/sort changes
        <br />
        • Pass query parameters to your API endpoint
        <br />
        • Update rows with the filtered data from the API response
        <br />• Use the <code>loading</code> prop to show loading state during API calls
      </Text>
    </FlexBox>
  );
};

export const ServerSideFiltering: Story = {
  render: () => <ServerSideFilteringExample />,
};

// Custom expand/collapse example
const CustomExpandExample = () => {
  const crew = [
    {
      id: 1,
      name: 'Jean Luc Picard',
      role: 'Captain',
      ship: 'USS Enterprise',
      bio: 'An experienced Starfleet officer known for his diplomatic skills and moral integrity.',
    },
    {
      id: 2,
      name: 'Wesley Crusher',
      role: 'Acting Ensign',
      ship: 'USS Enterprise',
      bio: 'A young prodigy who eventually transcends to a higher plane of existence.',
    },
    {
      id: 3,
      name: 'Geordie LaForge',
      role: 'Chief Engineer',
      ship: 'USS Enterprise',
      bio: 'A brilliant engineer who can see with the help of his VISOR.',
    },
    {
      id: 4,
      name: 'Data',
      role: 'Lt. Commander',
      ship: 'USS Enterprise',
      bio: 'An android exploring what it means to be human.',
    },
  ];

  // Track which rows are expanded
  const [expandedRows, setExpandedRows] = useState([]);

  // Handler to toggle expansion from anywhere
  const handleToggleExpand = useCallback((rowId) => {
    setExpandedRows((prev) => {
      if (prev.includes(rowId)) {
        // Collapse: remove from array
        return prev.filter((id) => id !== rowId);
      }
      // Expand: add to array
      return [...prev, rowId];
    });
  }, []);

  // Standard onRowExpand handler (for the built-in chevron button)
  const onRowExpand = useCallback(
    ({ payload: { rowId } }) => {
      handleToggleExpand(rowId);
    },
    [handleToggleExpand]
  );

  // Columns with custom expand trigger in the name cell
  const columns = [
    {
      header: 'Name',
      key: 'name',
      size: 'lg',
      type: 'header',
      render: (row) => (
        <Anchor
          variant="interface"
          onClick={(e) => {
            e.preventDefault();
            handleToggleExpand(row.id);
          }}
        >
          {row.name}
        </Anchor>
      ),
    },
    {
      header: 'Rank',
      key: 'role',
      size: 'lg',
    },
    {
      header: 'Ship',
      key: 'ship',
      size: 'lg',
      fill: true,
    },
  ];

  // Expanded content
  const expandedContent = useCallback(
    ({ row, onCollapse }) => (
      <FlexBox column flex={1}>
        <FlexBox borderTop={1} opacity={0.5} />
        <FlexBox column gap={16} p={24}>
          <Text variant="title-sm">Biography</Text>
          <Text>{row.bio}</Text>
          <FlexBox gap={8}>
            <FillButton size="small" onClick={onCollapse}>
              Close
            </FillButton>
            <FillButton
              size="small"
              variant="secondary"
              onClick={() => {
                // eslint-disable-next-line no-alert
                alert(`More about ${row.name}`);
              }}
            >
              Learn More
            </FillButton>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    ),
    []
  );

  return (
    <FlexBox column gap={16}>
      <Text variant="title-sm">Custom Expand/Collapse Example</Text>
      <Text color="text-secondary">
        This example shows how to trigger row expansion from a custom element (like an anchor in the name column).
        Click on any crew member&apos;s name to expand their row, or use the chevron button on the right.
      </Text>
      <DataList
        columns={columns}
        expanded={expandedRows}
        expandedContent={expandedContent}
        header
        id="custom-expand"
        idKey="id"
        rows={crew}
        spacing="condensed"
        onRowExpand={onRowExpand}
      />
      <Text color="text-secondary" fontSize={14}>
        <strong>Implementation notes:</strong>
        <br />
        • Manage expanded state yourself with <code>useState</code>
        <br />
        • Create a toggle handler that adds/removes row IDs from the expanded array
        <br />
        • Use the handler in custom <code>render</code> functions (like the Name column)
        <br />
        • Also connect it to <code>onRowExpand</code> so the built-in chevron works
        <br />• The <code>expandedContent</code> callback receives an <code>onCollapse</code> function for custom close buttons
      </Text>
    </FlexBox>
  );
};

export const CustomExpand: Story = {
  render: () => <CustomExpandExample />,
};
