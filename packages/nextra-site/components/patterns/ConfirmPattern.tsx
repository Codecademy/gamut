'use client';

import { type ComponentType, useState } from 'react';

import { GamutSandbox } from '../GamutSandbox';

export interface ConfirmPatternProps {
  button: ComponentType<any>;
  idleLabel: string;
  confirmLabel: string;
  resultLabel: string;
}

/**
 * A Pattern (ADR 0001 §3): a two-step confirm requires composing the
 * button with local state and a timeout to reset the confirm window —
 * not just a different prop value, so it belongs here rather than in
 * Variants.
 */
export const ConfirmPattern = ({
  button: Button,
  idleLabel,
  confirmLabel,
  resultLabel,
}: ConfirmPatternProps) => {
  const [awaitingConfirm, setAwaitingConfirm] = useState(false);
  const [done, setDone] = useState(false);

  const handleClick = () => {
    if (!awaitingConfirm) {
      setAwaitingConfirm(true);
      return;
    }
    setAwaitingConfirm(false);
    setDone(true);
  };

  return (
    <GamutSandbox>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Button
          variant={awaitingConfirm ? 'danger' : 'secondary'}
          onClick={handleClick}
          onBlur={() => setAwaitingConfirm(false)}
        >
          {awaitingConfirm ? confirmLabel : idleLabel}
        </Button>
        {done && <span role="status">{resultLabel}</span>}
      </div>
    </GamutSandbox>
  );
};
