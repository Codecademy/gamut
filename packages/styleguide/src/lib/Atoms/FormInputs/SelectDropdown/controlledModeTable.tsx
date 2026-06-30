import { Code, TokenTable } from '~styleguide/blocks';

const controlledModeColumns = [
  {
    key: 'mode',
    name: 'Mode',
    size: 'md' as const,
    render: ({ mode }: { mode: string }) => <Code>{mode}</Code>,
  },
  {
    key: 'uncontrolled',
    name: 'Uncontrolled',
    size: 'lg' as const,
    render: ({ uncontrolled }: { uncontrolled: React.ReactNode }) =>
      uncontrolled,
  },
  {
    key: 'controlled',
    name: 'Controlled',
    size: 'fill' as const,
    render: ({ controlled }: { controlled: React.ReactNode }) => controlled,
  },
];

const notSupported = <em>Not supported</em>;

const controlledModes = [
  {
    id: 'single',
    mode: 'Single',
    uncontrolled: notSupported,
    controlled: (
      <>
        Pass <Code>value</Code> (option value string) and update it in{' '}
        <Code>onChange</Code>.
      </>
    ),
  },
  {
    id: 'multi',
    mode: 'Multi',
    uncontrolled: (
      <>
        Omit <Code>value</Code>, or pass a non-array (<Code>undefined</Code>,{' '}
        <Code>{`''`}</Code>).
      </>
    ),
    controlled: (
      <>
        Pass <Code>value</Code> as <Code>string[]</Code> and update it in{' '}
        <Code>onChange</Code>.
      </>
    ),
  },
  {
    id: 'creatable-single',
    mode: 'Creatable single',
    uncontrolled: notSupported,
    controlled: (
      <>
        Same as single; use <Code>onCreateOption</Code> to append to{' '}
        <Code>options</Code>.
      </>
    ),
  },
  {
    id: 'creatable-multi',
    mode: 'Creatable multi',
    uncontrolled: (
      <>
        Omit <Code>value</Code>; use <Code>onCreateOption</Code> for option
        persistence.
      </>
    ),
    controlled: (
      <>
        Pass <Code>value</Code> as <Code>string[]</Code>; update it in{' '}
        <Code>onChange</Code> on every change, including{' '}
        <Code>meta.action === &apos;create-option&apos;</Code>.
      </>
    ),
  },
];

export const ControlledModeTable = () => (
  <TokenTable
    bg={false}
    columns={controlledModeColumns}
    idKey="id"
    rows={controlledModes}
  />
);
