export interface PropRow {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

/**
 * The canonical API table (ADR 0001 §3): prose prop documentation is
 * banned elsewhere on the page, so this is the single source of truth
 * for a component's props.
 */
export const PropsTable = ({ rows }: { rows: PropRow[] }) => (
  <table>
    <thead>
      <tr>
        <th>Prop</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      {rows.map((row) => (
        <tr key={row.name}>
          <td>
            <code>
              {row.name}
              {row.required ? '*' : ''}
            </code>
          </td>
          <td>
            <code>{row.type}</code>
          </td>
          <td>{row.default ? <code>{row.default}</code> : '—'}</td>
          <td>{row.description}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
