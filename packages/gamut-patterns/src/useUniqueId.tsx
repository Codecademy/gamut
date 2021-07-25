import { useMemo } from 'react';

const counter: Record<string, number> = {};

export function useUniqueId(id: string) {
  return useMemo(() => {
    const idCounter = counter?.[id] || 0;
    counter[id] = idCounter;
    return `${id}-${counter[id]++}`;
  }, [id]);
}
