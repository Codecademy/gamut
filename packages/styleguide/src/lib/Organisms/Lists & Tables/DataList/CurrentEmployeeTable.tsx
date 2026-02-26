// @ts-nocheck
import { Box, DataList, FlexBox, Text } from '@codecademy/gamut';

const EmployeeCell = ({ name, role }) => (
  <FlexBox flexDirection="column">
    <Text fontWeight={700} variant="p-large">
      {name}
    </Text>
    <Text variant="p-small">{role}</Text>
  </FlexBox>
);

const columns = [
  {
    header: 'Employee',
    key: 'employee',
    size: 'xl',
    sortable: true,
    type: 'header',
  },
  {
    header: 'Skill health avg',
    key: 'skillHealthAvg',
    size: 'lg',
    sortable: true,
  },
  {
    header: 'Skill spread',
    key: 'skillSpread',
    size: 'lg',
    sortable: true,
  },
  {
    header: 'Gaps',
    key: 'gaps',
    size: 'md',
    sortable: true,
  },
  {
    header: 'Gaps closed',
    key: 'gapsClosed',
    size: 'md',
    sortable: true,
  },
];

const rows = [
  {
    id: '1',
    employee: (
      <EmployeeCell name="Joshua Lewis" role="Quality Control Analyst" />
    ),
    skillHealthAvg: 'On target',
    skillSpread: '44 skills',
    gaps: 2,
    gapsClosed: '0 +6%',
  },
  {
    id: '2',
    employee: (
      <EmployeeCell
        name="Kathryn Mallory Murphy-Richards"
        role="Clinical Data Manager"
      />
    ),
    skillHealthAvg: 'Needs improvement',
    skillSpread: '19 skills',
    gaps: 2,
    gapsClosed: '0 +6%',
  },
  {
    id: '3',
    employee: (
      <EmployeeCell
        name="Cameron Williamson"
        role="Regulatory Affairs Specialist"
      />
    ),
    skillHealthAvg: 'Above target',
    skillSpread: '23 skills',
    gaps: 1,
    gapsClosed: '0 +6%',
  },
  {
    id: '4',
    employee: (
      <EmployeeCell name="Theresa Webb" role="Pharmacovigilance Scientist" />
    ),
    skillHealthAvg: 'Needs improvement',
    skillSpread: '41 skills',
    gaps: 1,
    gapsClosed: '0 +6%',
  },
  {
    id: '5',
    employee: (
      <EmployeeCell name="Savannah Nguyen" role="Medical Science Liaison" />
    ),
    skillHealthAvg: 'On target',
    skillSpread: '18 skills',
    gaps: 0,
    gapsClosed: '0 +6%',
  },
  {
    id: '6',
    employee: <EmployeeCell name="Jacob Jones" role="Research Scientist" />,
    skillHealthAvg: 'Above target',
    skillSpread: '33 skills',
    gaps: 0,
    gapsClosed: '0 +6%',
  },
  {
    id: '7',
    employee: (
      <EmployeeCell name="Jane Cooper" role="Clinical Trial Coordinator" />
    ),
    skillHealthAvg: 'Critical',
    skillSpread: '40 skills',
    gaps: 4,
    gapsClosed: '0 +6%',
  },
  {
    id: '8',
    employee: (
      <EmployeeCell name="Joshua Lewis" role="Quality Assurance Manager" />
    ),
    skillHealthAvg: 'Needs improvement',
    skillSpread: '29 skills',
    gaps: 3,
    gapsClosed: '0 +6%',
  },
  {
    id: '9',
    employee: (
      <EmployeeCell
        name="Kathryn Mallory Murphy-Richards"
        role="Formulation Development Scientist"
      />
    ),
    skillHealthAvg: 'Needs improvement',
    skillSpread: '12 skills',
    gaps: 1,
    gapsClosed: '0 +6%',
  },
];

export function CurrentEmployeeTable() {
  return (
    <Box>
      <DataList
        header
        id="employees-table"
        idKey="id"
        rows={rows}
        columns={columns}
        spacing="normal"
        onRowSelect={() => {}}
      />
    </Box>
  );
}
