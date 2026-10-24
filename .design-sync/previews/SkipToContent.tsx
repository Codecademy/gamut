// @dsCard
// SkipToContent is a focus-visible skip link (0px height until focused).
// This preview shows it in its visible/focused state.
import React from 'react';
import { SkipToContent } from '@codecademy/gamut';

export function Preview() {
  return (
    <div style={{ padding: '16px', background: '#fff' }}>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
        Skip link (visible on keyboard focus):
      </p>
      {/* Render with inline styles to simulate the focused/visible state */}
      <a
        href="#main"
        style={{
          display: 'inline-block',
          padding: '8px 16px',
          background: '#10162F',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '4px',
          fontSize: '14px',
          fontFamily: 'sans-serif',
        }}
      >
        Skip to main content
      </a>
      <p style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
        Hidden until focused via keyboard Tab navigation.
      </p>
    </div>
  );
}
