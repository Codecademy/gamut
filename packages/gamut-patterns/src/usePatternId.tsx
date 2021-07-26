import { useMemo } from 'react';

const counter: Record<string, number> = {};

export function usePatternId(id: string) {
  return useMemo(() => {
    const key = id.toLowerCase().replace(/\s/g, '-');
    const idCounter = counter?.[key] || 0;
    counter[key] = idCounter;
    return `${id}-pattern-${counter[key]++}`;
  }, [id]);
}
