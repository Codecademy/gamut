export type ComponentStatus = 'current' | 'deprecated' | 'experimental';

export interface ComponentHeaderProps {
  title: string;
  subtitle: string;
  status: ComponentStatus;
  figmaUrl?: string;
  githubUrl: string;
  tier?: 'Atom' | 'Molecule' | 'Organism';
}

const statusLabel: Record<ComponentStatus, string> = {
  current: 'Current',
  deprecated: 'Deprecated',
  experimental: 'Experimental',
};

const statusColor: Record<ComponentStatus, string> = {
  current: '#0d7d3f',
  deprecated: '#b3261e',
  experimental: '#8a5300',
};

/**
 * Header block required on every component page (ADR 0001 §3): title,
 * subtitle, status, Figma link, source link.
 */
export const ComponentHeader = ({
  title,
  subtitle,
  status,
  figmaUrl,
  githubUrl,
  tier,
}: ComponentHeaderProps) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '.5rem',
      marginBottom: '1.5rem',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
      <h1 style={{ margin: 0 }}>{title}</h1>
      <span
        style={{
          fontSize: '.7rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '.03em',
          color: statusColor[status],
          border: `1px solid ${statusColor[status]}`,
          borderRadius: '999px',
          padding: '.15rem .6rem',
        }}
      >
        {statusLabel[status]}
      </span>
      {tier && (
        <span
          style={{
            fontSize: '.7rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '.03em',
            color: '#6b7280',
            border: '1px solid #6b7280',
            borderRadius: '999px',
            padding: '.15rem .6rem',
          }}
        >
          {tier}
        </span>
      )}
    </div>
    <p style={{ margin: 0, fontSize: '1.1rem', color: '#6b7280' }}>
      {subtitle}
    </p>
    <div style={{ display: 'flex', gap: '1rem', fontSize: '.9rem' }}>
      {figmaUrl && (
        <a href={figmaUrl} target="_blank" rel="noreferrer">
          View in Figma ↗
        </a>
      )}
      <a href={githubUrl} target="_blank" rel="noreferrer">
        View source ↗
      </a>
    </div>
  </div>
);
