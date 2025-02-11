import { useId, useMemo } from 'react';

export function usePatternId(id: string) {
  const generatedId = useId();
  return useMemo(() => {
    return `${id}-pattern-${generatedId}`;
  }, [id, generatedId]);
}
