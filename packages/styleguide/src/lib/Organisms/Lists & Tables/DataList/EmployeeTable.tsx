// @ts-nocheck
import {
  Box,
  ColumnConfig,
  DataList,
  FlexBox,
  IconButton,
  Text,
  useLocalQuery,
} from '@codecademy/gamut';
import {
  MiniKebabMenuIcon,
  MiniWarningTriangleIcon,
} from '@codecademy/gamut-icons';
import { Background, ColorMode, theme } from '@codecademy/gamut-styles';
import { useCallback, useMemo, useState } from 'react';

type SkillHealth =
  | 'On target'
  | 'Above target'
  | 'Needs improvement'
  | 'Critical';

interface EmployeeRow {
  id: string;
  name: string;
  title: string;
  skillHealthAvg: SkillHealth;
  skillSpread: number;
  gapCount: number;
  criticalGapCount: number;
  gapsClosed: number;
  gapGrowthPct: number;
}

const HEALTH_TAG_STYLES: Record<SkillHealth, { bg: string; color: string }> = {
  'On target': { bg: 'background-success', color: 'feedback-success' },
  'Above target': { bg: 'background-success', color: 'feedback-success' },
  // NOTE: `theme.colors` is a global variable that is imported from `@codecademy/gamut-styles`
  // and `yellow-400` is a static color, i.e. it doesn't switch when toggling between light and dark mode.
  'Needs improvement': {
    bg: 'background-warning',
    color: `${theme.colors['yellow-400']}`,
  },
  Critical: { bg: 'background-error', color: 'feedback-error' },
};

const EMPLOYEES: EmployeeRow[] = [
  {
    id: '1',
    name: 'Joshua Lewis',
    title: 'Quality Control Analyst',
    skillHealthAvg: 'On target',
    skillSpread: 44,
    gapCount: 0,
    criticalGapCount: 0,
    gapsClosed: 8,
    gapGrowthPct: 8,
  },
  {
    id: '2',
    name: 'Kathryn Mallory Murphy-Richards',
    title: 'Clinical Data Manager',
    skillHealthAvg: 'Needs improvement',
    skillSpread: 19,
    gapCount: 2,
    criticalGapCount: 0,
    gapsClosed: 8,
    gapGrowthPct: 8,
  },
  {
    id: '3',
    name: 'Cameron Williamson',
    title: 'Regulatory Affairs Specialist',
    skillHealthAvg: 'Above target',
    skillSpread: 23,
    gapCount: 0,
    criticalGapCount: 0,
    gapsClosed: 8,
    gapGrowthPct: 8,
  },
  {
    id: '4',
    name: 'Theresa Webb',
    title: 'Pharmacovigilance Scientist',
    skillHealthAvg: 'Needs improvement',
    skillSpread: 41,
    gapCount: 1,
    criticalGapCount: 0,
    gapsClosed: 8,
    gapGrowthPct: 8,
  },
  {
    id: '5',
    name: 'Savannah Nguyen',
    title: 'Medical Science Liaison',
    skillHealthAvg: 'On target',
    skillSpread: 18,
    gapCount: 0,
    criticalGapCount: 0,
    gapsClosed: 8,
    gapGrowthPct: 8,
  },
  {
    id: '6',
    name: 'Jacob Jones',
    title: 'Research Scientist',
    skillHealthAvg: 'Above target',
    skillSpread: 33,
    gapCount: 0,
    criticalGapCount: 0,
    gapsClosed: 8,
    gapGrowthPct: 8,
  },
  {
    id: '7',
    name: 'Jane Cooper',
    title: 'Clinical Trial Coordinator',
    skillHealthAvg: 'Critical',
    skillSpread: 48,
    gapCount: 4,
    criticalGapCount: 1,
    gapsClosed: 8,
    gapGrowthPct: 8,
  },
  {
    id: '8',
    name: 'Joshua Lewis',
    title: 'Quality Assurance Manager',
    skillHealthAvg: 'Needs improvement',
    skillSpread: 29,
    gapCount: 3,
    criticalGapCount: 0,
    gapsClosed: 8,
    gapGrowthPct: 8,
  },
  {
    id: '9',
    name: 'Kathryn Mallory Murphy-Richards',
    title: 'Formulation Development Scientist',
    skillHealthAvg: 'Needs improvement',
    skillSpread: 12,
    gapCount: 1,
    criticalGapCount: 0,
    gapsClosed: 8,
    gapGrowthPct: 8,
  },
  {
    id: '10',
    name: 'Cameron Williamson',
    title: 'Bioinformatician',
    skillHealthAvg: 'Critical',
    skillSpread: 38,
    gapCount: 5,
    criticalGapCount: 2,
    gapsClosed: 8,
    gapGrowthPct: 8,
  },
];

