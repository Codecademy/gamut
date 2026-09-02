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
    size: 'fill' as const,
    render: ({ defaultValue }: { defaultValue: React.ReactNode }) =>
      defaultValue,
  },
];

const translationRows = [
  {
    id: 'placeholder',
    translationKey: 'placeholder',
    type: 'string',
    defaultValue: <Code>Select an option</Code>,
  },
  {
    id: 'validationMessage',
    translationKey: 'validationMessage',
    type: 'ReactNode | (({ inputValue }) => ReactNode)',
    defaultValue: <Code>No options</Code>,
  },
  {
    id: 'formatCreateLabel',
    translationKey: 'formatCreateLabel',
    type: '(inputValue) => ReactNode',
    defaultValue: <Code>Add &quot;inputValue&quot;</Code>,
  },
  {
    id: 'removeOptionLabel',
    translationKey: 'removeOptionLabel',
    type: '(label) => string',
    defaultValue: (
      <>
        <Code>Remove label</Code> (multi-select tag aria-label)
      </>
    ),
  },
  {
    id: 'clearAllLabel',
    translationKey: 'clearAllLabel',
    type: 'string',
    defaultValue: (
      <>
        <Code>Remove all selected</Code> (clear-all aria-label)
      </>
    ),
  },
  {
    id: 'focusedOptionAnnouncement',
    translationKey: 'focusedOptionAnnouncement',
    type: '(option) => string',
    defaultValue: 'Screen-reader announcement when an option is focused',
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
