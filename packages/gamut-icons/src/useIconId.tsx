import { useId } from '@reach/auto-id';
import { useMemo } from 'react';

export function useIconId(id: string) {
  const generatedId = useId();
  return useMemo(() => {
    return `${id}-mask-${generatedId}`;
  }, [id, generatedId]);
}
