import { Code, TokenTable } from '~styleguide/blocks';

const errorMessageColumns = [
  {
    key: 'scenario',
    name: 'Scenario',
    size: 'xl' as const,
    render: ({ scenario }: { scenario: React.ReactNode }) => scenario,
  },
  {
    key: 'message',
    name: 'Default message',
    size: 'xl' as const,
    render: ({ message }: { message: React.ReactNode }) => message,
  },
  {
    key: 'translationKey',
    name: 'Translation key',
    size: 'fill' as const,
    render: ({ translationKey }: { translationKey: string }) => (
      <Code>{translationKey}</Code>
    ),
  },
];

const errorMessages = [
  {
    id: 'incomplete',
    scenario: 'Incomplete date',
    message: 'Incomplete date',
    translationKey: 'invalidDateIncomplete',
  },
  {
    id: 'invalid-month',
    scenario: 'Month outside 1-12',
    message: 'Month must be between 1 and 12',
    translationKey: 'invalidDateInvalidMonth',
  },
  {
    id: 'invalid-day',
    scenario: 'Day too large for the month',
    message: '{month} does not have {day} days',
    translationKey: 'invalidDateInvalidDay',
  },
  {
    id: 'date-rollover',
    scenario: 'Date rollover (e.g. Feb 30)',
    message: '{month} does not have {day} days',
    translationKey: 'invalidDateRollover',
  },
  {
    id: 'disabled-date',
    scenario: (
      <>
        Date is disabled via <Code>disableDate</Code>
      </>
    ),
    message: 'This date is not available',
    translationKey: 'invalidDateNotAvailable',
  },
  {
    id: 'range-contains-disabled-date',
    scenario: 'Range spans a disabled date',
    message: 'This date range contains unavailable dates',
    translationKey: 'invalidDateRangeContainsDisabledDate',
  },
  {
    id: 'invalid-date',
    scenario: 'Any other unparseable date (fallback)',
    message: 'Invalid date',
    translationKey: 'invalidDate',
  },
];

export const ErrorMessagesTable = () => (
  <TokenTable
    bg={false}
    columns={errorMessageColumns}
    idKey="id"
    rows={errorMessages}
  />
);
