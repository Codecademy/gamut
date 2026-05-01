import { cleanup, render, screen } from '@testing-library/react';
import React, { useLayoutEffect, useRef, useState } from 'react';

import { useScrollingParents } from '../hooks';

/**
 * Reacts attach after paint; a render that mounts the ref target still sees
 * `ref.current === null` in that pass. Real callers often get a follow-up render
 * (e.g. targetRect / isOpen) once the ref is set — the layout effect simulates
 * that so the hook is evaluated again with a populated ref.
 */
const ScrollingParentsFixture = ({ showTarget }: { showTarget: boolean }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [, setPostAttach] = useState(0);
  const parents = useScrollingParents(ref);

  useLayoutEffect(() => {
    if (showTarget) {
      setPostAttach((n) => n + 1);
    }
  }, [showTarget]);

  return (
    <div
      data-testid="scrollable-root"
      style={{
        overflow: 'auto',
        height: 200,
        width: 500,
        position: 'relative',
      }}
    >
      <div style={{ height: 2000, width: 500 }} />
      {showTarget && <div ref={ref} data-testid="inner-target" />}
      <span data-testid="parent-count">{parents.length}</span>
    </div>
  );
};

describe('useScrollingParents', () => {
  afterEach(cleanup);

  it('recomputes when the ref target is attached after the first render', () => {
    const { rerender } = render(<ScrollingParentsFixture showTarget={false} />);
    expect(screen.getByTestId('parent-count').textContent).toBe('0');

    rerender(<ScrollingParentsFixture showTarget={true} />);
    const count = Number.parseInt(
      screen.getByTestId('parent-count').textContent ?? '',
      10
    );
    expect(count).toBeGreaterThan(0);
  });
});