function HealthStatusTag({ status }: { status: SkillHealth }) {
  const { bg, color } = HEALTH_TAG_STYLES[status];
  return (
    <FlexBox alignItems="center" bg={bg} px={8} py={2}>
      <Text color={color} fontSize={14}>
        {status}
      </Text>
    </FlexBox>
  );
}

function GapTag({
  count,
  severity,
}: {
  count: number;
  severity: 'warning' | 'critical';
}) {
  const isWarning = severity === 'warning';
  return (
    <FlexBox
      alignItems="center"
      bg={isWarning ? 'background-warning' : 'background-error'}
      gap={8}
      px={8}
      py={2}
    >
      <MiniWarningTriangleIcon
        color={isWarning ? `${theme.colors['yellow-400']}` : 'feedback-error'}
        size={16}
      />
      <Text
        color={isWarning ? `${theme.colors['yellow-400']}` : 'feedback-error'}
        fontSize={14}
      >
        {count}
      </Text>
    </FlexBox>
  );
}

const COLUMNS: ColumnConfig<EmployeeRow>[] = [
  {
    key: 'name',
    header: 'Employee',
    sortable: true,
    size: 'xl',
    type: 'header',
    render: (row) => (
      <FlexBox flexDirection="column" py={12}>
        <Text
          fontFamily="accent"
          fontSize={18}
          fontWeight={700}
          lineHeight="title"
        >
          {row.name}
        </Text>
        <Text fontSize={16}>{row.title}</Text>
      </FlexBox>
    ),
  },
  {
    // InfoTip labels require a custom header row beyond the standard ColumnConfig API
    key: 'skillHealthAvg',
    header: 'Skill health avg',
    sortable: true,
    size: 'lg',
    render: (row) => <HealthStatusTag status={row.skillHealthAvg} />,
  },
  {
    key: 'skillSpread',
    header: 'Skill spread',
    sortable: true,
    size: 'md',
    render: (row) => (
      <FlexBox alignItems="center" gap={8}>
        <Text fontSize={16}>{row.skillSpread}</Text>
        <Text color="text-secondary" fontSize={16}>
          skills
        </Text>
      </FlexBox>
    ),
  },
  {
    key: 'gapCount',
    header: 'Gaps',
    sortable: true,
    size: 'md',
    render: (row) => (
      <FlexBox alignItems="center" gap={8}>
        {row.gapCount > 0 && <GapTag count={row.gapCount} severity="warning" />}
        {row.criticalGapCount > 0 && (
          <GapTag count={row.criticalGapCount} severity="critical" />
        )}
      </FlexBox>
    ),
  },
  {
    key: 'gapsClosed',
    header: 'Gaps closed',
    sortable: true,
    size: 'md',
    render: (row) => (
      <FlexBox alignItems="center" gap={8}>
        <Text fontSize={16}>{row.gapsClosed}</Text>
        <FlexBox alignItems="center" bg="background-success" px={8} py={2}>
          <Text color="feedback-success" fontSize={16}>
            +{row.gapGrowthPct}%
          </Text>
        </FlexBox>
      </FlexBox>
    ),
  },
  {
    key: 'id',
    header: ' ',
    size: 'content',
    type: 'control',
    render: () => (
      <IconButton
        icon={MiniKebabMenuIcon}
        size="small"
        tip="Show more options"
      />
    ),
  },
];

export function EmployeeTable() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const { idKey, query, rows, onQueryChange } = useLocalQuery({
    idKey: 'id',
    rows: EMPLOYEES,
    columns: COLUMNS,
  });

  const allIds = useMemo(() => EMPLOYEES.map(({ id }) => id), []);

  const onRowSelect = useCallback(
    ({
      type,
      payload: { toggle, rowId },
    }: {
      type: string;
      payload: { toggle: boolean; rowId: string };
    }) => {
      if (type === 'select') {
        return setSelectedRows((prev) =>
          toggle ? prev.filter((id) => id !== rowId) : [...prev, rowId]
        );
      }
      if (type === 'select-all') {
        return setSelectedRows(toggle ? [] : allIds);
      }
    },
    [allIds]
  );

  return (
    <ColorMode mode="dark">
      <Background bg='background-selected' borderRadius="xl" overflow="hidden">
      <DataList
        columns={COLUMNS}
        header
        id="employee-table"
        idKey={idKey}
        query={query}
        rows={rows}
        selected={selectedRows}
        onQueryChange={onQueryChange}
        onRowSelect={onRowSelect}
      />
      </Background>
    </ColorMode>
  );
}
