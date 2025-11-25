// Added because SB and TS don't play nice with each other at the moment
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  Anchor,
  DataList,
  DataTable,
  FillButton,
  FlexBox,
  List,
  ListCol,
  ListHeaderCol,
  ListHeaderRow,
  ListRow,
  Text,
} from '@codecademy/gamut';
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
  const allCrewMembers = useMemo(
    () => [
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
    ],
    []
  );

  // State management for server-side filtering
  const [rows, setRows] = useState(allCrewMembers);
  const [query, setQuery] = useState({ sort: {}, filter: {} });
  const [loading, setLoading] = useState(false);
  const [apiCallInfo, setApiCallInfo] = useState('No filters applied yet');

  // Mock API call function - in real implementation, replace with your actual API
  const fetchFilteredData = useCallback(
    async (filterQuery) => {
      setLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

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
            filteredData = filteredData.filter(
              (row) => !values.includes(row[key])
            );
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
    },
    [allCrewMembers]
  );

  // Handle query changes (filters and sorts)
  const handleQueryChange = useCallback(
    async (change) => {
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
    },
    [query, fetchFilteredData]
  );

  // Initial load
  useEffect(() => {
    fetchFilteredData(query)
      .then((data) => {
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
        This example demonstrates how to implement server-side filtering. When
        you apply a filter or sort, the component calls an API endpoint with the
        filter parameters instead of filtering locally.
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
        <br />• Replace <code>fetchFilteredData</code> with your actual API call
        <br />• The <code>onQueryChange</code> callback receives filter/sort
        changes
        <br />
        • Pass query parameters to your API endpoint
        <br />
        • Update rows with the filtered data from the API response
        <br />• Use the <code>loading</code> prop to show loading state during
        API calls
      </Text>
    </FlexBox>
  );
};

export const ServerSideFiltering: Story = {
  render: () => <ServerSideFilteringExample />,
};

// Custom expand/collapse example without chevron
const CustomExpandExample = () => {
  // Expanded data with crew members
  const crewData = useMemo(
    () => [
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
    ],
    []
  );

  // Track which rows are expanded
  const [expandedIds, setExpandedIds] = useState([]);

  // Handler to toggle expansion
  const handleToggleExpand = useCallback((rowId) => {
    setExpandedIds((prev) => {
      if (prev.includes(rowId)) {
        return prev.filter((id) => id !== rowId);
      }
      return [...prev, rowId];
    });
  }, []);

  // Generate rows that include expanded content inline
  const rows = useMemo(() => {
    const result = [];
    crewData.forEach((crew) => {
      // Add the main row
      result.push({
        ...crew,
        rowType: 'main',
        mainId: crew.id,
      });

      // If expanded, add an expanded content row
      if (expandedIds.includes(crew.id)) {
        result.push({
          id: `${crew.id}-expanded`,
          name: crew.name,
          bio: crew.bio,
          role: '',
          ship: '',
          rowType: 'expanded',
          mainId: crew.id,
        });
      }
    });
    return result;
  }, [crewData, expandedIds]);

  // Columns with custom expand trigger and expanded content rendering
  const columns = useMemo(
    () => [
      {
        header: 'Name',
        key: 'name',
        size: 'lg',
        type: 'header',
        render: (row) => {
          if (row.rowType === 'expanded') {
            return (
              <FlexBox column gap={16} pb={16} pt={8} width="100%">
                <Text variant="title-sm">Biography</Text>
                <Text>{row.bio}</Text>
                <FlexBox gap={8}>
                  <FillButton
                    size="small"
                    onClick={() => handleToggleExpand(row.mainId)}
                  >
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
            );
          }
          return (
            <Anchor
              variant="interface"
              onClick={(e) => {
                e.preventDefault();
                handleToggleExpand(row.id);
              }}
            >
              {row.name}
            </Anchor>
          );
        },
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
    ],
    [handleToggleExpand]
  );

  return (
    <FlexBox column gap={16}>
      <Text variant="title-sm">Custom Expand/Collapse (No Chevron)</Text>
      <Text color="text-secondary">
        This example shows expand/collapse without the built-in chevron button.
        Click on any crew member&apos;s name to expand their bio inline.
      </Text>
      <DataList
        columns={columns}
        header
        id="custom-expand-no-chevron"
        idKey="id"
        rows={rows}
        spacing="condensed"
      />
      <Text color="text-secondary" fontSize={14}>
        <strong>Implementation notes:</strong>
        <br />• Don&apos;t use <code>expandedContent</code> or{' '}
        <code>onRowExpand</code> props
        <br />
        • Generate rows dynamically - insert &quot;expanded&quot; rows after
        expanded items
        <br />• Use a <code>rowType</code> field to distinguish main vs expanded
        rows
        <br />• In column <code>render</code> functions, check{' '}
        <code>row.rowType</code> to render differently
        <br />• For expanded rows, span content across the first column and
        leave others empty
      </Text>
    </FlexBox>
  );
};

export const CustomExpand: Story = {
  render: () => <CustomExpandExample />,
};

// Nested table in expanded content example
const NestedTableExample = () => {
  const crew = useMemo(
    () => [
      {
        id: 1,
        name: 'Jean Luc Picard',
        role: 'Captain',
        ship: 'USS Enterprise',
      },
      {
        id: 2,
        name: 'Wesley Crusher',
        role: 'Acting Ensign',
        ship: 'USS Enterprise',
      },
      {
        id: 3,
        name: 'Geordie LaForge',
        role: 'Chief Engineer',
        ship: 'USS Enterprise',
      },
      {
        id: 4,
        name: 'Data',
        role: 'Lt. Commander',
        ship: 'USS Enterprise',
      },
    ],
    []
  );

  // Mock mission data for each crew member
  const missionData = useMemo(
    () => ({
      1: [
        {
          id: 'm1',
          mission: 'First Contact with the Borg',
          stardate: '42761.3',
          status: 'Completed',
          outcome: 'Success',
        },
        {
          id: 'm2',
          mission: 'Diplomatic Mission to Romulus',
          stardate: '43152.4',
          status: 'Completed',
          outcome: 'Success',
        },
        {
          id: 'm3',
          mission: 'Rescue Operation at Wolf 359',
          stardate: '44001.4',
          status: 'Completed',
          outcome: 'Partial Success',
        },
      ],
      2: [
        {
          id: 'm4',
          mission: 'Training Exercise Alpha',
          stardate: '42523.7',
          status: 'Completed',
          outcome: 'Success',
        },
        {
          id: 'm5',
          mission: 'Assist in Engine Repairs',
          stardate: '42901.3',
          status: 'Completed',
          outcome: 'Success',
        },
      ],
      3: [
        {
          id: 'm6',
          mission: 'Engine Overhaul Project',
          stardate: '42686.4',
          status: 'Completed',
          outcome: 'Success',
        },
        {
          id: 'm7',
          mission: 'Holodeck Maintenance',
          stardate: '43125.8',
          status: 'In Progress',
          outcome: 'Pending',
        },
        {
          id: 'm8',
          mission: 'Warp Core Analysis',
          stardate: '43349.2',
          status: 'Completed',
          outcome: 'Success',
        },
        {
          id: 'm9',
          mission: 'Sensor Array Upgrade',
          stardate: '43489.2',
          status: 'Completed',
          outcome: 'Success',
        },
      ],
      4: [
        {
          id: 'm10',
          mission: 'Science Survey Mission',
          stardate: '42761.9',
          status: 'Completed',
          outcome: 'Success',
        },
        {
          id: 'm11',
          mission: 'Away Team Investigation',
          stardate: '43125.8',
          status: 'Completed',
          outcome: 'Success',
        },
      ],
    }),
    []
  );

  const [expandedRows, setExpandedRows] = useState([]);

  const onRowExpand = useCallback(({ payload: { toggle, rowId } }) => {
    setExpandedRows((prev) => {
      if (toggle) {
        return prev.filter((id) => id !== rowId);
      }
      return [...prev, rowId];
    });
  }, []);

  const columns = useMemo(
    () => [
      {
        header: 'Name',
        key: 'name',
        size: 'lg',
        type: 'header',
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
    ],
    []
  );

  // Mission table columns
  const missionColumns = useMemo(
    () => [
      {
        header: 'Mission',
        key: 'mission',
        size: 'xl',
        type: 'header',
      },
      {
        header: 'Stardate',
        key: 'stardate',
        size: 'md',
      },
      {
        header: 'Status',
        key: 'status',
        size: 'sm',
      },
      {
        header: 'Outcome',
        key: 'outcome',
        size: 'md',
        fill: true,
      },
    ],
    []
  );

  const expandedContent = useCallback(
    ({ row }) => (
      <FlexBox
        bg="background-current"
        borderColor="background-hover"
        borderTop={1}
        column
        p={16}
        pl={[16, , 64]}
      >
        <Text mb={12} variant="title-sm">
          Mission History for {row.name}
        </Text>
        <DataTable
          columns={missionColumns}
          header
          id={`missions-${row.id}`}
          idKey="id"
          rows={missionData[row.id] || []}
          spacing="condensed"
          variant="table"
        />
      </FlexBox>
    ),
    [missionColumns, missionData]
  );

  return (
    <FlexBox column gap={16}>
      <Text variant="title-sm">Nested Table in Expanded Content</Text>
      <Text color="text-secondary">
        This example shows how to display a DataTable inside the expanded
        content. Click the chevron to expand a crew member and see their mission
        history.
      </Text>
      <DataList
        columns={columns}
        expanded={expandedRows}
        expandedContent={expandedContent}
        header
        id="nested-table"
        idKey="id"
        rows={crew}
        spacing="condensed"
        onRowExpand={onRowExpand}
      />
      <Text color="text-secondary" fontSize={14}>
        <strong>Implementation notes:</strong>
        <br />• Use <code>DataTable</code> component inside{' '}
        <code>expandedContent</code>
        <br />• The nested table receives its own <code>columns</code>,{' '}
        <code>rows</code>, and <code>id</code>
        <br />• Add padding/margins for visual hierarchy (e.g.,{' '}
        <code>pl=64</code> to align with parent)
        <br />• Use <code>spacing=&quot;condensed&quot;</code> for nested tables
        to save space
        <br />• Consider adding a background color to distinguish nested content
      </Text>
    </FlexBox>
  );
};

export const NestedTable: Story = {
  render: () => <NestedTableExample />,
};

// List component as table in expanded content example
const ListAsTableExample = () => {
  const crew = useMemo(
    () => [
      {
        id: 1,
        name: 'Jean Luc Picard',
        role: 'Captain',
        ship: 'USS Enterprise',
      },
      {
        id: 2,
        name: 'Wesley Crusher',
        role: 'Acting Ensign',
        ship: 'USS Enterprise',
      },
      {
        id: 3,
        name: 'Geordie LaForge',
        role: 'Chief Engineer',
        ship: 'USS Enterprise',
      },
      {
        id: 4,
        name: 'Data',
        role: 'Lt. Commander',
        ship: 'USS Enterprise',
      },
    ],
    []
  );

  // Mock mission data for each crew member
  const missionData = useMemo(
    () => ({
      1: [
        {
          id: 'm1',
          mission: 'First Contact with the Borg',
          stardate: '42761.3',
          status: 'Completed',
          outcome: 'Success',
        },
        {
          id: 'm2',
          mission: 'Diplomatic Mission to Romulus',
          stardate: '43152.4',
          status: 'Completed',
          outcome: 'Success',
        },
        {
          id: 'm3',
          mission: 'Rescue Operation at Wolf 359',
          stardate: '44001.4',
          status: 'Completed',
          outcome: 'Partial Success',
        },
      ],
      2: [
        {
          id: 'm4',
          mission: 'Training Exercise Alpha',
          stardate: '42523.7',
          status: 'Completed',
          outcome: 'Success',
        },
        {
          id: 'm5',
          mission: 'Assist in Engine Repairs',
          stardate: '42901.3',
          status: 'Completed',
          outcome: 'Success',
        },
      ],
      3: [
        {
          id: 'm6',
          mission: 'Engine Overhaul Project',
          stardate: '42686.4',
          status: 'Completed',
          outcome: 'Success',
        },
        {
          id: 'm7',
          mission: 'Holodeck Maintenance',
          stardate: '43125.8',
          status: 'In Progress',
          outcome: 'Pending',
        },
        {
          id: 'm8',
          mission: 'Warp Core Analysis',
          stardate: '43349.2',
          status: 'Completed',
          outcome: 'Success',
        },
        {
          id: 'm9',
          mission: 'Sensor Array Upgrade',
          stardate: '43489.2',
          status: 'Completed',
          outcome: 'Success',
        },
      ],
      4: [
        {
          id: 'm10',
          mission: 'Science Survey Mission',
          stardate: '42761.9',
          status: 'Completed',
          outcome: 'Success',
        },
        {
          id: 'm11',
          mission: 'Away Team Investigation',
          stardate: '43125.8',
          status: 'Completed',
          outcome: 'Success',
        },
      ],
    }),
    []
  );

  const [expandedRows, setExpandedRows] = useState([]);

  const onRowExpand = useCallback(({ payload: { toggle, rowId } }) => {
    setExpandedRows((prev) => {
      if (toggle) {
        return prev.filter((id) => id !== rowId);
      }
      return [...prev, rowId];
    });
  }, []);

  const columns = useMemo(
    () => [
      {
        header: 'Name',
        key: 'name',
        size: 'lg',
        type: 'header',
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
    ],
    []
  );

  const expandedContent = useCallback(
    ({ row }) => {
      const missions = missionData[row.id] || [];

      return (
        <FlexBox
          bg="background-current"
          borderColor="background-hover"
          borderTop={1}
          column
          p={16}
          pl={[16, , 64]}
        >
          <Text mb={12} variant="title-sm">
            Mission History for {row.name}
          </Text>
          <List as="table" id={`missions-list-${row.id}`} variant="table">
            <ListHeaderRow>
              <ListHeaderCol size="xl" type="header">
                Mission
              </ListHeaderCol>
              <ListHeaderCol size="md">Stardate</ListHeaderCol>
              <ListHeaderCol size="sm">Status</ListHeaderCol>
              <ListHeaderCol fill size="md">
                Outcome
              </ListHeaderCol>
            </ListHeaderRow>
            {missions.map((mission) => (
              <ListRow key={mission.id}>
                <ListCol size="xl" type="header">
                  <Text truncate="ellipsis" truncateLines={1}>
                    {mission.mission}
                  </Text>
                </ListCol>
                <ListCol size="md">
                  <Text>{mission.stardate}</Text>
                </ListCol>
                <ListCol size="sm">
                  <Text>{mission.status}</Text>
                </ListCol>
                <ListCol fill size="md">
                  <Text>{mission.outcome}</Text>
                </ListCol>
              </ListRow>
            ))}
          </List>
        </FlexBox>
      );
    },
    [missionData]
  );

  return (
    <FlexBox column gap={16}>
      <Text variant="title-sm">List Component as Table in Expanded Content</Text>
      <Text color="text-secondary">
        This example shows how to use the List component with{' '}
        <code>as=&quot;table&quot;</code> inside expanded content. Click the
        chevron to expand a crew member and see their mission history.
      </Text>
      <DataList
        columns={columns}
        expanded={expandedRows}
        expandedContent={expandedContent}
        header
        id="list-as-table"
        idKey="id"
        rows={crew}
        spacing="condensed"
        onRowExpand={onRowExpand}
      />
      <Text color="text-secondary" fontSize={14}>
        <strong>Implementation notes:</strong>
        <br />• Use <code>List as=&quot;table&quot; variant=&quot;table&quot;</code>{' '}
        as the container
        <br />• Add <code>ListHeaderRow</code> with <code>ListHeaderCol</code>{' '}
        components for headers
        <br />• Use <code>ListRow</code> and <code>ListCol</code> for data rows
        <br />• Set <code>type=&quot;header&quot;</code> on the first column for
        row headers
        <br />• List component gives you more flexibility than DataTable for custom
        layouts
      </Text>
    </FlexBox>
  );
};

export const ListAsTable: Story = {
  render: () => <ListAsTableExample />,
};
