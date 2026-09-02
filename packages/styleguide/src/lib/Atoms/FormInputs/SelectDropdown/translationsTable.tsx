import { Code, TokenTable } from '~styleguide/blocks';

const translationColumns = [
  {
    key: 'key',
    name: 'Key',
    size: 'lg' as const,
    render: ({ translationKey }: { translationKey: string }) => (
      <Code>{translationKey}</Code>
    ),
  },
  {
    key: 'type',
    name: 'Type',
    size: 'lg' as const,
    render: ({ type }: { type: string }) => <Code>{type}</Code>,
  },
  {
    key: 'defaultValue',
    name: 'Default',
    size: 'lg' as const,
    render: ({ defaultValue }: { defaultValue: React.ReactNode }) =>
      defaultValue,
  },
  {
    key: 'notes',
    name: 'Description',
    size: 'fill' as const,
    render: ({ notes }: { notes: React.ReactNode }) => notes,
  },
];

const translationRows = [
  {
    id: 'placeholder',
    translationKey: 'placeholder',
    type: 'string',
    defaultValue: <Code>Select an option</Code>,
    notes: 'Text shown in the input when no option is selected.',
  },
  {
    id: 'validationMessage',
    translationKey: 'validationMessage',
    type: 'ReactNode | (({ inputValue }) => ReactNode)',
    defaultValue: <Code>No options</Code>,
    notes: (
      <>
        Empty-menu text, shown whenever no option matches — an empty{' '}
        <Code>options</Code> list (any mode) or a search filtering every option
        out. Pass a function to receive the current input for input-specific
        copy.
      </>
    ),
  },
  {
    id: 'formatCreateLabel',
    translationKey: 'formatCreateLabel',
    type: '(inputValue) => ReactNode',
    defaultValue: <Code>Add {`{inputValue}`}</Code>,
    notes: 'Label for the creatable "Add" row.',
  },
  {
    id: 'removeOptionLabel',
    translationKey: 'removeOptionLabel',
    type: '(label) => string',
    defaultValue: <Code>Remove {`{label}`}</Code>,
    notes: "aria-label for a multi-select tag's remove button.",
  },
  {
    id: 'clearAllLabel',
    translationKey: 'clearAllLabel',
    type: 'string',
    defaultValue: <Code>Remove all selected</Code>,
    notes: 'aria-label for the multi-select "remove all" button.',
  },
  {
    id: 'focusedOptionAnnouncement',
    translationKey: 'focusedOptionAnnouncement',
    type: '(option) => string',
    defaultValue: <Code>You are currently focused on option {`{label}`}</Code>,
    notes:
      'Screen-reader announcement when an option is focused; the subtitle, right label, and "disabled" are appended when present.',
  },
];

export const TranslationsTable = () => (
  <TokenTable
    bg={false}
    columns={translationColumns}
    idKey="id"
    rows={translationRows}
  />
);
