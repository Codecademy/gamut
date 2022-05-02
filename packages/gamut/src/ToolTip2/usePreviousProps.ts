import { useEffect, useRef } from 'react';

export const usePreviousProps = <T>(value: T) => {
  const ref = useRef<T>();

  // Updates the stored props value _after_ update so this value is always a render behind the passed value
  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};
