import { Code, TokenTable } from '~styleguide/blocks';

const creatablePropColumns = [
  {
    key: 'prop',
    name: 'Prop',
    size: 'lg' as const,
    render: ({ prop }: { prop: string }) => <Code>{prop}</Code>,
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
    render: ({ defaultValue }: { defaultValue: string | null }) =>
      defaultValue ? <Code>{defaultValue}</Code> : '—',
  },
  {
    key: 'description',
    name: 'Description',
    size: 'fill' as const,
    render: ({ description }: { description: React.ReactNode }) => description,
  },
];

const creatableProps = [
  {
    id: 'isCreatable',
    prop: 'isCreatable',
    type: 'boolean',
    defaultValue: 'false',
    description: (
      <>
        Enables option creation. Automatically forces <Code>isSearchable</Code>{' '}
        to <Code>true</Code>.
      </>
    ),
  },
  {
    id: 'onCreateOption',
    prop: 'onCreateOption',
    type: '(inputValue: string) => void',
    defaultValue: null,
    description: (
      <>
        Called when the user confirms a new option. Convenience hook for
        appending to <Code>options</Code>; selection updates arrive via{' '}
        <Code>onChange</Code> with{' '}
        <Code>action: &apos;create-option&apos;</Code>.
      </>
    ),
  },
  {
    id: 'formatCreateLabel',
    prop: 'formatCreateLabel',
    type: '(inputValue: string) => ReactNode',
    defaultValue: 'Add "inputValue"',
    description: 'Customises the label shown in the "Add" row.',
  },
  {
    id: 'isValidNewOption',
    prop: 'isValidNewOption',
    type: '(inputValue, value, options) => boolean',
    defaultValue: 'react-select default',
    description:
      'Controls when the "Add" row is visible. Use for min-length gating, pattern validation, or max-items caps.',
  },
  {
    id: 'createOptionPosition',
    prop: 'createOptionPosition',
    type: "'first' | 'last'",
    defaultValue: "'last'",
    description: 'Sets the position of the "Add" row within the options list.',
  },
  {
    id: 'validationMessage',
    prop: 'validationMessage',
    type: 'ReactNode | (({ inputValue }) => ReactNode)',
    defaultValue: '"No options"',
    description:
      'Replaces the in-menu "No options" text. Useful for surfacing validation/error messages directly inside the dropdown.',
  },
];

export const CreatablePropsTable = () => (
  <TokenTable
    bg={false}
    columns={creatablePropColumns}
    idKey="id"
    rows={creatableProps}
  />
);
