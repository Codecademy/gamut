'use client';

import type { ComponentType } from 'react';

import { GamutSandbox } from './GamutSandbox';

const variants = ['primary', 'secondary', 'danger', 'interface'] as const;
const sizes = ['small', 'normal', 'large'] as const;

export interface ButtonVariantsGridProps {
  button: ComponentType<any>;
}

/**
 * The Variants section (ADR 0001 §3) is exhaustive — one rendered
 * example per prop value, no persuasion copy.
 */
export const ButtonVariantsGrid = ({
  button: Button,
}: ButtonVariantsGridProps) => (
  <GamutSandbox>
    <div style={{ overflowX: 'auto' }}>
      <table>
        <thead>
          <tr>
            <th>variant</th>
            {sizes.map((size) => (
              <th key={size}>size=&quot;{size}&quot;</th>
            ))}
            <th>disabled</th>
          </tr>
        </thead>
        <tbody>
          {variants.map((variant) => (
            <tr key={variant}>
              <td>
                <code>{variant}</code>
              </td>
              {sizes.map((size) => (
                <td key={size} style={{ padding: '.75rem' }}>
                  <Button variant={variant} size={size}>
                    Button
                  </Button>
                </td>
              ))}
              <td style={{ padding: '.75rem' }}>
                <Button variant={variant} disabled>
                  Button
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </GamutSandbox>
);
