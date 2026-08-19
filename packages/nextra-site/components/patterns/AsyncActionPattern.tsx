'use client';

import { type ComponentType, useState } from 'react';

import { GamutSandbox } from '../GamutSandbox';

export interface AsyncActionPatternProps {
  button: ComponentType<any>;
  variant?: 'primary' | 'secondary' | 'danger' | 'interface';
  idleLabel: string;
  pendingLabel: string;
  resultLabel: string;
  delayMs?: number;
}

/**
 * A Pattern (ADR 0001 §3): the interesting part is the code around the
 * component — a pending state that disables the button for the
 * duration of an async action, so a slow network can't produce a
 * duplicate submission.
 */
export const AsyncActionPattern = ({
  button: Button,
  variant = 'primary',
  idleLabel,
  pendingLabel,
  resultLabel,
  delayMs = 1200,
}: AsyncActionPatternProps) => {
  const [status, setStatus] = useState<'idle' | 'pending' | 'done'>('idle');

  const handleClick = () => {
    setStatus('pending');
    setTimeout(() => setStatus('done'), delayMs);
  };

  return (
    <GamutSandbox>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Button
          variant={variant}
          disabled={status === 'pending'}
          onClick={handleClick}
        >
          {status === 'pending' ? pendingLabel : idleLabel}
        </Button>
        {status === 'done' && <span role="status">{resultLabel}</span>}
      </div>
    </GamutSandbox>
  );
};
