import { useMemo } from 'react';

const counter: Record<string, number> = {};

export function usePatternId(id: string) {
  return useMemo(() => {
    const idCounter = counter?.[id] || 0;
    counter[id] = idCounter;
    return `${id}-pattern-${counter[id]++}`;
  }, [id]);
}
