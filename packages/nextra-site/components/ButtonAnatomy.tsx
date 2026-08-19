const part = {
  border: '1px dashed #9ca3af',
  borderRadius: 6,
  padding: '.5rem .75rem',
  fontSize: '.8rem',
  color: '#4b5563',
};

/**
 * A labeled diagram of the component's parts (ADR 0001 §3 Anatomy).
 * Buttons in this family are visual, so unlike a stateless utility
 * this section isn't skipped.
 */
export const ButtonAnatomy = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '.5rem',
        border: '2px solid #111827',
        borderRadius: 8,
        padding: '.5rem 1rem',
      }}
    >
      <span style={part}>icon (optional)</span>
      <span style={{ fontWeight: 600 }}>Label</span>
    </div>
    <span style={{ fontSize: '.8rem', color: '#6b7280' }}>
      ← container: sets variant color, size, and focus/hover states
    </span>
  </div>
);
